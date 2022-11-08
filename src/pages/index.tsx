import { NetworkProvider } from "@contexts/NetworkContext";
import { Header } from "layouts/components/Header";
import TokenStatsDisplay from "@components/TokenStatsDisplay";
import GroupChainStatsCard from "@components/GroupChainStatsCard";
import Footer from "@components/Footer";

export default function Home() {
  return (
    <NetworkProvider>
      <Header />
      <TokenStatsDisplay />
      <GroupChainStatsCard />
      <div className="w-full h-full relative pt-6 lg:pt-[400px] md:pt-[176px] sm:pt-[138px]">
        <div className="w-full h-full absolute z-[-1] mix-blend-screen bottom-0 left-0 bg-no-repeat bg-cover bg-bottom 2xl:bg-[url('/background/footer.png')]  sm:bg-[url('/background/footer-tablet.png')] bg-[url('/background/footer-mobile.png')]" />
        <Footer />
      </div>
      <div className="w-full h-screen absolute z-[-1] mix-blend-screen top-0 left-0 bg-no-repeat lg:bg-cover bg-contain lg:bg-[url('/background/gradient-purple.png')] md:bg-[url('/background/gradient-purple-tablet.png')] bg-[url('/background/gradient-purple-mobile.png')]" />
      <div className="w-full h-screen absolute top-[20vh] sm:top-[10vh] z-[-1] mix-blend-screen bg-no-repeat bg-contain bg-right sm:bg-[url('/background/gradient-blue-mobile.png')] bg-[url('/background/gradient-blue-mobile.png')]" />
    </NetworkProvider>
  );
}
