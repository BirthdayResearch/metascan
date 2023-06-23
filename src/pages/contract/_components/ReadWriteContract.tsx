import { useState } from "react";
import { useRouter } from "next/router";
import { ContractMethodType } from "@api/types";
import { useNetwork } from "@contexts/NetworkContext";
import { useGetContractMethodsQuery } from "@store/contract";
import { FiLoader } from "react-icons/fi";
import ContractMethod from "./read-write/ContractMethod";

export default function ReadWriteContract({
  type,
  title,
}: {
  type: ContractMethodType;
  title: string;
}) {
  const [expandAll, setExpandAll] = useState<boolean>(false);
  const [resetForm, setResetForm] = useState<boolean>(false);
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
      <FiLoader size={24} className="text-white-50 animate-spin mt-8 mx-auto" />
    );
  }

  if (!isLoading && !methods) {
    return <div className="text-white-50 mt-8">NO METHODS.</div>;
  }

  return (
    <div className="text-white-50">
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <div className="flex flex-grow text-white-50 font-bold text-xl">
          {title}
        </div>
        <div className="flex gap-6 md:gap-10">
          <ActionButton
            text={expandAll ? "Collapse all" : "Expand all"}
            onClick={() => setExpandAll(!expandAll)}
          />
          <ActionButton text="Reset form" onClick={() => setResetForm(true)} />
        </div>
      </div>
      {methods?.map((item, index) => (
        <ContractMethod
          key={item.name}
          type={type}
          method={item}
          index={index}
          expandAll={expandAll}
          resetForm={resetForm}
          setResetForm={setResetForm}
        />
      ))}
    </div>
  );
}

function ActionButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="font-medium text-lightBlue hover:opacity-70"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
