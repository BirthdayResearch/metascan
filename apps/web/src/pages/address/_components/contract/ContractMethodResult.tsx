import { SmartContractOutputWithValue } from "@api/types";

const parseNestedValue = (value: any): any => {
  if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return parseTuple({ type: "tuple", value });
  }
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return formatOutputValue({ type: typeof value, value });
};

const parseTuple = (output: SmartContractOutputWithValue): string => {
  const tupleData = output.value;
  let parsedTuple = "";
  let tupleStructure: any;

  if (Array.isArray(tupleData)) {
    tupleStructure = [];

    for (let i = 0; i < tupleData.length; i += 1) {
      const value = tupleData[i];
      tupleStructure.push(parseNestedValue(value));
    }
  } else if (typeof tupleData === "object" && tupleData !== null) {
    tupleStructure = {};
    const tupleKeys = Object.keys(tupleData);

    for (let i = 0; i < tupleKeys.length; i += 1) {
      const key = tupleKeys[i];

      if (Object.prototype.hasOwnProperty.call(tupleData, key)) {
        const value = tupleData[key];
        tupleStructure[key] = parseNestedValue(value);
      }
    }
  }

  parsedTuple = JSON.stringify(tupleStructure);
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
  if (typeof output.value === "boolean") {
    return JSON.stringify(output.value);
  }

  // for outputs like uint256[], int256[], etc
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
