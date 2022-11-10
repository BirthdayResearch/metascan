import TokenStatsDisplay from "@components/TokenStatsDisplay";
import { HomeTitle } from "@components/HomeTitle";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import GroupStatisticCard from "@components/GroupStatisticCard";
import TransactionTable from "@components/commons/TransactionTable";

const latestTransactions = [
  {
    id: "1",
    transactionHash:
      "698bfdd7a59e4b5cd01793b5a5d84fd40f918aee7e44babe3e00591b7462dd4c",
    from: "1MtKcRsyJrgUuek1oERFmzgbeZDNhuJcyH",
    to: "14LLip4BdVEpQbCACYU2Z258Ag9wXMjuHR",
    amount: "40534.50833603",
    datetime: "4s ago",
  },
  {
    id: "2",
    transactionHash:
      "bc33c99e62d66723920ead7163877b3fb36a82c17f8a3ce0ce8102c8be6a7f8f",
    from: "1B75Sidfan9KfvW7YNw7FyyztzCXH1TCNw",
    to: "18iBw84Au7tySsSL5myZP4Eoj1gKhXryxP",
    amount: "59730.4548642",
    datetime: "35s ago",
  },
  {
    id: "3",
    transactionHash:
      "abfc697a26ee7d2a5a4ef96de8286b7d93d91eb7c8157e0c6e5532d5b42827fa",
    from: "1HXgJYbT3k2JZypbPw7unmhTV7YGLEskLU",
    to: "18XdYkTJFnAZXjam14rMpiBWw9h5Qz1jx9",
    amount: "193396.91258727",
    datetime: "50s ago",
  },
  {
    id: "4",
    transactionHash:
      "bc33c99e62d66723920ead7163877b3fb36a82c17f8a3ce0ce8102c8be6a7f8f",
    from: "1P63Sq1QigEyFZ3ck8juKZtX1t99R6ubTs",
    to: "1Q4Y9KpV8V3ieXBuJgVw2wuR7GVpRddxmQ",
    amount: "53111.48728868",
    datetime: "1m ago",
  },
  {
    id: "5",
    transactionHash:
      "eb04ba75f26df54de20b5957cc06a769cf6a84d2ef1a28f9dc4d14a0b8febdb2",
    from: "1GyQ7wso8xPXejSwQKMdB2aek7mjSyXCwE",
    to: "15pNaHJXgmfxnrHqEoZutJ7oGxKWe8v815",
    amount: "13786.81228866",
    datetime: "10m ago",
  },
];

const blockTimeInSec = "22";
const latestBlocks = [
  {
    id: "1",
    blockHeight: "15939349",
    transactionsPerBlock: "40534",
    rewardAmount: "12.21210023",
    datetime: "8s ago",
  },
  {
    id: "2",
    blockHeight: "15939348",
    transactionsPerBlock: "4548642",
    rewardAmount: "12.21210023",
    datetime: "41s ago",
  },
  {
    id: "3",
    blockHeight: "15939347",
    transactionsPerBlock: "193396",
    rewardAmount: "12.21210023",
    datetime: "54s ago",
  },
  {
    id: "4",
    blockHeight: "15939346",
    transactionsPerBlock: "53111",
    rewardAmount: "12.21210023",
    datetime: "3m ago",
  },
  {
    id: "5",
    blockHeight: "15939345",
    transactionsPerBlock: "13786",
    rewardAmount: "12.21210023",
    datetime: "12m ago",
  },
];
const mappedBlocks = latestBlocks.map((b) => ({
  id: b.id,
  transactionId: b.blockHeight,
  tokenAmount: b.rewardAmount,
  txnOrBlockInfo: {
    transactionsPerBlock: b.transactionsPerBlock,
    blockTimeInSec,
  },
  datetime: b.datetime,
}));

const mappedransactions = latestTransactions.map((t) => ({
  id: t.id,
  transactionId: t.transactionHash,
  tokenAmount: t.amount,
  txnOrBlockInfo: { from: t.from, to: t.to },
  datetime: t.datetime,
}));

export default function Home() {
  return (
    <>
      <HomeTitle />
      <div className="px-1 md:px-0">
        <SearchBar containerClass="lg:px-[196px] my-10" />
        <TokenStatsDisplay />
        <GroupStatisticCard />
        <TransactionTable
          type="blocks"
          title="Latest blocks"
          data={mappedBlocks}
          amountPrefix="Reward:"
        />
        <TransactionTable
          type="transactions"
          title="Latest transactions"
          data={mappedransactions}
        />
      </div>
    </>
  );
}
