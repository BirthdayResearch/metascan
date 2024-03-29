import clsx from "clsx";
import { useState } from "react";
import { CodeOptions } from "enum/codeOptions";
import { ContractMethodType } from "@api/types";
import { useGetContractQuery } from "@store/contract";
import { useNetwork } from "@contexts/NetworkContext";
import { transformContractData } from "shared/contractDataHelper";
import { getEnvironment } from "@contexts/Environment";
import Link from "@components/commons/Link";
import ContractCodeBlock from "./contract/ContractCodeBlock";
import ContractCodeTab from "./contract/ContractCodeTab";
import ReadWriteContract from "./contract/ReadWriteContract";

export default function ContractCode({
  addressHash,
  implementationAddress,
}: {
  addressHash: string;
  implementationAddress: string | null;
}) {
  const { connection } = useNetwork();
  const { data: rawContractDetail, isLoading } = useGetContractQuery({
    network: connection,
    addressHash,
  });
  const networkQuery = !getEnvironment().isDefaultConnection(connection)
    ? { network: connection, addressHash }
    : { addressHash };

  const [activeTab, setActiveTab] = useState<CodeOptions>(CodeOptions.Code);

  // TODO: Add UI loaders
  if (isLoading) {
    return <div />;
  }
  if (!rawContractDetail) {
    return (
      <div className="text-white-50">Not able to get contract details</div>
    );
  }

  const contractDetail = transformContractData(rawContractDetail);

  if (!contractDetail.isVerified) {
    return (
      <div className="text-white-50">
        <div className="mb-8">
          <span>Are you the contract creator?</span>
          <Link
            className="mx-1 text-lightBlue"
            href={{ pathname: `/address/verify`, query: networkQuery }}
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

  const contractMethodTabs = [
    {
      id: CodeOptions.Read,
      type: ContractMethodType.Read,
      implementationAddress: null,
    },
    {
      id: CodeOptions.Write,
      type: ContractMethodType.Write,
      implementationAddress: null,
    },
    ...(implementationAddress !== null
      ? [
          {
            id: CodeOptions.ReadProxy,
            type: ContractMethodType.ReadProxy,
            implementationAddress,
          },
          {
            id: CodeOptions.WriteProxy,
            type: ContractMethodType.WriteProxy,
            implementationAddress,
          },
        ]
      : []),
  ];

  return (
    <div>
      <div className="flex flex-row gap-x-2 mb-4 md:mb-5 pb-4 lg:mb-8">
        <button
          type="button"
          onClick={() => setActiveTab(CodeOptions.Code)}
          className={clsx(
            "whitespace-nowrap py-2 px-4 rounded-[24px] text-sm font-medium",
            activeTab === CodeOptions.Code
              ? "bg-white-50 text-black-900"
              : "text-white-50 bg-black-600",
          )}
        >
          {CodeOptions.Code}
        </button>
        {contractMethodTabs.map(({ id }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={clsx(
              "whitespace-nowrap py-2 px-4 rounded-[24px] text-sm font-medium",
              activeTab === id
                ? "bg-white-50 text-black-900"
                : "text-white-50 bg-black-600",
            )}
          >
            {id}
          </button>
        ))}
      </div>
      {activeTab === CodeOptions.Code && (
        <ContractCodeTab contractDetail={contractDetail} />
      )}

      {contractMethodTabs.map(
        (tab) =>
          activeTab === tab.id && (
            <ReadWriteContract
              key={tab.id}
              title={tab.id}
              type={tab.type}
              addressHash={addressHash}
              implementationAddress={tab.implementationAddress}
            />
          ),
      )}
    </div>
  );
}
