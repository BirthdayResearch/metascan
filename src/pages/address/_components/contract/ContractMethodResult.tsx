import { SmartContractOutputWithValue } from "@api/types";

export default function ContractMethodResult({
  outputs,
}: {
  outputs: SmartContractOutputWithValue[];
}) {
  return (
    <div className="flex flex-col gap-2">
      {outputs.map((output) => (
        <div
          key={`${output.type}${output.value}`}
          className="text-white-300 break-all"
        >
          <span>{output.value.toString()}</span>
          <span className="italic text-sm text-white-900 ml-2">
            {output.type}
          </span>
        </div>
      ))}
    </div>
  );
}
