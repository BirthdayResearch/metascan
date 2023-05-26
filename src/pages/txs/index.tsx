import GradientCardContainer from "@components/commons/GradientCardContainer";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import TransactionsApi, {
  TxnNextPageParamsProps,
  TxnQueryParamsProps,
} from "@api/TransactionsApi";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import { NetworkConnection } from "@contexts/Environment";
import Pagination from "@components/commons/Pagination";
import { RawTransactionI } from "@api/types";
import { isNumeric } from "shared/textHelper";
import { useState, useEffect } from "react";
import {
  SkeletonLoader,
  SkeletonLoaderScreen,
} from "@components/skeletonLoaders/SkeletonLoader";
import TransactionRow from "./_components/TransactionRow";

interface PageProps {
  transactions: RawTransactionI[];
  next_page_params: TxnNextPageParamsProps;
}

function TxnPagination({
  nextPageParams,
  onClick,
}: {
  nextPageParams: TxnNextPageParamsProps;
  onClick: () => void;
}) {
  return (
    <Pagination<TxnQueryParamsProps>
      onClick={onClick}
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

export default function Transactions({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePaginationClick = async () => {
    setIsLoading(true);
  };

  // TODO @chloe causing bug for loading state
  useEffect(() => {
    setIsLoading(false);
  }, [data]);

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
              <div className="bg-dark-200 opacity-10 w-[130px] absolute right-0 top-8 rounded-[5px]" />
            ) : (
              <TxnPagination
                onClick={handlePaginationClick}
                nextPageParams={data.next_page_params}
              />
            )}
          </div>
          {isLoading ? (
            <SkeletonLoader rows={7} screen={SkeletonLoaderScreen.Tx} />
          ) : (
            data.transactions.map((tx) => (
              <TransactionRow key={tx.hash} rawData={tx} />
            ))
          )}

          {isLoading ? (
            <div className="bg-dark-200 opacity-10 w-[130px] absolute right-0 top-8 rounded-[5px]" />
          ) : (
            <TxnPagination
              onClick={handlePaginationClick}
              nextPageParams={data.next_page_params}
            />
          )}
        </div>
      </GradientCardContainer>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ data: PageProps }>> {
  const { network, ...params } = context.query;

  // Avoid fetching if some params are not valid
  const hasInvalidParams =
    !isNumeric(params?.block_number as string) ||
    !isNumeric(params?.items_count as string) ||
    !isNumeric(params?.page_number as string) ||
    !isNumeric(params?.index as string);

  // Fetch data from external API
  const txs = hasInvalidParams
    ? await TransactionsApi.getTransactions(network as NetworkConnection)
    : await TransactionsApi.getTransactions(
        network as NetworkConnection,
        params?.block_number as string,
        params?.items_count as string,
        params?.index as string
      );
  const data = {
    transactions: txs.items,
    next_page_params: txs.next_page_params as TxnNextPageParamsProps,
  };

  // Pass data to the page via props
  return { props: { data } };
}
