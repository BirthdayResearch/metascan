import { CursorPagination } from "@components/commons/CursorPagination";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import TransactionsApi from "@api/TransactionsApi";
import { transformTransactionData } from "shared/transactionDataHelper";
import { GetServerSidePropsContext } from "next";
import { NetworkConnection } from "@contexts/Environment";
import { pages } from "../../mockdata/TransactionData";
import TransactionRow from "./_components/TransactionRow";

export default function Transactions({ data }) {
  return (
    <div className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer>
        <div className="p-5 md:p-10">
          <div className="flex flex-col md:flex-row py-6 md:py-4 mb-6 justify-between md:items-center">
            <span className="font-bold text-2xl text-white-50">
              Transactions
            </span>
            <CursorPagination
              pages={data.pages}
              path="/txs"
              className="justify-end mt-5 md:mt-0"
            />
          </div>
          {data.transactions.map((item) => {
            const tx = transformTransactionData(item);
            return <TransactionRow key={tx.hash} data={tx} />;
          })}
          <CursorPagination
            pages={data.pages}
            path="/txs"
            className="flex w-full md:justify-end mt-12 md:mt-10"
          />
        </div>
      </GradientCardContainer>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { network } = context.query;
  // Fetch data from external API
  const txs = await TransactionsApi.getTransactions(
    network as NetworkConnection,
    null
  ); // TODO: Pass `next_page_params` when needed, for pagination
  const data = {
    transactions: txs.items,
    pages,
  };

  // Pass data to the page via props
  return { props: { data } };
}
