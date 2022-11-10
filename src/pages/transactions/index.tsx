import Container from "@components/commons/Container";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import TransactionRow from "./_components/TransactionRow";

export default function Transactions({ data }) {
  return (
    <Container className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer>
        <div className="p-10">
          <div className="flex flex-row py-4 mb-10">
            <span className="font-bold text-2xl text-white-50">
              Transactions
            </span>
          </div>
          {data.map((item) => (
            <TransactionRow key={item.hash} data={item} />
          ))}
        </div>
      </GradientCardContainer>
    </Container>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const data = [
    {
      type: "Block",
      hash: "0xa4a8617cddbd0f9346e9427527601c3f3bffad852ds231f2fc2ef59599ff297",
      amount: "100.00000012345",
      from: "0xaab27b150451726ecsds38aa1d0a94505c8729bd1",
      to: "0xaab27b150451726sdsd738aa1d0a94505c8729bd1",
      status: "Confirmed",
      symbol: "DMTCx",
      time: 221,
    },
    {
      type: "Transaction",
      hash: "0xa4a8617cddbd0f9346e9427527601c3f3bffad85325e231f2fc2ef59599ff297",
      amount: "100.00000012345",
      from: "0xaab27b150451726ecsds38aa1d0a94505c8729bd1",
      to: "0xaab27b150451726sdsd738aa1d0a94505c8729bd1",
      status: "Reverted",
      symbol: "DMTCx",
      time: 1221,
    },
  ];

  // Pass data to the page via props
  return { props: { data } };
}
