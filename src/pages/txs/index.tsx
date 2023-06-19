import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import {
  TxnNextPageParamsProps,
  TxnQueryParamsProps,
} from "@api/TransactionsApi";
import { RawTxnWithPaginationProps } from "@api/types";

import Pagination from "@components/commons/Pagination";

import {
  SkeletonLoader,
  SkeletonLoaderScreen,
} from "@components/skeletonLoaders/SkeletonLoader";
import PaginationLoader from "@components/skeletonLoaders/PaginationLoader";
import TransactionRow from "@components/commons/TransactionRow";
import { useTransactionsResultMutation } from "@store/transactions";
import { useNetwork } from "@contexts/NetworkContext";

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

export default function Transactions() {
  const [data, setData] = useState<RawTxnWithPaginationProps>();
  const [isLoading, setIsLoading] = useState(true);
  const { connection } = useNetwork();
  const [transactionsResultMutation] = useTransactionsResultMutation();
  const router = useRouter();

  const fetchTransactions = async () => {
    setIsLoading(true);
    const results = await transactionsResultMutation({
      network: connection,
      blockNumber: router.query.block_number as string,
      itemsCount: router.query.items_count as string,
      index: router.query.index as string,
    }).unwrap();
    // TODO: Handle pagination
    setData(results);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer>
        <div className="p-5 md:p-10">
          <div className="flex flex-col md:flex-row py-6 md:py-4 mb-6 justify-between md:items-center relative">
            <span className="font-bold text-2xl text-white-50">
              Transactions
            </span>
            {isLoading ? (
              <PaginationLoader customStyle="right-0 top-[72px] md:top-8" />
            ) : (
              <TxnPagination nextPageParams={data?.next_page_params} />
            )}
          </div>
          {isLoading ? (
            <SkeletonLoader rows={7} screen={SkeletonLoaderScreen.Tx} />
          ) : (
            data?.items.map((tx) => (
              <TransactionRow key={tx.hash} rawData={tx} />
            ))
          )}

          <div className="relative h-10 md:h-6 lg:pt-1.5">
            {isLoading ? (
              <PaginationLoader customStyle="top-0 lg:top-auto right-0 bottom-0 lg:-bottom-[22px]" />
            ) : (
              <TxnPagination nextPageParams={data?.next_page_params} />
            )}
          </div>
        </div>
      </GradientCardContainer>
    </div>
  );
}
