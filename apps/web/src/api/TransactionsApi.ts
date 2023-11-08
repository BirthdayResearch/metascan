import { NetworkConnection } from "@contexts/Environment";
import {
  TRANSACTIONS_URL,
  V1_TRANSACTION_URL,
  filterParams,
  getRpcUrl,
  wrapResponse,
} from "./index";
import {
  RawTransactionI,
  RawTransactionV1,
  RawTxnWithPaginationProps,
  TxnNextPageParamsProps,
} from "./types";

export default {
  getTransactions: async (
    network: NetworkConnection,
    blockNumber?: string,
    itemsCount?: string,
    index?: string,
  ): Promise<RawTxnWithPaginationProps> => {
    const rpcUrl = getRpcUrl(network);
    const params = filterParams([
      { key: "block_number", value: blockNumber },
      { key: "items_count", value: itemsCount },
      { key: "index", value: index },
    ]);
    const res = await fetch(`${rpcUrl}/${TRANSACTIONS_URL}${params}`);

    return wrapResponse<RawTxnWithPaginationProps>(res);
  },
  getTransaction: async (
    network: NetworkConnection,
    txnHash: string,
  ): Promise<RawTransactionI> => {
    const rpcUrl = getRpcUrl(network);
    const res = await fetch(`${rpcUrl}/${TRANSACTIONS_URL}/${txnHash}`);
    const transaction = await wrapResponse<RawTransactionI>(res);

    // Missing confirmation workaround
    if (transaction.confirmations === 0) {
      const resV1 = await fetch(`${rpcUrl}/${V1_TRANSACTION_URL}${txnHash}`);
      const tx = (await resV1.json()) as RawTransactionV1;
      transaction.confirmations = tx.result?.confirmations ?? 0;
    }

    return transaction;
  },
};

export interface TxnQueryParamsProps extends TxnNextPageParamsProps {
  page_number?: string;
}
