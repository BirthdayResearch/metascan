import { NetworkProvider } from "@contexts/NetworkContext";
import { Header } from "layouts/components/Header";
import TokenStatsDisplay from "@components/TokenStatsDisplay";
import GroupChainStatsCard from "@components/GroupChainStatsCard";
import Container from "@components/commons/Container";

export default function Home() {
  return (
    <NetworkProvider>
      <Header />
      <Container className="px-5 sm:px-10">
        <TokenStatsDisplay />
        <GroupChainStatsCard />
      </Container>
    </NetworkProvider>
  );
}
