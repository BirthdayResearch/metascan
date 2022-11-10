import TokenStatsDisplay from "@components/TokenStatsDisplay";
import { HomeTitle } from "@components/HomeTitle";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import GroupStatisticCard from "@components/GroupStatisticCard";
import TransactionTable from "@components/commons/TransactionTable";

const latestTransactions = [
  {
    id: 10001,
    transactionId:
      "698bfdd7a59e4b5cd01793b5a5d84fd40f918aee7e44babe3e00591b7462dd4c",
    from: "1MtKcRsyJrgUuek1oERFmzgbeZDNhuJcyH",
    to: "14LLip4BdVEpQbCACYU2Z258Ag9wXMjuHR",
    amount: 40534.50833603,
    datetime: "4s ago",
  },
  {
    id: 10002,
    transactionId:
      "bc33c99e62d66723920ead7163877b3fb36a82c17f8a3ce0ce8102c8be6a7f8f",
    from: "1B75Sidfan9KfvW7YNw7FyyztzCXH1TCNw",
    to: "18iBw84Au7tySsSL5myZP4Eoj1gKhXryxP",
    amount: 59730.4548642,
    datetime: "35s ago",
  },
  {
    id: 10003,
    transactionId:
      "abfc697a26ee7d2a5a4ef96de8286b7d93d91eb7c8157e0c6e5532d5b42827fa",
    from: "1HXgJYbT3k2JZypbPw7unmhTV7YGLEskLU",
    to: "18XdYkTJFnAZXjam14rMpiBWw9h5Qz1jx9",
    amount: 193396.91258727,
    datetime: "50s ago",
  },
  {
    id: 10004,
    transactionId:
      "bc33c99e62d66723920ead7163877b3fb36a82c17f8a3ce0ce8102c8be6a7f8f",
    from: "1P63Sq1QigEyFZ3ck8juKZtX1t99R6ubTs",
    to: "1Q4Y9KpV8V3ieXBuJgVw2wuR7GVpRddxmQ",
    amount: 53111.48728868,
    datetime: "1m ago",
  },
  {
    id: 10005,
    transactionId:
      "eb04ba75f26df54de20b5957cc06a769cf6a84d2ef1a28f9dc4d14a0b8febdb2",
    from: "1GyQ7wso8xPXejSwQKMdB2aek7mjSyXCwE",
    to: "15pNaHJXgmfxnrHqEoZutJ7oGxKWe8v815",
    amount: 13786.81228866,
    datetime: "10m ago",
  },
];

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
          href="/blocks"
          data={latestTransactions}
        />
        <TransactionTable
          type="transactions"
          title="Latest transactions"
          href="/transactions"
          data={latestTransactions}
        />
      </div>
    </>
  );
}
