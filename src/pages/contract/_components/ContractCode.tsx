import clsx from "clsx";
import { useState } from "react";
import { CodeOptions } from "enum/codeOptions";
import { ContractMethodType } from "@api/types";
import ConnectButton from "./ConnectButton";
import ContractCodeTab from "./ContractCodeTab";
import ReadWriteContract from "./ReadWriteContract";

export default function ContractCode() {
  // TODO (lyka): set default tab back to CodeOptions.Code
  const [activeTab, setActiveTab] = useState<CodeOptions>(CodeOptions.Read);
  return (
    <div>
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
      <div className="mt-4 md:mt-5 lg:mt-8">
        <ConnectButton />
      </div>
      {activeTab === CodeOptions.Code && (
        <div className="text-white-50 py-10">
          {activeTab === CodeOptions.Code && <ContractCodeTab />}
        </div>
      )}
      {activeTab === CodeOptions.Read && (
        <ReadWriteContract
          title="Read contract"
          type={ContractMethodType.Read}
        />
      )}
      {activeTab === CodeOptions.Write && (
        <ReadWriteContract
          title="Write contract"
          type={ContractMethodType.Write}
        />
      )}
      {/* TODO: Add Read Proxy and Write Proxy */}
    </div>
  );
}
