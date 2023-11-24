import { SmartContractOutputWithValue } from "@api/types";
import { toUtf8String } from "ethers";

const formatOutputValue = (output: SmartContractOutputWithValue): string => {
  if (output.type === "bytes32") {
    return toUtf8String(output.value);
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
