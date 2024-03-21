import { SmartContractOutputWithValue } from "@api/types";

interface TupleStructure {
  [key: string]: any;
}

const parseTuple = (output: SmartContractOutputWithValue): string => {
  const tupleData = output.value;
  let parsedTuple = "";
  // Check if the tupleData is an array
  if (Array.isArray(tupleData)) {
    // Parse tuple data as an array
    const tupleStructure: any = [];
    for (let i = 0; i < tupleData.length; i += 1) {
      const value = tupleData[i];

      // Recursively parse if the value is an array or an object (nested tuple)
      if (Array.isArray(value)) {
        tupleStructure.push(parseTuple({ type: "tuple", value }));
      } else if (typeof value === "object" && value !== null) {
        tupleStructure.push(parseTuple({ type: "tuple", value }));
      } else {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        tupleStructure.push(formatOutputValue({ type: typeof value, value }));
      }
    }

    parsedTuple = JSON.stringify(tupleStructure);
  } else if (typeof tupleData === "object" && tupleData !== null) {
    // Parse tuple data as an object
    const tupleStructure: TupleStructure = {};

    const tupleKeys = Object.keys(tupleData);
    for (let i = 0; i < tupleKeys.length; i += 1) {
      const key = tupleKeys[i];
      if (Object.prototype.hasOwnProperty.call(tupleData, key)) {
        const value = tupleData[key];

        // Recursively parse if the value is an array or an object (nested tuple)
        if (Array.isArray(value)) {
          tupleStructure[key] = parseTuple({ type: "tuple", value });
        } else if (typeof value === "object" && value !== null) {
          tupleStructure[key] = parseTuple({ type: "tuple", value });
        } else {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          tupleStructure[key] = formatOutputValue({
            type: typeof value,
            value,
          });
        }
      }
    }
    parsedTuple = JSON.stringify(tupleStructure);
  }

  return parsedTuple;
};
const formatOutputValue = (output: SmartContractOutputWithValue): string => {
  // if (output.type === "bytes32") {
  //   return toUtf8String(output.value);
  // }
  if (output.type === "tuple") {
    return parseTuple(output);
  }
  if (typeof output.value === "bigint") {
    return BigInt(output.value).toString();
  }

  return output.value;
};

export default function ContractMethodResult({
  outputs,
}: {
  outputs: SmartContractOutputWithValue[];
}) {
  return (
    <div className="flex flex-col gap-2">
      {outputs.map((output, index) => (
        <div
          key={`${output.type}${index}`} // eslint-disable-line react/no-array-index-key
          className="text-white-300 break-all"
        >
          <span>{formatOutputValue(output)}</span>
          <span className="italic text-sm text-white-900 ml-2">
            {output.type}
          </span>
        </div>
      ))}
    </div>
  );
}
