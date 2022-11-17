import Container from "@components/commons/Container";
import { CursorPagination } from "@components/commons/CursorPagination";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import { transactions, pages } from "../../mockdata/TransactionData";
import TransactionRow from "./_components/TransactionRow";

export default function Transactions({ data }) {
  return (
    <Container className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer>
        <div className="p-5 md:p-10">
          <div className="flex flex-col md:flex-row py-6 md:py-4 mb-6 justify-between md:items-center">
            <span className="font-bold text-2xl text-white-50">
              Transactions
            </span>
            <CursorPagination
              pages={data.pages}
              path="/tx"
              className="justify-end mt-5 md:mt-0"
            />
          </div>
          {data.transactions.map((item) => (
            <TransactionRow key={item.hash} data={item} />
          ))}
          <CursorPagination
            pages={data.pages}
            path="/tx"
            className="flex w-full md:justify-end mt-12 md:mt-10"
          />
        </div>
      </GradientCardContainer>
    </Container>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const data = {
    transactions,
    pages,
  };

  // Pass data to the page via props
  return { props: { data } };
}
