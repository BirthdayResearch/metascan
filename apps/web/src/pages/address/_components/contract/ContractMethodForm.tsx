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
import { useNetwork } from "@contexts/NetworkContext";
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
  const { connection } = useNetwork();

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

  // To handle user input values based on the type of method input
  function convertUserInputs(
    input: KeyValue,
    inputTypes: SmartContractInputOutput[] | [],
  ) {
    return Object.entries(input).map(([, value], i) => {
      const inputType = inputTypes[i].type;

      // Check if input type is an array of uint256 values
      if (inputType.endsWith("[]")) {
        // parse the string into an array
        return JSON.parse(value);
      }

      if (inputType === "bool") {
        return value === "true";
      }
      if (inputType === "uint256") {
        return parseEther(value);
      }
      return value;
    });
  }

  const handleSubmit = async () => {
    try {
      const convertedValue = convertUserInputs(userInput, method.inputs);
      setIsLoading(true);
      const config = {
        address: contractId as `0x${string}`,
        abi: [method],
        functionName: method.name,
        args: method.inputs?.length > 0 ? convertedValue : [],
        ...(dfiValue && { value: parseEther(`${Number(dfiValue)}`) }), // to specify the amount of Ether to send with the contract function call, if any
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
            onClick={() =>
              window.open(`/tx/${writeResult}?network=${connection}`, "_blank")
            }
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
 * Eg: [{name:"amount", type:"uint256"}, {name:"to", type:"address"}] -> { '0': "", '1': "" }
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
