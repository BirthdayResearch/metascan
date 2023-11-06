import { useEffect, useState } from "react";
import {
  ContractMethodType,
  SmartContractMethod,
  StateMutability,
} from "@api/types";
import { useNetwork } from "@contexts/NetworkContext";
import { useGetContractMethodsMutation } from "@store/contract";
import { FiLoader } from "react-icons/fi";
import LinkText from "@components/commons/LinkText";
import ContractMethod from "./ContractMethod";
import ConnectButton from "./ConnectButton";

export default function ReadWriteContract({
  type,
  title,
  addressHash,
  implementationAddress,
}: {
  type: ContractMethodType;
  title: string;
  addressHash: string;
  implementationAddress: string | null;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [expandAll, setExpandAll] = useState<boolean>(false);
  const [resetForm, setResetForm] = useState<boolean>(false);
  const { connection } = useNetwork();
  const [trigger] = useGetContractMethodsMutation();
  const [methods, setMethods] = useState<SmartContractMethod[]>([]);

  const fetchMethods = async () => {
    setIsLoading(true);
    const data = await trigger({
      network: connection,
      addressHash,
      type,
    }).unwrap();

    if (
      type === ContractMethodType.Read ||
      type === ContractMethodType.ReadProxy
    ) {
      const readMethods = data.filter((method) =>
        [StateMutability.Pure, StateMutability.View].includes(
          method.stateMutability
        )
      );

      setMethods(readMethods ?? []);
      setIsLoading(false);
      return;
    }

    setMethods(data ?? []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMethods();
  }, []);

  // TODO: Add UI loaders
  if (isLoading) {
    return (
      <FiLoader size={24} className="text-white-50 animate-spin mt-8 mx-auto" />
    );
  }

  if (!isLoading && (!methods || methods?.length === 0)) {
    return (
      <div className="text-white-50 mt-8">
        There are no available Contract ABI methods to read.
      </div>
    );
  }

  return (
    <div className="text-white-50 text-lg">
      {implementationAddress !== null && (
        <div className=" pb-7">
          Implementation address:
          <LinkText
            testId="wallet-id-copied"
            label={` ${implementationAddress}`}
            href={`/address/${implementationAddress}`}
            customStyle="font-semibold"
            // TODO (lyka): Redirect to new tab
          />
        </div>
      )}
      <div className="md:pb-8 lg:pb-11">
        <ConnectButton />
      </div>
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
          key={`${item.name}-${item.type}`}
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
