import TokenStatsDisplay from "@components/TokenStatsDisplay";
import { HomeTitle } from "@components/HomeTitle";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import { GetServerSidePropsResult, InferGetServerSidePropsType } from "next";
import GroupStatisticCard from "@components/GroupStatisticCard";
import LatestDataTable, { RowData } from "@components/LatestDataTable";
import LatestDataApi from "@api/LatestDataApi";
import { MAIN_LATEST_TRANSACTION_URL } from "@api/index";
import dayjs from "dayjs";
import { TransactionType } from "../mockdata/TransactionData";

export default function Home({
  latestTransactions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const latestBlocks = LatestDataApi.useLatestBlocks();
  // const data = LatestDataApi.useLatestTransactions();

  return (
    <>
      <HomeTitle />
      <div className="px-1 md:px-0">
        <SearchBar containerClass="lg:px-[196px] my-10" />
        <TokenStatsDisplay />
        <GroupStatisticCard />
        <LatestDataTable
          type="transactions"
          title="Latest transactions"
          data={latestTransactions}
          listPageUrl="/txs"
          detailsPageBaseUrl="/tx"
          containerClass="pt-8 md:pt-20"
        />
        <LatestDataTable
          type="blocks"
          title="Latest blocks"
          data={latestBlocks}
          amountLabel="Reward"
          detailsPageBaseUrl="/block"
          listPageUrl="/blocks"
          containerClass="pt-5 md:pt-6 lg:pt-5"
        />
      </div>
    </>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<LatestTransactionsProps>
> {
  const res = await fetch(MAIN_LATEST_TRANSACTION_URL);
  const responseData = await res.json();
  const maxRow = Math.min(responseData.length, 5);

  const latestTransactions = responseData.slice(0, maxRow).map((data) => {
    // TODO temporary workaround to display txn type icons
    const type: string | undefined =
      data.tx_types !== undefined && data.tx_types.length > 0
        ? data.tx_types[0]
        : undefined;
    const transactionType = type?.includes("contract")
      ? TransactionType.ContractCall
      : TransactionType.Transaction;
    const time = dayjs().unix() - dayjs(data.timestamp).unix();
    return {
      transactionId: data.hash,
      tokenAmount: data.value,
      txnOrBlockInfo: {
        from: data.from.hash,
        to: data.to?.hash || null,
        transactionType,
      },
      time,
    };
  });

  return {
    props: {
      latestTransactions,
    },
  };
}

interface LatestTransactionsProps {
  latestTransactions: RowData[];
}
