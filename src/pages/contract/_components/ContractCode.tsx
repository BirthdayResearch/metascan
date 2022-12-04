import { CursorPage } from "@components/commons/CursorPagination";
import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import ReadContract, { CodesData } from "./ReadContract";
import WriteContract from "./WriteContract";
import { WriteData } from "./WriteContractRowItem";

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
  const [isReadContractClicked, setIsReadContractClicked] = useState(true);
  return (
    <div className="mt-10">
      <div className="flex flex-row gap-x-2">
        <button
          type="button"
          onClick={() => {
            onOptionsClick(setIsReadContractClicked, CodeOptions.Read);
          }}
          className={clsx(
            "whitespace-nowrap py-2 px-4 rounded-[24px] font-medium",
            isReadContractClicked
              ? "bg-white-50 text-black-900"
              : "text-white-50 bg-black-600"
          )}
        >
          {CodeOptions.Read}
        </button>
        <button
          type="button"
          onClick={() => {
            onOptionsClick(setIsReadContractClicked, CodeOptions.Write);
          }}
          className={clsx(
            "whitespace-nowrap py-2 px-4 rounded-[24px] font-medium",
            isReadContractClicked
              ? "text-white-50 bg-black-600"
              : "bg-white-50 text-black-900"
          )}
        >
          {CodeOptions.Write}
        </button>
      </div>
      {isReadContractClicked ? (
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
      ) : (
        <WriteContract writeContractData={writeContractData} />
      )}
    </div>
  );
}

const onOptionsClick = (
  setIsReadContractClicked: Dispatch<SetStateAction<boolean>>,
  itemClicked: CodeOptions
) => {
  switch (itemClicked) {
    case CodeOptions.Read:
      setIsReadContractClicked(true);
      break;
    case CodeOptions.Write:
      setIsReadContractClicked(false);
      break;
    default:
      setIsReadContractClicked(true);
      break;
  }
};

enum CodeOptions {
  Read = "Read contract",
  Write = "Write contract",
}
