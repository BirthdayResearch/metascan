import { NetworkConnection } from "@contexts/Environment";
import {
  TRANSACTIONS_URL,
  V1_TRANSACTION_URL,
  filterParams,
  getBaseUrl,
  wrapResponse,
} from "./index";
import {
  RawTransactionI,
  RawTransactionV1,
  RawTxnWithPaginationProps,
} from "./types";

export default {
  getTransactions: async (
    network: NetworkConnection,
    blockNumber?: string,
    itemsCount?: string,
    index?: string
  ): Promise<RawTxnWithPaginationProps> => {
    const baseUrl = getBaseUrl(network);
    const params = filterParams([
      { key: "block_number", value: blockNumber },
      { key: "items_count", value: itemsCount },
      { key: "index", value: index },
    ]);
    const res = await fetch(`${baseUrl}/${TRANSACTIONS_URL}${params}`);

    return wrapResponse<RawTxnWithPaginationProps>(res);
  },
  getTransaction: async (
    network: NetworkConnection,
    txnHash: string
  ): Promise<RawTransactionI> => {
    const baseUrl = getBaseUrl(network);
    const res = await fetch(`${baseUrl}/${TRANSACTIONS_URL}/${txnHash}`);
    const transaction = await wrapResponse<RawTransactionI>(res);

    // Missing confirmation workaround
    if (transaction.confirmations === 0) {
      const resV1 = await fetch(`${baseUrl}/${V1_TRANSACTION_URL}${txnHash}`);
      const tx = (await resV1.json()) as RawTransactionV1;
      transaction.confirmations = tx.result?.confirmations ?? 0;
    }

    return transaction;
  },
};
export interface TxnNextPageParamsProps {
  block_number: string;
  items_count: string;
  index: string;
}

export interface TxnQueryParamsProps extends TxnNextPageParamsProps {
  page_number?: string;
}
