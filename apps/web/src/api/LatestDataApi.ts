import { formatEther } from "viem";
import { getTimeAgo } from "shared/durationHelper";
import { getRewards } from "shared/getRewards";
import { NetworkConnection } from "@contexts/Environment";
import { BURN_ADDRESS_HASH } from "shared/constants";
import {
  getTokenTransfers,
  getTransactionType,
} from "shared/transactionDataHelper";
import { RowData } from "@components/types";
import {
  getRpcUrl,
  MAIN_LATEST_BLOCK_URL,
  MAIN_LATEST_TRANSACTION_URL,
  wrapResponse,
} from "./index";
import { BlockProps, RawTransactionI } from "./types";

const MAX_ROW = 5;

export default {
  getLatestBlocks: async (network: NetworkConnection): Promise<RowData[]> => {
    const rpcUrl = getRpcUrl(network);
    const resBlock = await fetch(`${rpcUrl}/${MAIN_LATEST_BLOCK_URL}`);
    const responseBlockData = await wrapResponse<BlockProps[]>(resBlock);
    const blockRows = Math.min(responseBlockData.length, MAX_ROW);

    return responseBlockData.slice(0, blockRows).map((data) => {
      const reward = getRewards(data.rewards);
      const time = getTimeAgo(data.timestamp);

      return {
        transactionId: data.height.toString(),
        tokenAmount: reward,
        txnOrBlockInfo: {
          transactionsPerBlock: data.tx_count?.toString(),
          blockTimeInSec: null,
        },
        time,
      };
    });
  },
  getLatestTransactions: async (
    network: NetworkConnection,
  ): Promise<RowData[]> => {
    const rpcUrl = getRpcUrl(network);
    const resTxn = await fetch(`${rpcUrl}/${MAIN_LATEST_TRANSACTION_URL}`);
    const responseTxnData = await wrapResponse<RawTransactionI[]>(resTxn);
    const txnRows = Math.min(responseTxnData.length, MAX_ROW);

    return responseTxnData.slice(0, txnRows).map((data) => {
      const isFromContract = data.from.is_contract;
      const isToContract = data.to?.is_contract ?? false;
      const tokenTransfers =
        data.token_transfers?.length > 0
          ? getTokenTransfers(data.token_transfers)
          : [];

      const transactionType = getTransactionType({
        tokenTransfers,
        isFromContract,
        isToContract,
        txTypes: data.tx_types,
      });
      const time = getTimeAgo(data.timestamp);

      return {
        transactionId: data.hash,
        tokenAmount: formatEther(BigInt(data.value ?? "0")),
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
