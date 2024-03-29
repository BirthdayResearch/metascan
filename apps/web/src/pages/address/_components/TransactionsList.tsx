import { useRouter } from "next/router";
import TransactionDetails from "@components/TransactionDetails";
import { useNetwork } from "@contexts/NetworkContext";
import { useGetAddressTransactionsMutation } from "@store/address";
import { RawTransactionI, TxnNextPageParamsProps } from "@api/types";
import useFetchListData from "@hooks/useFetchListData";
import { PaginationSource } from "enum/tabsTitle";

export default function TransactionsList({
  addressHash,
}: {
  addressHash: string;
}) {
  const { connection } = useNetwork();
  const [trigger] = useGetAddressTransactionsMutation();
  const router = useRouter();
  const params = router.query;

  const {
    data: transactions,
    isLoading,
    nextPage,
  } = useFetchListData<RawTransactionI, TxnNextPageParamsProps>({
    addressHash,
    source: PaginationSource.Transactions,
    triggerApiCall: () =>
      trigger({
        network: connection,
        itemsCount: params.items_count as string,
        blockNumber: params.block_number as string,
        index: params.index as string,
        addressHash,
      }),
  });

  return (
    <div>
      <TransactionDetails
        data={{ transactions, nextPageParams: nextPage }}
        pathname={`/address/${addressHash}`}
        type="address"
        isLoading={isLoading}
        isHeaderDisplayed={false}
      />
    </div>
  );
}
