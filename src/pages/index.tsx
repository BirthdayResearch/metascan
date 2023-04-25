import TokenStatsDisplay from "@components/TokenStatsDisplay";
import { HomeTitle } from "@components/HomeTitle";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import { GetServerSidePropsResult, InferGetServerSidePropsType } from "next";
import GroupStatisticCard from "@components/GroupStatisticCard";
import LatestDataTable, { RowData } from "@components/LatestDataTable";
import LatestDataApi from "@api/LatestDataApi";

export default function Home({
  latestTransactions,
  latestBlocks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

interface LatestDataProps {
  latestTransactions: RowData[];
  latestBlocks: RowData[];
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<LatestDataProps>
> {
  try {
    const latestTransactions = await LatestDataApi.getLatestTransactions();
    const latestBlocks = await LatestDataApi.getLatestBlocks();
    return {
      props: {
        latestTransactions,
        latestBlocks,
      },
    };
  } catch (e) {
    return {
      props: {
        latestTransactions: [],
        latestBlocks: [],
      },
    };
  }
}
