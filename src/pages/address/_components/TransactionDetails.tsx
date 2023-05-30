import {
  TxnNextPageParamsProps,
  TxnQueryParamsProps,
} from "@api/TransactionsApi";
import Pagination from "@components/commons/Pagination";
import TransactionRow from "@components/commons/TransactionRow";
import {
  SkeletonLoader,
  SkeletonLoaderScreen,
} from "@components/skeletonLoaders/SkeletonLoader";
import PaginationLoader from "@components/skeletonLoaders/PaginationLoader";
import { AddressTransactionsProps } from "./WalletDetails";

interface TransactionDetailsProps {
  aid: string;
  addressTransactions: AddressTransactionsProps;
  isLoading?: boolean;
}

function TxnPagination({
  aid,
  nextPageParams,
}: {
  aid: string;
  nextPageParams: TxnNextPageParamsProps;
}) {
  return (
    <Pagination<TxnQueryParamsProps>
      pathname={`/address/${aid}`}
      nextPageParams={
        nextPageParams
          ? {
              block_number: nextPageParams.block_number,
              items_count: nextPageParams.items_count,
              index: nextPageParams.index,
            }
          : undefined
      }
    />
  );
}

export default function TransactionDetails({
  aid,
  addressTransactions: { transactions, nextPageParams },
  isLoading,
}: TransactionDetailsProps) {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
        <h2
          data-testid="address-txn-list-title"
          className="font-bold text-xl text-white-50"
        >
          Transactions
        </h2>
      </div>
      <div className="relative">
        {isLoading && <PaginationLoader customStyle="right-1 top-0 md:top-0" />}
        <TxnPagination aid={aid} nextPageParams={nextPageParams} />
      </div>

      {isLoading ? (
        <SkeletonLoader rows={7} screen={SkeletonLoaderScreen.Tx} />
      ) : (
        transactions.map((item) => (
          <TransactionRow key={item.hash} rawData={item} />
        ))
      )}
      <div className="relative h-10 md:h-6 lg:pt-1.5">
        {isLoading && (
          <PaginationLoader customStyle="top-0 lg:top-auto right-0 bottom-0 lg:-bottom-[22px]" />
        )}
        <TxnPagination aid={aid} nextPageParams={nextPageParams} />
      </div>
    </div>
  );
}
