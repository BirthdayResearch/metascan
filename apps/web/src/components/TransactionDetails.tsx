import { TxnQueryParamsProps } from "@api/TransactionsApi";
import Pagination from "@components/commons/Pagination";
import TransactionRow from "@components/commons/TransactionRow";
import {
  SkeletonLoader,
  SkeletonLoaderScreen,
} from "@components/skeletonLoaders/SkeletonLoader";
import PaginationLoader from "@components/skeletonLoaders/PaginationLoader";
import { RawTransactionI, TxnNextPageParamsProps } from "@api/types";
import { transformTransactionData } from "shared/transactionDataHelper";
import { PaginationSource } from "enum/tabsTitle";

interface TransactionsProps {
  transactions: RawTransactionI[];
  nextPageParams?: TxnNextPageParamsProps;
}

interface TransactionDetailsProps {
  data: TransactionsProps;
  pathname: string;
  type: "address" | "block";
  isLoading?: boolean;
  isHeaderDisplayed?: boolean;
}

function TxnPagination({
  pathname,
  nextPageParams,
}: {
  pathname: string;
  nextPageParams?: TxnNextPageParamsProps;
}) {
  const source = pathname.includes("/txs")
    ? undefined // source not needed for main transaction list page (/txs)
    : PaginationSource.Transactions;
  return (
    <Pagination<TxnQueryParamsProps>
      pathname={pathname}
      nextPageParams={
        nextPageParams
          ? {
              block_number: nextPageParams.block_number,
              items_count: nextPageParams.items_count,
              index: nextPageParams.index,
            }
          : undefined
      }
      source={source}
    />
  );
}

export default function TransactionDetails({
  data: { transactions, nextPageParams },
  type,
  pathname,
  isHeaderDisplayed = true,
  isLoading,
}: TransactionDetailsProps) {
  const isTxnListEmpty = transactions.length === 0;
  return (
    <div>
      {isHeaderDisplayed && (
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
          <h2
            data-testid={`${type}-txn-list-title`}
            className="font-bold text-xl text-white-50"
          >
            {isTxnListEmpty ? "No transactions" : "Transactions"}
          </h2>
        </div>
      )}
      {!isLoading && isTxnListEmpty ? (
        <div className="text-white-50">
          {`There are no transactions found in this ${type}`}
        </div>
      ) : (
        <>
          <div className="relative">
            {isLoading && <PaginationLoader customStyle="right-1 top-0" />}
            <TxnPagination
              pathname={pathname}
              nextPageParams={nextPageParams}
            />
          </div>

          {isLoading ? (
            <SkeletonLoader rows={7} screen={SkeletonLoaderScreen.Tx} />
          ) : (
            transactions.map((item) => (
              <TransactionRow
                key={item.hash}
                data={transformTransactionData(item)}
              />
            ))
          )}
          <div className="relative h-10 md:h-6 lg:pt-1.5">
            {isLoading && (
              <PaginationLoader customStyle="top-0 lg:top-auto right-0 bottom-0 lg:-bottom-[22px]" />
            )}
            <TxnPagination
              pathname={pathname}
              nextPageParams={nextPageParams}
            />
          </div>
        </>
      )}
    </div>
  );
}
