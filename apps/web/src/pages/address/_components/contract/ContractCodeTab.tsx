import { ContractProps } from "shared/contractDataHelper";
import VerifiedGreenTickIcon from "@components/icons/VerifiedGreenTickIcon";
import ContractCodeBlock from "./ContractCodeBlock";
import DetailRowTitle from "../DetailRowTitle";

export default function ContractCodeTab({
  contractDetail,
}: {
  contractDetail: ContractProps;
}): JSX.Element {
  return (
    <>
      <div className="text-white-50 font-bold text-xl mb-[30.5px]">
        {fixedTitle.codeDetails}
      </div>
      {/* desktop */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-3 grid-rows-2 gap-y-8">
          <div className="flex flex-col gap-y-1">
            <DetailRowTitle title={fixedTitle.contractName} />
            <div className="text-white-50 tracking-[0.01em] break-words">
              {contractDetail.name}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <DetailRowTitle title={fixedTitle.compilerVersion} />
            <div className="text-white-50 tracking-[0.01em]">
              {contractDetail.compilerVersion}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <DetailRowTitle title={fixedTitle.evmVersion} />
            <div className="text-white-50 tracking-[0.01em]">
              {contractDetail.evmVersion}
            </div>
          </div>
          <div className="flex flex-col gap-y-1 row-start-2">
            <DetailRowTitle title={fixedTitle.optimizationEnabled} />
            <div className="flex items-center text-white-50 tracking-[0.01em]">
              <span>{contractDetail.optimizationEnabled ? "Yes" : "No"}</span>
              {contractDetail.optimizationEnabled && (
                <div className="ml-2">
                  <VerifiedGreenTickIcon size={18} />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-1 row-start-2">
            <DetailRowTitle title={fixedTitle.optimizationRuns} />
            <div className="text-white-50 tracking-[0.01em]">
              {contractDetail.optimizationRuns}
            </div>
          </div>
          <div className="flex flex-col gap-y-1 row-start-2">
            <DetailRowTitle title={fixedTitle.verifiedAt} />
            <div className="text-white-50 tracking-[0.01em]">
              {contractDetail.verifiedAt}
            </div>
          </div>
        </div>
      </div>
      {/* tablet */}
      <div className="hidden lg:hidden md:block">
        <div className="grid grid-cols-2 grid-rows-4 gap-y-8">
          <div className="flex flex-col gap-y-1">
            <DetailRowTitle title={fixedTitle.contractName} />
            <div className="text-white-50 tracking-[0.01em]">
              {contractDetail.name}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <DetailRowTitle title={fixedTitle.compilerVersion} />
            <div className="text-white-50 tracking-[0.01em]">
              {contractDetail.compilerVersion}
            </div>
          </div>
          <div className="flex flex-col gap-y-1 row-start-2">
            <DetailRowTitle title={fixedTitle.evmVersion} />
            <div className="text-white-50 tracking-[0.01em]">
              {contractDetail.evmVersion}
            </div>
          </div>
          <div className="flex flex-col gap-y-1 row-start-3">
            <DetailRowTitle title={fixedTitle.optimizationEnabled} />
            <div className="flex items-center text-white-50 tracking-[0.01em]">
              <span>{contractDetail.optimizationEnabled ? "Yes" : "No"}</span>
              {contractDetail.optimizationEnabled && (
                <div className="ml-2">
                  <VerifiedGreenTickIcon size={18} />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-1 row-start-3">
            <DetailRowTitle title={fixedTitle.optimizationRuns} />
            <div className="text-white-50 tracking-[0.01em]">
              {contractDetail.optimizationRuns}
            </div>
          </div>
          <div className="flex flex-col gap-y-1 row-start-4">
            <DetailRowTitle title={fixedTitle.verifiedAt} />
            <div className="text-white-50 tracking-[0.01em]">
              {contractDetail.verifiedAt}
            </div>
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="md:hidden block">
        <div className="grid grid-rows-6 gap-y-6">
          <div className="flex flex-col gap-y-1">
            <DetailRowTitle title={fixedTitle.contractName} />
            <div className="text-white-50 tracking-[0.01em]">
              {contractDetail.name}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <DetailRowTitle title={fixedTitle.compilerVersion} />
            <div className="text-white-50 tracking-[0.01em]">
              {contractDetail.compilerVersion}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <DetailRowTitle title={fixedTitle.evmVersion} />
            <div className="text-white-50 tracking-[0.01em]">
              {contractDetail.evmVersion}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <DetailRowTitle title={fixedTitle.optimizationEnabled} />
            <div className="flex items-center text-white-50 tracking-[0.01em]">
              <span>{contractDetail.optimizationEnabled ? "Yes" : "No"}</span>
              {contractDetail.optimizationEnabled && (
                <div className="ml-2">
                  <VerifiedGreenTickIcon size={18} />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <DetailRowTitle title={fixedTitle.optimizationRuns} />
            <div className="text-white-50 tracking-[0.01em]">
              {contractDetail.optimizationRuns}
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <DetailRowTitle title={fixedTitle.verifiedAt} />
            <div className="text-white-50 tracking-[0.01em]">
              {contractDetail.verifiedAt}
            </div>
          </div>
        </div>
      </div>

      <ContractCodeBlock
        fileName={contractDetail.fileName}
        code={contractDetail.sourceCode}
        codeBlockHeight={200}
        length={contractDetail.numberOfFiles}
        index={1}
      />

      {contractDetail.additionalSourceCodes?.length > 0 &&
        contractDetail.additionalSourceCodes.map((code, index) => (
          <ContractCodeBlock
            key={code.filePath}
            fileName={code.fileName}
            code={code.sourceCode}
            codeBlockHeight={200}
            length={contractDetail.numberOfFiles}
            index={index + 2}
          />
        ))}

      <ContractCodeBlock
        fileName="Contract ABI"
        code={JSON.stringify(contractDetail.abi, null, 2)}
        codeBlockHeight={200}
      />
      {contractDetail.creationBytecode && (
        <ContractCodeBlock
          fileName="Contract Creation Code"
          code={contractDetail.creationBytecode}
          codeBlockHeight={200}
        />
      )}
      {contractDetail.deployedBytecode && (
        <ContractCodeBlock
          fileName="Deployed ByteCode"
          code={contractDetail.deployedBytecode}
          codeBlockHeight={200}
        />
      )}
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
  verifiedAt: "Verified on",
};
