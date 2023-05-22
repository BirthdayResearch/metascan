import {
  CursorPage,
  CursorPagination,
} from "@components/commons/CursorPagination";
import { MockTransactionI } from "mockdata/TransactionData";
import { useRouter } from "next/router";
import TransactionRow from "pages/txs/_components/TransactionRow";
import { ContractTabsTitle } from "../../../enum/contractTabsTitle";

interface ContractTransactionsListProps {
  contractTransactions: MockTransactionI[];
  contractTransactionPages: CursorPage[];
}

export default function ContractTransactionsList({
  contractTransactions,
  contractTransactionPages,
}: ContractTransactionsListProps) {
  const router = useRouter();
  const id = router.query.cid;

  return (
    <div className="lg:mt-[42.5px] md:mt-10 mt-14">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
        <h2
          data-testid="contract-address-txn-list-title"
          className="font-bold text-xl text-white-50"
        >
          {ContractTabsTitle.Transactions}
        </h2>
        <CursorPagination
          pages={contractTransactionPages}
          path={`/contract/${id}`}
          className="justify-end mt-5 md:mt-0"
        />
      </div>
      {contractTransactions.map((item) => (
        <TransactionRow key={item.hash} data={item as any} />
      ))}
      <CursorPagination
        pages={contractTransactionPages}
        path={`/contract/${id}`}
        className="flex w-full md:justify-end mt-12 md:mt-10"
      />
    </div>
  );
}
