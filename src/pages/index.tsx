import TokenStatsDisplay from "@components/TokenStatsDisplay";
import { HomeTitle } from "@components/HomeTitle";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import Container from "@components/commons/Container";
import GroupStatisticCard from "@components/GroupStatisticCard";

export default function Home() {
  return (
    <>
      <HomeTitle />
      <SearchBar containerClass="px-5 md:px-10 lg:px-[316px] my-10" />
      <Container className="px-5 md:px-10">
        <TokenStatsDisplay />
        <GroupStatisticCard />
      </Container>
    </>
  );
}
