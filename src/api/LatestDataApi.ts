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
      datetime: b.datetime,
    })),
  useLatestTransactions: () =>
    mockData.latestTransactions.map((t) => ({
      id: t.id,
      transactionId: t.transactionHash,
      tokenAmount: t.amount,
      txnOrBlockInfo: { from: t.from, to: t.to },
      datetime: t.datetime,
    })),
};
