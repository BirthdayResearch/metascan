import clsx from "clsx";
import { useState } from "react";
import { CodeOptions } from "enum/codeOptions";
import { ContractMethodType } from "@api/types";
import ConnectButton from "./ConnectButton";
import ContractCodeTab from "./ContractCodeTab";
import ReadWriteContract from "./read-write/ReadWriteContract";

export default function ContractCode() {
  const [activeTab, setActiveTab] = useState<CodeOptions>(CodeOptions.Code);
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
      <div className="mt-4 md:mt-5 pb-4 lg:mt-8 md:pb-8 lg:pb-11">
        <ConnectButton />
      </div>
      {activeTab === CodeOptions.Code && <ContractCodeTab />}
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
