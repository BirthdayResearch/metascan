import dayjs from "dayjs";
import { RowData } from "@components/LatestDataTable";
import { MAIN_LATEST_BLOCK_URL, MAIN_LATEST_TRANSACTION_URL } from "./index";
import { TransactionType } from "./types";

const MAX_ROW = 5;

export default {
  getLatestBlocks: async (): Promise<RowData[]> => {
    const resBlock = await fetch(MAIN_LATEST_BLOCK_URL);
    const responseBlockData = await resBlock.json();
    const blockRows = Math.min(responseBlockData.length, MAX_ROW);

    return responseBlockData.slice(0, blockRows).map((data) => {
      const reward =
        data.rewards !== undefined && data.rewards.length > 0
          ? data.rewards[0].reward
          : 0;
      const time = dayjs().unix() - dayjs(data.timestamp).unix();
      return {
        transactionId: data.height,
        tokenAmount: reward,
        txnOrBlockInfo: {
          transactionsPerBlock: data.tx_count || null,
          blockTimeInSec: null,
        },
        time,
      };
    });
  },
  getLatestTransactions: async (): Promise<RowData[]> => {
    const resTxn = await fetch(MAIN_LATEST_TRANSACTION_URL);
    const responseTxnData = await resTxn.json();
    const txnRows = Math.min(responseTxnData.length, MAX_ROW);

    return responseTxnData.slice(0, txnRows).map((data) => {
      // TODO temporary workaround to display txn type icons
      const type = data.tx_types?.length > 0 ? data.tx_types[0] : null;
      let transactionType = TransactionType.Transaction;
      if (type?.includes("contract")) {
        transactionType = TransactionType.ContractCall;
      } else if (type?.includes("token")) {
        transactionType = TransactionType.Tokenized;
      }

      const time = dayjs().unix() - dayjs(data.timestamp).unix();
      return {
        transactionId: data.hash,
        tokenAmount: data.value,
        txnOrBlockInfo: {
          from: data.from.hash,
          to: data.to?.hash || null,
          transactionType,
        },
        time,
      };
    });
  },
};
