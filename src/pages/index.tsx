import { NetworkProvider } from "@contexts/NetworkContext";
import { Header } from "layouts/components/Header";
import TokenStatsDisplay from "@components/TokenStatsDisplay";
import GroupChainStatsCard from "@components/GroupChainStatsCard";
import Button from "@components/commons/Button";

export default function Home() {
  return (
    <NetworkProvider>
      <Header />
      <TokenStatsDisplay />
      <GroupChainStatsCard />
      <Button
        label="Button 1"
        href="/yow"
        // onClick={() => console.log("Haluu")}
      />
    </NetworkProvider>
  );
}
