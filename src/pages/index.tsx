import { NetworkProvider } from "@contexts/NetworkContext";
import { Header } from "layouts/components/Header";
import TokenStatsDisplay from "@components/TokenStatsDisplay";
import GroupChainStatsCard from "layouts/components/GroupChainStatsCard";

export default function Home() {
  return (
    <NetworkProvider>
      <Header />
      <TokenStatsDisplay />
      <GroupChainStatsCard />
    </NetworkProvider>
  );
}
