import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import { TxnQueryParamsProps } from "@api/TransactionsApi";
import Pagination from "@components/commons/Pagination";
import { RawTransactionI, TxnNextPageParamsProps } from "@api/types";
import {
  SkeletonLoader,
  SkeletonLoaderScreen,
} from "@components/skeletonLoaders/SkeletonLoader";
import PaginationLoader from "@components/skeletonLoaders/PaginationLoader";
import TransactionRow from "@components/commons/TransactionRow";
import { transformTransactionData } from "shared/transactionDataHelper";
import { useNetwork } from "@contexts/NetworkContext";
import { useGetTransactionsMutation } from "@store/transactions";
import { sleep } from "shared/sleep";

export default function Transactions() {
  const [transactions, setTransactions] = useState<RawTransactionI[]>([]);
  const [nextPage, setNextPage] = useState<TxnNextPageParamsProps>();

  const [isLoading, setIsLoading] = useState(true);
  const { connection } = useNetwork();
  const [trigger] = useGetTransactionsMutation();
  const router = useRouter();

  const params = router.query;
  const fetchTransactions = async () => {
    setIsLoading(true);
    const data = await trigger({
      network: connection,
      blockNumber: params.block_number as string,
      itemsCount: params.items_count as string,
      index: params.index as string,
    }).unwrap();
    setTransactions(data.items);
    setNextPage(data.next_page_params);
    await sleep(150); // added timeout to prevent flicker
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, [params.page_number]);

  return (
    <div className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer>
        <div className="p-5 md:p-10">
          <div className="flex flex-col md:flex-row py-6 md:py-4 mb-6 justify-between md:items-center relative">
            <span className="font-bold text-2xl text-white-50">
              Transactions
            </span>
            {isLoading && (
              <PaginationLoader customStyle="right-0 top-[72px] md:top-8" />
            )}
            <TxnPagination nextPageParams={nextPage} />
          </div>
          {isLoading ? (
            <SkeletonLoader rows={22} screen={SkeletonLoaderScreen.Tx} />
          ) : (
            transactions.map((tx) => (
              <TransactionRow
                key={tx.hash}
                data={transformTransactionData(tx)}
              />
            ))
          )}

          <div className="relative h-10 md:h-6 lg:pt-1.5">
            {isLoading && (
              <PaginationLoader customStyle="top-0 lg:top-auto right-0 bottom-0 lg:-bottom-[22px]" />
            )}
            <TxnPagination nextPageParams={nextPage} />
          </div>
        </div>
      </GradientCardContainer>
    </div>
  );
}

function TxnPagination({
  nextPageParams,
}: {
  nextPageParams?: TxnNextPageParamsProps;
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
    />
  );
}
