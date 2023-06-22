import { useState } from "react";
import { useRouter } from "next/router";
import { readContract, writeContract } from "@wagmi/core";
import {
  ContractMethodType,
  SmartContractInputOutput,
  SmartContractMethod,
  SmartContractOutputWithValue,
} from "@api/types";
import ContractMethodTextInput from "./ContractMethodTextInput";
import SubmitButton from "./SubmitButton";

export default function ContractMethodForm({
  id,
  type,
  inputs,
  method,
}: {
  id: string;
  type: ContractMethodType;
  inputs: SmartContractInputOutput[];
  method: SmartContractMethod;
}) {
  const router = useRouter();
  const contractId = router.query.cid as string;

  // TODO: refactor to be more readable
  const initValues = Object.fromEntries(
    inputs.map((_item, index) => [index, ""])
  );
  const [userInput, setUserInput] = useState<{ [k: string]: string }>(
    initValues
  );
  const [result, setResult] = useState<SmartContractOutputWithValue[]>([]);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const isReadMethod = [
    ContractMethodType.Read,
    ContractMethodType.ReadProxy,
  ].includes(type);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const config = {
        address: contractId as `0x${string}`,
        abi: [method],
        functionName: method.name,
        args: [...Object.values(userInput)],
      };
      if (type === ContractMethodType.Write) {
        const { hash } = await writeContract(config);
        formatResultBasedOnOutput(hash);
      } else {
        const data = await readContract(config);
        formatResultBasedOnOutput(data);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatResultBasedOnOutput = (output) => {
    // TOOD: refactor to be more readable
    const formattedResult: SmartContractOutputWithValue[] = method.outputs.map(
      (o, i) => {
        const value = typeof output === "object" ? output[i] : output;
        return {
          type: o.type,
          value,
        };
      }
    );
    setResult(formattedResult);
  };

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
      <div className="flex gap-4">
        <SubmitButton
          testId={`${id}-${type}-button`}
          label={isReadMethod ? "Query" : "Write"}
          onClick={() => handleSubmit()}
          disabled={
            // TODO: refactor to be more readable
            Object.keys(userInput).filter((i) => userInput[i]).length <
              inputs.length || isLoading
          }
        />
        {type === ContractMethodType.Write && result?.length > 0 && (
          <SubmitButton
            testId={`${id}-${type}-result-button`}
            label="View your transaction"
            onClick={() =>
              window.open(
                `/tx/${result[0].value}`,
                "_blank",
                "noopener,noreferrer"
              )
            }
            disabled={
              // TODO: refactor to be more readable
              Object.keys(userInput).filter((i) => userInput[i]).length <
              inputs.length
            }
          />
        )}
      </div>
      {type === ContractMethodType.Read && result?.length > 0 && (
        // TODO: refactor and reuse ContractMethodResult component
        <div className="flex flex-col gap-2">
          {result.map((data) => (
            <div
              key={`${data.type}${data.value}`}
              className="text-white-300 break-all"
            >
              <span>{data.value.toString()}</span>
              <span className="italic text-sm text-white-900 ml-2">
                {data.type}
              </span>
            </div>
          ))}
        </div>
      )}
      {error && <div className="text-red-700 italic mt-4">{error}</div>}
    </div>
  );
}
