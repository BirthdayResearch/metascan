import { RowData } from "@components/LatestDataTable";
import { getTimeAgo } from "shared/durationHelper";
import { getRewards } from "shared/getRewards";
import { NetworkConnection } from "@contexts/Environment";
import { utils } from "ethers";
import { BURN_ADDRESS_HASH } from "shared/constants";
import { getTransactionType } from "shared/transactionDataHelper";
import {
  getBaseUrl,
  MAIN_LATEST_BLOCK_URL,
  MAIN_LATEST_TRANSACTION_URL,
  wrapResponse,
} from "./index";
import { BlockProps, RawTransactionI } from "./types";

const MAX_ROW = 5;

export default {
  getLatestBlocks: async (network: NetworkConnection): Promise<RowData[]> => {
    const baseUrl = getBaseUrl(network);
    const resBlock = await fetch(`${baseUrl}/${MAIN_LATEST_BLOCK_URL}`);
    const responseBlockData = await wrapResponse<BlockProps[]>(resBlock);
    const blockRows = Math.min(responseBlockData.length, MAX_ROW);

    return responseBlockData.slice(0, blockRows).map((data) => {
      const reward = getRewards(data.rewards);
      const time = getTimeAgo(data.timestamp);

      return {
        transactionId: data.height.toString(),
        tokenAmount: reward.toFixed(),
        txnOrBlockInfo: {
          transactionsPerBlock: data.tx_count?.toString(),
          blockTimeInSec: null,
        },
        time,
      };
    });
  },
  getLatestTransactions: async (
    network: NetworkConnection
  ): Promise<RowData[]> => {
    const baseUrl = getBaseUrl(network);
    const resTxn = await fetch(`${baseUrl}/${MAIN_LATEST_TRANSACTION_URL}`);
    const responseTxnData = await wrapResponse<RawTransactionI[]>(resTxn);
    const txnRows = Math.min(responseTxnData.length, MAX_ROW);

    return responseTxnData.slice(0, txnRows).map((data) => {
      const fromHash = data.from.hash ?? BURN_ADDRESS_HASH;
      const toHash = data.to?.hash ?? BURN_ADDRESS_HASH;

      // TODO temporary workaround to display txn type icons
      const transactionType = getTransactionType({
        txTypes: data.tx_types,
        fromHash,
        toHash,
      });
      const time = getTimeAgo(data.timestamp);

      return {
        transactionId: data.hash,
        tokenAmount: utils.formatEther(data.value),
        txnOrBlockInfo: {
          from: data.from.hash ?? BURN_ADDRESS_HASH,
          to: data.to?.hash ?? BURN_ADDRESS_HASH,
          transactionType,
        },
        time,
      };
    });
  },
};
