import clsx from "clsx";
import { CodeOptions } from "enum/codeOptions";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLazyGetContractMethodsQuery } from "@store/smartContract";
import { useNetwork } from "@contexts/NetworkContext";
import { ContractMethodType, SmartContractMethod } from "@api/types";
import ReadWriteContract from "./ReadWriteContract";

export default function ContractCode() {
  const [activeTab, setActiveTab] = useState<CodeOptions>(CodeOptions.Read);
  const [contractMethods, setContractMethods] = useState<{
    read: SmartContractMethod[];
    write: SmartContractMethod[];
  }>({
    read: [],
    write: [],
  });

  const { connection } = useNetwork();
  const [getContractMethods] = useLazyGetContractMethodsQuery();

  const router = useRouter();
  const contractId = router.query.cid as string;

  const fetchContractMethods = async () => {
    const readMethods = await getContractMethods({
      network: connection,
      smartContractId: contractId,
      method: "read",
    });
    const writeMethods = await getContractMethods({
      network: connection,
      smartContractId: contractId,
      method: "write",
    });
    // TODO: Add proxy
    setContractMethods({
      read: readMethods.data ?? [],
      write: writeMethods.data ?? [],
    });
  };

  useEffect(() => {
    fetchContractMethods();
  }, []);

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
      {activeTab === CodeOptions.Code && (
        <div className="text-white-50 py-10">
          / ** TODO: ADD CONTRACT CODE ** /
          {/* 
          <ReadContract
          contractName={contractName}
          compilerVersion={compilerVersion}
          evmVersion={evmVersion}
          optimizedEnabled={optimizedEnabled}
          optimizationRuns={optimizationRuns}
          verifiedAt={verifiedAt}
          codes={codes}
          pages={pages}
        /> */}
        </div>
      )}
      {activeTab === CodeOptions.Read && (
        <ReadWriteContract
          title="Read contract"
          type={ContractMethodType.Read}
          methods={contractMethods.read}
        />
      )}
      {activeTab === CodeOptions.Write && (
        <ReadWriteContract
          title="Write contract"
          type={ContractMethodType.Write}
          methods={contractMethods.write}
        />
      )}
    </div>
  );
}
