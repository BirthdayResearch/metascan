import { useState } from "react";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
import {
  ContractMethodType,
  SmartContractMethod,
  SmartContractOutputWithValue,
  StateMutability,
} from "@api/types";
import ContractMethodForm from "./ContractMethodForm";

export default function ContractMethod({
  method,
  index,
  type,
}: {
  method: SmartContractMethod;
  index: number;
  type: ContractMethodType;
}) {
  const [open, setOpen] = useState(false);
  const id = method.name;
  const displayForm =
    method.inputs.length > 0 ||
    method.stateMutability === StateMutability.Payable;
  return (
    <div
      data-testid={`${id}-contract-method-row`}
      className="py-7 border-b-[0.5px] border-dark-200 last:border-b-0"
    >
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => null}
        onClick={() => setOpen(!open)}
      >
        <div
          data-testid={`${id}-contract-method-name`}
          className="flex items-center font-semibold text-lg text-white-50 -tracking-wide"
        >
          {open ? (
            <IoChevronUpSharp size={24} />
          ) : (
            <IoChevronDownSharp size={24} />
          )}
          <span className="ml-4">{`${index + 1}. ${method.name}`}</span>
        </div>
      </div>
      {open && (
        <div className="pl-5 md:pl-10">
          {method.description && (
            <div className="text-white-300 -tracking-wide mt-4">
              {method.description}
            </div>
          )}
          {displayForm ? (
            // TODO: refactor ContractMethodForm props
            <ContractMethodForm
              id={id}
              type={type}
              inputs={method.inputs}
              method={method}
            />
          ) : (
            <ContractMethodResult
              outputs={method.outputs as SmartContractOutputWithValue[]}
              error={method.error}
            />
          )}
        </div>
      )}
    </div>
  );
}

function ContractMethodResult({
  outputs,
  error,
}: {
  outputs: SmartContractOutputWithValue[];
  error?: string;
}) {
  return error ? (
    <div className="text-red-700 italic mt-4">{error}</div>
  ) : (
    <div className="flex flex-col gap-6 mt-4">
      {outputs.map((output) => (
        <div
          key={`${output.type}${output.value}`}
          className="text-white-300 break-all"
        >
          <span>{output.value}</span>
          <span className="italic text-sm text-white-900 ml-2">
            {output.type}
          </span>
        </div>
      ))}
    </div>
  );
}
