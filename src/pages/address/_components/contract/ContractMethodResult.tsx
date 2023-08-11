import { SmartContractOutputWithValue } from "@api/types";

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
          <span>
            {typeof output.value === "bigint"
              ? BigInt(output.value).toString()
              : output.value}
          </span>
          <span className="italic text-sm text-white-900 ml-2">
            {output.type}
          </span>
        </div>
      ))}
    </div>
  );
}
