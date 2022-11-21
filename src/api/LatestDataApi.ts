import { transactions } from "mockdata/TransactionData";
import mockData from "../mockdata/LatestData";

export default {
  useLatestBlocks: () =>
    mockData.latestBlocks.map((b) => ({
      id: b.id,
      transactionId: b.blockHeight,
      tokenAmount: b.rewardAmount,
      txnOrBlockInfo: {
        transactionsPerBlock: b.transactionsPerBlock,
        blockTimeInSec: mockData.blockTimeInSec,
      },
      time: b.time,
    })),
  useLatestTransactions: () =>
    transactions.slice(0, 5).map((t, i) => ({
      id: `${i + 1}`,
      transactionId: t.hash,
      tokenAmount: t.amount,
      txnOrBlockInfo: {
        from: t.from,
        to: t.to,
        transactionType: t.transactionType,
      },
      time: t.time,
    })),
};
