import TokenStatsDisplay from "@components/TokenStatsDisplay";
import GroupChainStatsCard from "@components/GroupChainStatsCard";
import { DMCSectionHeader } from "layouts/components/DMCSectionHeader";
import { SearchBar } from "layouts/components/searchbar/SearchBar";

export default function Home() {
  return (
    <>
      <DMCSectionHeader />
      <SearchBar containerClass="px-5 md:px-10 lg:px-[316px] my-10" />
      <TokenStatsDisplay />
      <GroupChainStatsCard />
    </>
  );
}
