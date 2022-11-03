import TokenStatsDisplay from "@components/TokenStatsDisplay";
import { NetworkProvider } from "@contexts/NetworkContext";
import { Header } from "layouts/components/Header";

export default function Home() {
  return (
    <NetworkProvider>
      <Header />
      <TokenStatsDisplay />
    </NetworkProvider>
  );
}
