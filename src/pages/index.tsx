// import GroupStatisticCard from "@components/GroupStatisticCard";
// import TokenStatsDisplay from "@components/TokenStatsDisplay";
import { useEffect, useState } from "react";
import { utils } from "ethers";
import { useNetwork } from "@contexts/NetworkContext";
import {
  useGetLatestBlocksMutation,
  useGetLatestTransactionsMutation,
} from "@store/latestData";
import { getRewards } from "shared/getRewards";
import { getTimeAgo } from "shared/durationHelper";
import { BURN_ADDRESS_HASH } from "shared/constants";
import {
  getTokenTransfers,
  getTransactionType,
} from "shared/transactionDataHelper";
import HomeTitle from "@components/HomeTitle";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import LatestDataTable from "@components/LatestDataTable";
import { RowData } from "@components/types";

const MAX_ROW = 5;

export default function Home() {
  const [isLoadingBlocks, setIsLoadingBlocks] = useState(true);
  const [isLoadingTxs, setIsLoadingTxs] = useState(true);
  const [latestBlocks, setLatestBlocks] = useState<RowData[]>([]);
  const [latestTransactions, setLatestTransactions] = useState<RowData[]>([]);

  const { connection } = useNetwork();
  const [getLatestBlocks] = useGetLatestBlocksMutation();
  const [getTransactions] = useGetLatestTransactionsMutation();

  const fetchLatestBlocks = async () => {
    const results = await getLatestBlocks({ network: connection }).unwrap();
    const blockRows = Math.min(results.length, MAX_ROW);
    const slicedBlocks = results.slice(0, blockRows).map((data) => {
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
    setLatestBlocks(slicedBlocks);
    setIsLoadingBlocks(false);
  };

  const fetchLatestTxs = async () => {
    const txResults = await getTransactions({ network: connection }).unwrap();
    const txRows = Math.min(txResults.length, MAX_ROW);
    const slicedTxs = txResults.slice(0, txRows).map((data) => {
      const toHash = data.to?.hash ?? BURN_ADDRESS_HASH;
      const isFromContract = data.from.is_contract;
      const isToContract = data.to?.is_contract ?? false;
      const tokenTransfers =
        data.token_transfers?.length > 0
          ? getTokenTransfers(data.token_transfers)
          : [];
      const transactionType = getTransactionType({
        toHash,
        tokenTransfers,
        isFromContract,
        isToContract,
        txTypes: data.tx_types,
      });
      const time = getTimeAgo(data.timestamp);

      return {
        transactionId: data.hash,
        tokenAmount: utils.formatEther(data.value ?? "0"),
        txnOrBlockInfo: {
          from: data.from.hash ?? BURN_ADDRESS_HASH,
          to: data.to?.hash ?? BURN_ADDRESS_HASH,
          transactionType,
        },
        time,
      };
    });
    setLatestTransactions(slicedTxs);
    setIsLoadingTxs(false);
  };

  useEffect(() => {
    fetchLatestBlocks();
    fetchLatestTxs();
  }, []);

  return (
    <>
      <HomeTitle />
      <div className="px-1 md:px-0">
        <SearchBar containerClass="2.5xl:px-[196px] mb-0" />
        {/* <TokenStatsDisplay /> */}
        {/* <GroupStatisticCard /> */}
        {/* TODO: Add blocks and txs summary card */}
        <LatestDataTable
          type="transactions"
          title="Latest transactions"
          data={latestTransactions}
          listPageUrl="/txs"
          detailsPageBaseUrl="/tx"
          containerClass="pt-8 md:pt-16"
          isLoading={isLoadingTxs}
        />
        <LatestDataTable
          type="blocks"
          title="Latest blocks"
          data={latestBlocks}
          detailsPageBaseUrl="/block"
          listPageUrl="/blocks"
          containerClass="pt-5 md:pt-6 lg:pt-5"
          isLoading={isLoadingBlocks}
        />
      </div>
    </>
  );
}
