import {
  TxnNextPageParamsProps,
  TxnQueryParamsProps,
} from "@api/TransactionsApi";
import { RawTransactionI } from "@api/types";

import GradientCardContainer from "@components/commons/GradientCardContainer";
import Pagination from "@components/commons/Pagination";
import TransactionRow from "@components/commons/TransactionRow";
import PaginationLoader from "@components/skeletonLoaders/PaginationLoader";
import {
  SkeletonLoader,
  SkeletonLoaderScreen,
} from "@components/skeletonLoaders/SkeletonLoader";

interface PageProps {
  blockNumber: string;
  transactions: RawTransactionI[];
  nextPageParams?: TxnNextPageParamsProps;
  isLoading?: boolean;
}

function BlockPagination({
  blockNumber,
  nextPageParams,
}: {
  nextPageParams?: TxnNextPageParamsProps;
  blockNumber: string;
}) {
  return (
    <Pagination<TxnQueryParamsProps>
      nextPageParams={
        nextPageParams
          ? {
              block_number: nextPageParams.block_number,
              items_count: nextPageParams.items_count,
              index: nextPageParams.index,
            }
          : undefined
      }
      pathname={`/block/${blockNumber}`}
    />
  );
}

export default function BlockTransactionList({
  blockNumber,
  transactions,
  nextPageParams,
  isLoading,
}: PageProps): JSX.Element {
  return (
    <GradientCardContainer>
      <div className="p-5 md:p-10">
        <div className="flex flex-col md:flex-row mb-6 justify-between md:items-center">
          <h2
            data-testid="block-txn-list-title"
            className="font-bold text-xl text-white-50"
          >
            Transactions
          </h2>
          <div className="flex flex-col md:flex-row py-6 md:py-4 mb-6 justify-between md:items-center relative">
            {isLoading && (
              <PaginationLoader customStyle="right-0 top-[72px] md:top-8" />
            )}
            <BlockPagination
              nextPageParams={nextPageParams}
              blockNumber={blockNumber}
            />
          </div>
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
          <BlockPagination
            nextPageParams={nextPageParams}
            blockNumber={blockNumber}
          />
        </div>
      </div>
    </GradientCardContainer>
  );
}
