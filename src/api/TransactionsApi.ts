import { NetworkConnection } from "@contexts/Environment";
import { TRANSACTIONS_URL, filterParams, getBaseUrl } from "./index";
import { RawTransactionI } from "./types";

export default {
  getTransactions: async (
    network: NetworkConnection,
    blockNumber?: string,
    itemsCount?: string
  ): Promise<{
    items: RawTransactionI[];
    next_page_params?: {
      blockNumber?: string;
      itemsCount?: string;
    };
  }> => {
    const baseUrl = getBaseUrl(network);
    const params = filterParams([
      { key: "block_number", value: blockNumber },
      { key: "items_count", value: itemsCount },
    ]);

    const response = await fetch(`${baseUrl}/${TRANSACTIONS_URL}?${params}`);
    const txs = await response.json();

    return txs;
  },
  getTransaction: async (
    network: NetworkConnection,
    txnHash: string
  ): Promise<RawTransactionI> => {
    const baseUrl = getBaseUrl(network);
    const response = await fetch(`${baseUrl}/${TRANSACTIONS_URL}/${txnHash}`);
    const tx = await response.json();
    return tx;
  },
};

export interface TxnNextPageParamsProps {
  block_number: string;
  items_count: string;
}

export interface TxnQueryParamsProps extends TxnNextPageParamsProps {
  page_number?: string;
}
