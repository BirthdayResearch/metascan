import clsx from "clsx";
import { useRouter } from "next/router";
import { useState } from "react";
import { CodeOptions } from "enum/codeOptions";
import { ContractMethodType } from "@api/types";
import { useGetContractQuery } from "@store/contract";
import { useNetwork } from "@contexts/NetworkContext";
import { transformContractData } from "shared/contractDataHelper";
import { getEnvironment } from "@contexts/Environment";
import Link from "@components/commons/Link";
import ContractCodeBlock from "./ContractCodeBlock";
import ReadWriteContract from "./read-write/ReadWriteContract";
import ContractCodeTab from "./ContractCodeTab";
import ConnectButton from "./ConnectButton";

export default function ContractCode() {
  const router = useRouter();
  const cid = router.query.cid?.toString()!;
  const { connection } = useNetwork();
  const { data: rawContractDetail } = useGetContractQuery({
    network: connection,
    cid,
  });
  const networkQuery = !getEnvironment().isDefaultConnection(connection)
    ? { network: connection }
    : {};

  const [activeTab, setActiveTab] = useState<CodeOptions>(CodeOptions.Code);

  // TODO: Add UI loaders
  if (!rawContractDetail) {
    return <div />;
  }

  const contractDetail = transformContractData(rawContractDetail);

  if (!contractDetail.isVerified) {
    return (
      <div className="text-white-50">
        <div className="mb-8">
          <span>Are you the contract creator?</span>
          <Link
            className="mx-1 text-lightBlue"
            href={{ pathname: "/contract/verify", query: networkQuery }}
          >
            Verify and Publish
          </Link>
          <span>your contract source</span>
        </div>

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
      </div>
    );
  }

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
        {activeTab !== CodeOptions.Code && <ConnectButton />}
      </div>
      {activeTab === CodeOptions.Code && (
        <ContractCodeTab contractDetail={contractDetail} />
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
