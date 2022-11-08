import TokenStatsDisplay from "@components/TokenStatsDisplay";
import { HomeTitle } from "@components/HomeTitle";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import GroupStatisticCard from "@components/GroupStatisticCard";

export default function Home() {
  return (
    <>
      <HomeTitle />
      <SearchBar containerClass="px-5 md:px-10 lg:px-[316px] my-10" />
      <TokenStatsDisplay />
      <GroupStatisticCard />
      <div className="w-full h-screen absolute z-[-1] mix-blend-screen top-0 left-0 bg-no-repeat lg:bg-cover bg-contain lg:bg-[url('/background/gradient-purple.png')] md:bg-[url('/background/gradient-purple-tablet.png')] bg-[url('/background/gradient-purple-mobile.png')]" />
      <div className="w-full h-screen absolute top-[210px] sm:top-[836px] md:top-[476px] xl:top-[210px] 2xl:top-[210px] lg:top-[210px] z-[-1] mix-blend-screen bg-no-repeat bg-contain bg-right sm:bg-[url('/background/gradient-blue-mobile.png')] bg-[url('/background/gradient-blue-mobile.png')]" />
    </>
  );
}
