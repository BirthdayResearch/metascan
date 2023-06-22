import clsx from "clsx";
import { CodeOptions } from "enum/codeOptions";
import { useState } from "react";
import ContractCodeTab from "./ContractCodeTab";

export default function ContractCode() {
  const [activeTab, setActiveTab] = useState<CodeOptions>(CodeOptions.Code);

  return (
    <div className="mt-10">
      <div className="flex flex-row gap-x-2">
        <button
          type="button"
          onClick={() => setActiveTab(CodeOptions.Code)}
          className={clsx(
            "whitespace-nowrap py-2 px-4 rounded-[24px] text-sm font-medium",
            activeTab === CodeOptions.Code
              ? "bg-white-50 text-black-900"
              : "text-white-50 bg-black-600"
          )}
        >
          {CodeOptions.Code}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab(CodeOptions.Read)}
          className={clsx(
            "whitespace-nowrap py-2 px-4 rounded-[24px] text-sm font-medium",
            activeTab === CodeOptions.Read
              ? "bg-white-50 text-black-900"
              : "text-white-50 bg-black-600"
          )}
        >
          {CodeOptions.Read}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab(CodeOptions.Write)}
          className={clsx(
            "whitespace-nowrap py-2 px-4 rounded-[24px] text-sm font-medium",
            activeTab === CodeOptions.Write
              ? "bg-white-50 text-black-900"
              : "text-white-50 bg-black-600"
          )}
        >
          {CodeOptions.Write}
        </button>
      </div>
      {activeTab === CodeOptions.Code && <ContractCodeTab />}
      {/* {activeTab === CodeOptions.Read && (
        <div className="text-white-50 py-10">
          / ** TODO: ADD READ METHODS. ** /
        </div>
      )} */}
      {/* {activeTab === CodeOptions.Write && (
        <WriteContract writeContractData={writeContractData} />
      )} */}
    </div>
  );
}
