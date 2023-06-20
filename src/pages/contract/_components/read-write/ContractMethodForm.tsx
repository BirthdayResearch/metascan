import { useState } from "react";
import { ContractMethodType, SmartContractInputOutput } from "@api/types";
import ContractMethodTextInput from "./ContractMethodTextInput";
import SubmitButton from "./SubmitButton";

export default function ContractMethodForm({
  id,
  type,
  inputs,
}: {
  id: string;
  type: ContractMethodType;
  inputs: SmartContractInputOutput[];
}) {
  const initValues = Object.fromEntries(
    inputs.map((_item, index) => [index, ""])
  );
  const [userInput, setUserInput] = useState<{ [k: string]: string }>(
    initValues
  );
  const isReadMethod = [
    ContractMethodType.Read,
    ContractMethodType.ReadProxy,
  ].includes(type);

  return (
    <div className="flex flex-col gap-6 mt-4">
      {inputs.map((input: SmartContractInputOutput, index: number) => (
        <ContractMethodTextInput
          key={input.name}
          label={`${input.name} (${input.type})`}
          value={userInput[index]}
          setValue={(value) => setUserInput({ ...userInput, [index]: value })}
          placeholder={`${input.name} (${input.type})`}
          error="" // TODO: Check if any error handling is needed
        />
      ))}
      <SubmitButton
        testId={`${id}-${type}-button`}
        label={isReadMethod ? "Query" : "Write"}
        onClick={() => {
          // TODO: Handle submit
          //   console.log("INPUT!", userInput);
        }}
        disabled={
          Object.keys(userInput).filter((i) => userInput[i]).length <
          inputs.length
        }
      />
    </div>
  );
}
