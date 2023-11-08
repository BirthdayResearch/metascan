import clsx from "clsx";
import { useEffect, useState } from "react";
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
  expandAll,
  resetForm,
  setResetForm,
}: {
  method: SmartContractMethod;
  index: number;
  type: ContractMethodType;
  expandAll: boolean;
  resetForm: boolean;
  setResetForm: (reset: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(expandAll);
  }, [expandAll]);

  const isWriteOrWriteProxy = [
    ContractMethodType.Write,
    ContractMethodType.WriteProxy,
  ].includes(type);
  const shouldDisplayForm = method.inputs?.length > 0 || isWriteOrWriteProxy;

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
          className={clsx(
            "flex items-center text-lg text-white-50 -tracking-wide",
            "hover:font-semibold hover:text-green-800",
            { "font-semibold": open },
          )}
        >
          {open ? (
            <IoChevronUpSharp size={24} />
          ) : (
            <IoChevronDownSharp size={24} />
          )}
          <span className="ml-4">{`${index + 1}. ${
            method.name ?? method.type
          }`}</span>
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
              resetForm={resetForm}
              setResetForm={setResetForm}
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
