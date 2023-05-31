import {
  TxnNextPageParamsProps,
  TxnQueryParamsProps,
} from "@api/TransactionsApi";
import { RawTransactionI } from "@api/types";

import GradientCardContainer from "@components/commons/GradientCardContainer";
import Pagination from "@components/commons/Pagination";
import TransactionRow from "@components/commons/TransactionRow";

interface PageProps {
  blockNumber: string;
  transactions: RawTransactionI[];
  nextPageParams?: TxnNextPageParamsProps;
}

function BlockPagination({
  blockNumber,
  nextPageParams,
}: {
  nextPageParams?: TxnNextPageParamsProps;
  blockNumber: string;
}) {
  return (
    <Pagination<TxnQueryParamsProps>
      nextPageParams={
        nextPageParams
          ? {
              block_number: nextPageParams.block_number,
              items_count: nextPageParams.items_count,
              index: nextPageParams.index,
            }
          : undefined
      }
      pathname={`/block/${blockNumber}`}
    />
  );
}

export default function BlockTransactionList({
  blockNumber,
  transactions,
  nextPageParams,
}: PageProps): JSX.Element {
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
          <BlockPagination
            nextPageParams={nextPageParams}
            blockNumber={blockNumber}
          />
        </div>
        {transactions.map((item) => (
          <TransactionRow key={item.hash} rawData={item} />
        ))}
        <BlockPagination
          nextPageParams={nextPageParams}
          blockNumber={blockNumber}
        />
      </div>
    </GradientCardContainer>
  );
}
