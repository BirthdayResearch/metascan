import { CursorPage } from "@components/commons/CursorPagination";
import clsx from "clsx";
import { CodeOptions } from "enum/codeOptions";
import { useState } from "react";
import ReadContract, { CodesData } from "./ReadContract";
import WriteContract from "./WriteContract";
import { WriteData } from "./WriteContractInputItem";

interface ContractCodeProps {
  contractName: string;
  compilerVersion: string;
  evmVersion: string;
  optimizedEnabled: boolean;
  optimizationRuns: number;
  verifiedAt: string;
  codes: CodesData[];
  pages: CursorPage[];
  writeContractData: WriteData[];
}

export default function ContractCode({
  contractName,
  compilerVersion,
  evmVersion,
  optimizedEnabled,
  optimizationRuns,
  verifiedAt,
  codes,
  pages,
  writeContractData,
}: ContractCodeProps) {
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
          {CodeOptions.Read}
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
      {activeTab === CodeOptions.Code && (
        <ReadContract
          contractName={contractName}
          compilerVersion={compilerVersion}
          evmVersion={evmVersion}
          optimizedEnabled={optimizedEnabled}
          optimizationRuns={optimizationRuns}
          verifiedAt={verifiedAt}
          codes={codes}
          pages={pages}
        />
      )}
      {activeTab === CodeOptions.Read && (
        <div className="text-white-50 py-10">
          / ** TODO: ADD READ METHODS. ** /
        </div>
      )}
      {activeTab === CodeOptions.Write && (
        <WriteContract writeContractData={writeContractData} />
      )}
    </div>
  );
}
