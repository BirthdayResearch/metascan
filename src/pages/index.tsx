import TokenStatsDisplay from "@components/TokenStatsDisplay";
import GroupChainStatsCard from "@components/GroupChainStatsCard";
import { HomeTitle } from "@components/HomeTitle";
import { SearchBar } from "layouts/components/searchbar/SearchBar";

export default function Home() {
  return (
    <>
      <HomeTitle />
      <SearchBar containerClass="px-1 md:px-0 lg:px-[196px] my-10" />
      <TokenStatsDisplay />
      <GroupChainStatsCard />
    </>
  );
}
