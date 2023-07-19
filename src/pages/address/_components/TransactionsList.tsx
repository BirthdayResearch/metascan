import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TransactionDetails from "@components/TransactionDetails";
import { useNetwork } from "@contexts/NetworkContext";
import { useGetAddressTransactionsMutation } from "@store/address";
import { RawTransactionI, TxnNextPageParamsProps } from "@api/types";
import { sleep } from "shared/sleep";

export default function TransactionsList({
  addressHash,
}: {
  addressHash: string;
}) {
  const { connection } = useNetwork();
  const [transactions, setTransactions] = useState<RawTransactionI[]>([]);
  const [nextPageParams, setNextPageParams] =
    useState<TxnNextPageParamsProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [trigger] = useGetAddressTransactionsMutation();
  const router = useRouter();

  const params = router.query;
  const getTransactions = async () => {
    const data = await trigger({
      network: connection,
      itemsCount: params.items_count as string,
      blockNumber: params.block_number as string,
      index: params.index as string,
      addressHash,
    }).unwrap();
    setTransactions(data.items);
    setNextPageParams(data.next_page_params);
    await sleep(150); // added timeout to prevent flicker
    setIsLoading(false);
  };

  useEffect(() => {
    getTransactions();
  }, [params.page_number, addressHash]);

  return (
    <div>
      <TransactionDetails
        data={{ transactions, nextPageParams }}
        pathname={`/address/${addressHash}`}
        type="address"
        isLoading={isLoading}
        isHeaderDisplayed={false}
      />
    </div>
  );
}
