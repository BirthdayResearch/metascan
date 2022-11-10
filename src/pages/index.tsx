import TokenStatsDisplay from "@components/TokenStatsDisplay";
import { HomeTitle } from "@components/HomeTitle";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import Container from "@components/commons/Container";
import GroupStatisticCard from "@components/GroupStatisticCard";

export default function Home() {
  return (
    <>
      <HomeTitle />
      <SearchBar containerClass="px-1 md:px-0 lg:px-[196px] my-10" />
      <Container className="px-1 md:px-0">
        <TokenStatsDisplay />
        <GroupStatisticCard />
      </Container>
    </>
  );
}
