import {
  CursorPage,
  CursorPagination,
} from "@components/commons/CursorPagination";
import { useRouter } from "next/router";
import ReadContractCodeFile from "./ReadContractCodeFile";
import VerifiedContractSubtitle from "./VerifiedContractSubtitle";

export interface CodesData {
  fileName: string;
  code: string;
}

export default function ReadContract({
  contractName,
  compilerVersion,
  evmVersion,
  optimizedEnabled,
  optimizationRuns,
  verifiedAt,
  codes,
  pages,
}: {
  contractName: string;
  compilerVersion: string;
  evmVersion: string;
  optimizedEnabled: boolean;
  optimizationRuns: number;
  verifiedAt: string;
  codes: CodesData[];
  pages: CursorPage[];
}): JSX.Element {
  const router = useRouter();
  const id = router.query.cid;
  return (
    <>
      <div className="text-white-50 font-bold text-xl mt-[42.5px] mb-[30.5px]">
        {fixedTitle.codeDetails}
      </div>
      {/* desktop */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-4 grid-rows-2 gap-y-8">
          <div className="flex flex-col gap-y-1">
            <VerifiedContractSubtitle title={fixedTitle.contractName} />
            <div className="text-white-50 tracking-[0.01em] break-words">
              {contractName}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <VerifiedContractSubtitle title={fixedTitle.compilerVersion} />
            <div className="text-white-50 tracking-[0.01em]">
              {compilerVersion}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <VerifiedContractSubtitle title={fixedTitle.evmVersion} />
            <div className="text-white-50 tracking-[0.01em]">{evmVersion}</div>
          </div>
          <div className="flex flex-col gap-y-1 row-start-2">
            <VerifiedContractSubtitle title={fixedTitle.optimizationEnabled} />
            <div className="text-white-50 tracking-[0.01em]">
              {optimizedEnabled.toString()}
            </div>
          </div>
          <div className="flex flex-col gap-y-1 row-start-2">
            <VerifiedContractSubtitle title={fixedTitle.optimizationRuns} />
            <div className="text-white-50 tracking-[0.01em]">
              {optimizationRuns}
            </div>
          </div>
          <div className="flex flex-col gap-y-1 row-start-2">
            <VerifiedContractSubtitle title={fixedTitle.verifiedAt} />
            <div className="text-white-50 tracking-[0.01em]">{verifiedAt}</div>
          </div>
        </div>
      </div>
      {/* tablet */}
      <div className="hidden lg:hidden md:block">
        <div className="grid grid-cols-2 grid-rows-4 gap-y-8">
          <div className="flex flex-col gap-y-1">
            <VerifiedContractSubtitle title={fixedTitle.contractName} />
            <div className="text-white-50 tracking-[0.01em]">
              {contractName}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <VerifiedContractSubtitle title={fixedTitle.compilerVersion} />
            <div className="text-white-50 tracking-[0.01em]">
              {compilerVersion}
            </div>
          </div>
          <div className="flex flex-col gap-y-1 row-start-2">
            <VerifiedContractSubtitle title={fixedTitle.evmVersion} />
            <div className="text-white-50 tracking-[0.01em]">{evmVersion}</div>
          </div>
          <div className="flex flex-col gap-y-1 row-start-3">
            <VerifiedContractSubtitle title={fixedTitle.optimizationEnabled} />
            <div className="text-white-50 tracking-[0.01em]">
              {optimizedEnabled.toString()}
            </div>
          </div>
          <div className="flex flex-col gap-y-1 row-start-3">
            <VerifiedContractSubtitle title={fixedTitle.optimizationRuns} />
            <div className="text-white-50 tracking-[0.01em]">
              {optimizationRuns}
            </div>
          </div>
          <div className="flex flex-col gap-y-1 row-start-4">
            <VerifiedContractSubtitle title={fixedTitle.verifiedAt} />
            <div className="text-white-50 tracking-[0.01em]">{verifiedAt}</div>
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="md:hidden block">
        <div className="grid grid-rows-6 gap-y-6">
          <div className="flex flex-col gap-y-1">
            <VerifiedContractSubtitle title={fixedTitle.contractName} />
            <div className="text-white-50 tracking-[0.01em]">
              {contractName}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <VerifiedContractSubtitle title={fixedTitle.compilerVersion} />
            <div className="text-white-50 tracking-[0.01em]">
              {compilerVersion}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <VerifiedContractSubtitle title={fixedTitle.evmVersion} />
            <div className="text-white-50 tracking-[0.01em]">{evmVersion}</div>
          </div>
          <div className="flex flex-col gap-y-1">
            <VerifiedContractSubtitle title={fixedTitle.optimizationEnabled} />
            <div className="text-white-50 tracking-[0.01em]">
              {optimizedEnabled.toString()}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <VerifiedContractSubtitle title={fixedTitle.optimizationRuns} />
            <div className="text-white-50 tracking-[0.01em]">
              {optimizationRuns}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <VerifiedContractSubtitle title={fixedTitle.verifiedAt} />
            <div className="text-white-50 tracking-[0.01em]">{verifiedAt}</div>
          </div>
        </div>
      </div>

      <div className="text-white-50 font-bold text-xl mt-[86.5px]">
        {fixedTitle.codeSource}
      </div>

      {codes.map((item, index) => (
        <ReadContractCodeFile
          key={item.fileName}
          fileName={item.fileName}
          code={item.code}
          length={codes.length}
          index={index + 1}
        />
      ))}

      <CursorPagination
        pages={pages}
        path={`/contract/${id}`}
        className="flex w-full md:justify-end mt-12 md:mt-10"
      />
    </>
  );
}

const fixedTitle = {
  codeDetails: "Code Details",
  contractName: "Contract Name",
  compilerVersion: "Compiler version",
  evmVersion: "EVM version",
  optimizationEnabled: "Optimization enabled",
  optimizationRuns: "Optimization runs",
  verifiedAt: "Verified at",
  codeSource: "Code Source",
};
