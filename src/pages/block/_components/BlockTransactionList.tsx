import {
  CursorPage,
  CursorPagination,
} from "@components/commons/CursorPagination";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import { TransactionI } from "mockdata/TransactionData";
import TransactionRow from "pages/transactions/_components/TransactionRow";

interface Props {
  blockNumber: string;
  blockTransactions: TransactionI[];
  pages: CursorPage[];
}

export default function BlockTransactionList({
  blockNumber,
  blockTransactions,
  pages,
}: Props): JSX.Element {
  return (
    <GradientCardContainer>
      <div className="p-5 md:p-10">
        <div className="flex flex-col md:flex-row mb-6 justify-between md:items-center">
          <h2
            data-testid="block-txn-list-title"
            className="font-bold text-xl text-white-50"
          >
            Transactions
          </h2>
          <CursorPagination
            pages={pages}
            path={`/block/${blockNumber}`}
            className="justify-end mt-5 md:mt-0"
          />
        </div>
        {blockTransactions.map((item) => (
          <TransactionRow key={item.hash} data={item} />
        ))}
        <CursorPagination
          pages={pages}
          path={`/block/${blockNumber}`}
          className="flex w-full md:justify-end mt-12 md:mt-10"
        />
      </div>
    </GradientCardContainer>
  );
}
