import TokenStatsDisplay from "@components/TokenStatsDisplay";
import { NetworkProvider } from "@contexts/NetworkContext";
import { DMCSectionHeader } from "layouts/components/DMCSectionHeader";
import { Header } from "layouts/components/Header";
import { SearchBar } from "layouts/components/searchbar/SearchBar";

export default function Home() {
  return (
    <NetworkProvider>
      <Header />
      <DMCSectionHeader />
      <SearchBar />
      <TokenStatsDisplay />
    </NetworkProvider>
  );
}
