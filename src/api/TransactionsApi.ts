import { TRANSACTIONS_URL } from "./index";
import { RawTransactionI } from "./types";

export default {
  getTransactions: async (
    pageParams: NextPageParams | null
  ): Promise<{
    items: RawTransactionI[];
    next_page_params: NextPageParams;
  }> => {
    const response = await fetch(
      pageParams
        ? `${TRANSACTIONS_URL}?block_number=${pageParams.block_number}&index=${pageParams.index}&items_count=${pageParams.items_count}`
        : TRANSACTIONS_URL
    );
    const txs = await response.json();
    return txs;
  },
  getTransaction: async (txnHash: string): Promise<RawTransactionI> => {
    const response = await fetch(`${TRANSACTIONS_URL}/${txnHash}`);
    const tx = await response.json();
    return tx;
  },
};

interface NextPageParams {
  block_number: string;
  items_count: number;
  index: number;
}
