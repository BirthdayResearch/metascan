import { RawTransactionI } from "@api/types";
import TransactionRow from "@components/commons/TransactionRow";

interface TransactionDetailsProps {
  addressTransactions: RawTransactionI[];
}

export function TransactionDetails({
  addressTransactions,
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

      {addressTransactions.map((item) => (
        <TransactionRow key={item.hash} rawData={item} />
      ))}
    </div>
  );
}
