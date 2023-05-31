import { NetworkConnection } from "@contexts/Environment";
import {
  TRANSACTIONS_URL,
  filterParams,
  getBaseUrl,
  wrapResponse,
} from "./index";
import { RawTransactionI } from "./types";

interface TransactionResponseProps {
  items: RawTransactionI[];
  next_page_params?: {
    block_number?: string;
    items_count?: string;
    index?: string;
  };
}
export default {
  getTransactions: async (
    network: NetworkConnection,
    blockNumber?: string,
    itemsCount?: string,
    index?: string
  ): Promise<TransactionResponseProps> => {
    const baseUrl = getBaseUrl(network);
    const params = filterParams([
      { key: "block_number", value: blockNumber },
      { key: "items_count", value: itemsCount },
      { key: "index", value: index },
    ]);
    const res = await fetch(`${baseUrl}/${TRANSACTIONS_URL}?${params}`);

    return wrapResponse<TransactionResponseProps>(res);
  },
  getTransaction: async (
    network: NetworkConnection,
    txnHash: string
  ): Promise<RawTransactionI> => {
    const baseUrl = getBaseUrl(network);
    const res = await fetch(`${baseUrl}/${TRANSACTIONS_URL}/${txnHash}`);

    return wrapResponse<RawTransactionI>(res);
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
