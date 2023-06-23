import { useState } from "react";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
import {
  ContractMethodType,
  SmartContractMethod,
  SmartContractOutputWithValue,
} from "@api/types";
import ContractMethodForm from "./ContractMethodForm";
import ContractMethodResult from "./ContractMethodResult";

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

  const isWriteOrWriteProxy = [
    ContractMethodType.Write,
    ContractMethodType.WriteProxy,
  ].includes(type);
  const shouldDisplayForm = method.inputs.length > 0 || isWriteOrWriteProxy;

  return (
    <div
      data-testid={`${method.name}-contract-method-row`}
      className="py-7 border-b-[0.5px] border-dark-200 last:border-b-0"
    >
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => null}
        onClick={() => setOpen(!open)}
      >
        <div
          data-testid={`${method.name}-contract-method-name`}
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
        <div className="pl-5 md:pl-10 flex flex-col gap-4 mt-4">
          {method.description && (
            <div className="text-white-300 -tracking-wide">
              {method.description}
            </div>
          )}
          {shouldDisplayForm ? (
            <ContractMethodForm
              type={type}
              method={method}
              isWriteOrWriteProxy={isWriteOrWriteProxy}
            />
          ) : (
            <ContractMethodResult
              outputs={method.outputs as SmartContractOutputWithValue[]}
            />
          )}
          {method.error && (
            <div className="text-red-700 italic mt-4">{method.error}</div>
          )}
        </div>
      )}
    </div>
  );
}
