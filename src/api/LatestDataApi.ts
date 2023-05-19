import { TransactionType } from "mockdata/TransactionData";
import { RowData } from "@components/LatestDataTable";
import { getTimeAgo } from "shared/durationHelper";
import { getRewards } from "shared/getRewards";
import {
  MAIN_BLOCKS_URL,
  MAIN_LATEST_BLOCK_URL,
  MAIN_LATEST_TRANSACTION_URL,
} from "./index";

const MAX_ROW = 5;

function getParams(params: { key: string; value }[]): string {
  let queryParams = "?";
  params.forEach((p) => {
    if (p.value !== undefined && p.value.trim() !== "") {
      // Pierre to add cleaner way to handle this params
      queryParams += `${p.key}=${p.value}&`;
    }
  });

  return queryParams;
}

export default {
  getLatestBlocks: async (): Promise<RowData[]> => {
    const resBlock = await fetch(MAIN_LATEST_BLOCK_URL);
    const responseBlockData = await resBlock.json();
    const blockRows = Math.min(responseBlockData.length, MAX_ROW);

    return responseBlockData.slice(0, blockRows).map((data) => {
      const reward = getRewards(data.rewards);
      const time = getTimeAgo(data.timestamp);
      return {
        transactionId: data.height,
        tokenAmount: reward.toFixed(),
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
      const type: string | undefined =
        data.tx_types !== undefined && data.tx_types.length > 0
          ? data.tx_types[0]
          : undefined;
      const transactionType = type?.includes("contract")
        ? TransactionType.ContractCall
        : TransactionType.Transaction;
      const time = getTimeAgo(data.timestamp);
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
  getBlocks: async (
    blockNumber?: string,
    itemsCount?: string
  ): Promise<any> => {
    const params = getParams([
      { key: "block_number", value: blockNumber },
      { key: "items_count", value: itemsCount },
      { key: "type", value: "block" },
    ]);

    const resTxn = await fetch(`${MAIN_BLOCKS_URL}${params}`);
    const responseBlockData = await resTxn.json();

    return responseBlockData;
  },
  getBlock: async (blockId: string): Promise<any> => {
    const resTxn = await fetch(`${MAIN_BLOCKS_URL}/${blockId}`);
    const responseBlockData = await resTxn.json();
    return responseBlockData;
  },
};
