import mockData from "../mockdata/LatestData";

export default {
  useLatestBlocks: () =>
    mockData.latestBlocks.map((b) => ({
      id: b.id,
      transactionId: b.blockHeight,
      tokenAmount: b.rewardAmount, // TODO: Format amount to have commas accordingly
      txnOrBlockInfo: {
        transactionsPerBlock: b.transactionsPerBlock,
        blockTimeInSec: mockData.blockTimeInSec,
      },
      datetime: b.datetime, // TODO: Format time into 's ago, m ago, etc..' once real data is ready
    })),
  useLatestTransactions: () =>
    mockData.latestTransactions.map((t) => ({
      id: t.id,
      transactionId: t.transactionHash,
      tokenAmount: t.amount, // TODO: Format amount to have commas accordingly
      txnOrBlockInfo: { from: t.from, to: t.to },
      datetime: t.datetime, // TODO: Format time into 's ago, m ago, etc..' once real data is ready
    })),
};
