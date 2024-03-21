import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { readContract, writeContract } from "@wagmi/core";
import { parseEther } from "viem";
import { ConnectKitButton } from "connectkit";
import {
  ContractMethodType,
  SmartContractInputOutput,
  SmartContractMethod,
  SmartContractOutputWithValue,
  StateMutability,
} from "@api/types";
import { DFI_TOKEN_SYMBOL } from "shared/constants";
import ContractMethodTextInput from "./ContractMethodTextInput";
import ContractMethodResult from "./ContractMethodResult";
import SubmitButton from "./SubmitButton";

interface KeyValue {
  [k: string]: string;
}

export default function ContractMethodForm({
  type,
  method,
  isWriteOrWriteProxy,
  resetForm,
  setResetForm,
}: {
  type: ContractMethodType;
  method: SmartContractMethod;
  isWriteOrWriteProxy: boolean;
  resetForm: boolean;
  setResetForm: (reset: boolean) => void;
}) {
  const router = useRouter();
  const contractId = router.query.aid as string;
  const { isConnected } = useAccount();

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const defaultInputValues = getDefaultValues(method.inputs ?? []);
  const [userInput, setUserInput] = useState<KeyValue>(defaultInputValues);
  const [dfiValue, setDfiValue] = useState("");
  const [readResult, setReadResult] = useState<SmartContractOutputWithValue[]>(
    [],
  );
  const [writeResult, setWriteResult] = useState<string>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const isPayable = method.stateMutability === StateMutability.Payable; // isPayable -> transaction involves transfer of DFI

  useEffect(() => {
    // Reset all forms
    if (resetForm) {
      setUserInput(defaultInputValues);
      setDfiValue("");
      setReadResult([]);
      setWriteResult(undefined);
      setError("");
      setResetForm(false);
    }
  }, [resetForm]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const config = {
        address: contractId as `0x${string}`,
        abi: [method],
        functionName: method.name,
        args: method.inputs?.length > 0 ? [...Object.values(userInput)] : [],
        ...(dfiValue && { value: parseEther(`${Number(dfiValue)}`) }),
      };
      if (isWriteOrWriteProxy) {
        // Write/WriteProxy
        const { hash } = await writeContract(config);
        setWriteResult(hash);
      } else {
        // Read/ReadProxy
        const data = (await readContract(config)) ?? [];
        const results = method.outputs?.map((output, index) => {
          const value = typeof data === "object" ? data[index] : data;
          return {
            type: output.type,
            value,
          };
        });
        setReadResult(results);
      }
      setError("");
    } catch (e) {
      setError(e.shortMessage ?? e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fieldsWithValue = Object.keys(userInput).filter((i) => userInput[i]);
  const hasCompletedInput = method.inputs?.length === fieldsWithValue.length;

  return (
    <div className="flex flex-col gap-6">
      {isWriteOrWriteProxy && isPayable && (
        // `value` is not part of method `inputs`, only display this additional input field when method is payable
        <ContractMethodTextInput
          label="Value"
          value={dfiValue}
          setValue={(value) => setDfiValue(value)}
          placeholder={`value (${DFI_TOKEN_SYMBOL})`}
          type="number"
        />
      )}
      {method.inputs?.map((input: SmartContractInputOutput, index: number) => (
        <ContractMethodTextInput
          key={`${input.name}-${input.type}`}
          label={`${input.name} (${input.type})`}
          value={userInput[index]}
          setValue={(value) => setUserInput({ ...userInput, [index]: value })}
          placeholder={`${input.name} (${input.type})`}
          valueType={input.type}
        />
      ))}
      <div className="flex gap-4">
        <ConnectKitButton.Custom>
          {({ show }) => (
            <SubmitButton
              testId={`${method.name}-${type}-button`}
              label={isWriteOrWriteProxy ? "Write" : "Query"}
              onClick={!isConnected ? show : () => handleSubmit()}
              disabled={
                !hasCompletedInput || isLoading || (isPayable && !dfiValue)
              }
            />
          )}
        </ConnectKitButton.Custom>
        {/* Write result is always hash */}
        {writeResult && (
          <SubmitButton
            testId={`${method.name}-${type}-result-button`}
            label="View your transaction"
            onClick={() => window.open(`/tx/${writeResult}`, "_blank")}
          />
        )}
      </div>
      {/* Read result */}
      {(type === ContractMethodType.Read ||
        type === ContractMethodType.ReadProxy) &&
        readResult?.length > 0 && <ContractMethodResult outputs={readResult} />}
      {error && <div className="text-red-700 italic -mt-4">{error}</div>}
    </div>
  );
}

/**
 * Returns object with key-value pair based on the `inputs` length,
 * wherein key is the index from array, initialized with empty string
 *
 * Eg: [{name:"amout", type:"uint256"}, {name:"to", type:"address"}] -> { '0': "", '1': "" }
 * @param inputs SmartContractInputOutput[]
 * @returns
 */
function getDefaultValues(inputs: SmartContractInputOutput[]) {
  const defaultValues = inputs.reduce((acc, _curr, index) => {
    const keyValue = { [index]: "" };
    return { ...acc, ...keyValue };
  }, {} as KeyValue);

  return defaultValues;
}
