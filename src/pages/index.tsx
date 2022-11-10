import TokenStatsDisplay from "@components/TokenStatsDisplay";
import { HomeTitle } from "@components/HomeTitle";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import GroupStatisticCard from "@components/GroupStatisticCard";
import TransactionTable from "@components/commons/TransactionTable";
import LatestDataApi from "@api/LatestDataApi";

export default function Home() {
  const latestBlocks = LatestDataApi.useLatestBlocks();
  const latestTransactions = LatestDataApi.useLatestTransactions();

  return (
    <>
      <HomeTitle />
      <div className="px-1 md:px-0">
        <SearchBar containerClass="lg:px-[196px] my-10" />
        <TokenStatsDisplay />
        <GroupStatisticCard />
        <TransactionTable
          type="blocks"
          title="Latest blocks"
          data={latestBlocks}
          amountPrefix="Reward:"
        />
        <TransactionTable
          type="transactions"
          title="Latest transactions"
          data={latestTransactions}
        />
      </div>
    </>
  );
}
