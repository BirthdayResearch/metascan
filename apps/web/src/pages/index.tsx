// import GroupStatisticCard from "@components/GroupStatisticCard";
// import TokenStatsDisplay from "@components/TokenStatsDisplay";
import HomeTitle from "@components/HomeTitle";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import { GetServerSidePropsResult, InferGetServerSidePropsType } from "next";
import { RowData } from "@components/types";
import LatestDataTable from "@components/LatestDataTable";
import LatestDataApi from "@api/LatestDataApi";

export default function Home({
  latestTransactions,
  latestBlocks,
  isLoading,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <HomeTitle />
      <div className="px-1 md:px-0">
        <SearchBar containerClass="2.5xl:px-[196px] mb-0" />
        {/* <TokenStatsDisplay /> */}
        {/* <GroupStatisticCard /> */}
        {/* TODO: Add blocks and txs summary card */}
        <LatestDataTable
          type="transactions"
          title="Latest transactions"
          data={latestTransactions}
          listPageUrl="/txs"
          detailsPageBaseUrl="/tx"
          containerClass="pt-8 md:pt-16"
          isLoading={isLoading}
        />
        <LatestDataTable
          type="blocks"
          title="Latest blocks"
          data={latestBlocks}
          detailsPageBaseUrl="/block"
          listPageUrl="/blocks"
          containerClass="pt-5 md:pt-6 lg:pt-5"
          isLoading={isLoading}
        />
      </div>
    </>
  );
}

interface LatestDataProps {
  latestTransactions: RowData[];
  latestBlocks: RowData[];
  isLoading?: boolean;
}

export async function getServerSideProps(
  context,
): Promise<GetServerSidePropsResult<LatestDataProps>> {
  try {
    const { network } = context.query;
    const latestTransactions =
      await LatestDataApi.getLatestTransactions(network);
    const latestBlocks = await LatestDataApi.getLatestBlocks(network);
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
