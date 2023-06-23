import { useRouter } from "next/router";
import { ContractMethodType } from "@api/types";
import { useNetwork } from "@contexts/NetworkContext";
import { useGetContractMethodsQuery } from "@store/contract";
import { FiLoader } from "react-icons/fi";
import Button from "../../../components/commons/Button";
import ContractMethod from "./read-write/ContractMethod";

export default function ReadWriteContract({
  type,
  title,
}: {
  type: ContractMethodType;
  title: string;
}) {
  const { connection } = useNetwork();
  const router = useRouter();
  const cid = router.query.cid?.toString()!;
  const { data: methods, isLoading } = useGetContractMethodsQuery({
    network: connection,
    cid,
    type,
  });

  // TODO: Add UI loaders
  if (isLoading) {
    return (
      <FiLoader
        size={24}
        className="text-white-50 animate-spin mt-10 mx-auto"
      />
    );
  }

  if (!isLoading && !methods) {
    return <div className="text-white-50 mt-8">NO METHODS.</div>;
  }

  return (
    <div className="text-white-50">
      <div className="flex flex-row items-center">
        <div className="flex flex-grow text-white-50 font-bold text-xl mt-[42.5px] md:mb-[39.5px] mb-[47.5px]">
          {title}
        </div>
        <Button
          label="Clear data"
          testId="write-contract-clear-input-button"
          size="small"
          onClick={() => {
            // TODO: Handle form reset
          }}
        />
      </div>
      {methods?.map((item, index) => (
        <ContractMethod
          key={item.name}
          type={type}
          method={item}
          index={index}
        />
      ))}
    </div>
  );
}
