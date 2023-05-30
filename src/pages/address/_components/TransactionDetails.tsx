import {
  TxnNextPageParamsProps,
  TxnQueryParamsProps,
} from "@api/TransactionsApi";
import Pagination from "@components/commons/Pagination";
import TransactionRow from "@components/commons/TransactionRow";
import { AddressTransactionsProps } from "./WalletDetails";

interface TransactionDetailsProps {
  aid: string;
  addressTransactions: AddressTransactionsProps;
}

function TxnPagination({
  aid,
  nextPageParams,
}: {
  aid: string;
  nextPageParams: TxnNextPageParamsProps;
}) {
  return (
    <Pagination<TxnQueryParamsProps>
      pathname={`/address/${aid}`}
      nextPageParams={
        nextPageParams
          ? {
              block_number: nextPageParams.block_number,
              items_count: nextPageParams.items_count,
              index: nextPageParams.index,
            }
          : undefined
      }
    />
  );
}

export default function TransactionDetails({
  aid,
  addressTransactions: { transactions, nextPageParams },
}: TransactionDetailsProps) {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
        <h2
          data-testid="address-txn-list-title"
          className="font-bold text-xl text-white-50"
        >
          Transactions
        </h2>
      </div>
      <TxnPagination aid={aid} nextPageParams={nextPageParams} />
      {transactions.map((item) => (
        <TransactionRow key={item.hash} rawData={item} />
      ))}
      <TxnPagination aid={aid} nextPageParams={nextPageParams} />
    </div>
  );
}
