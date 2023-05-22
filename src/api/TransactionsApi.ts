import { NetworkConnection } from "@contexts/Environment";
import { TRANSACTIONS_URL, getBaseUrl } from "./index";
import { RawTransactionI } from "./types";

export default {
  getTransactions: async (
    network: NetworkConnection,
    pageParams: NextPageParams | null
  ): Promise<{
    items: RawTransactionI[];
    next_page_params: NextPageParams;
  }> => {
    const baseUrl = getBaseUrl(network);
    const response = await fetch(
      pageParams
        ? `${baseUrl}/${TRANSACTIONS_URL}?block_number=${pageParams.block_number}&index=${pageParams.index}&items_count=${pageParams.items_count}`
        : `${baseUrl}/${TRANSACTIONS_URL}`
    );
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

interface NextPageParams {
  block_number: string;
  items_count: number;
  index: number;
}
