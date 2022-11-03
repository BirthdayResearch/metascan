import { NetworkProvider } from "@contexts/NetworkContext";
import GroupChainStatsCard from "layouts/components/GroupChainStatsCard";
import { Header } from "layouts/components/Header";

export default function Home() {
  return (
    <NetworkProvider>
      <Header />
      <GroupChainStatsCard />
    </NetworkProvider>
  );
}
