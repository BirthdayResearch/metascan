import { NetworkProvider } from "@contexts/NetworkContext";
import { DMCSectionHeader } from "layouts/components/DMCSectionHeader";
import { Header } from "layouts/components/Header";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import TokenStatsDisplay from "@components/TokenStatsDisplay";
import GroupChainStatsCard from "@components/GroupChainStatsCard";

export default function Home() {
  return (
    <NetworkProvider>
      <Header />
      <DMCSectionHeader />
      <SearchBar />
      <TokenStatsDisplay />
      <GroupChainStatsCard />
    </NetworkProvider>
  );
}
