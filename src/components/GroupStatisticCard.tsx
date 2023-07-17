import { useState, useEffect } from "react";
import StatisticCard from "@components/commons/StatisticCard";
import clsx from "clsx";
import LatestDataApi from "@api/LatestDataApi";
import { useNetwork } from "@contexts/NetworkContext";
import BigNumber from "bignumber.js";
import { DashboardStatsProps, SmartContractStatsProps } from "@api/types";

export default function GroupStatisticCard() {
  const { connection } = useNetwork();
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardStats, setDashboardStats] = useState<DashboardStatsProps>();
  const [smartContractStats, setSmartContractStats] =
    useState<SmartContractStatsProps>();

  const fetchStats = async () => {
    setIsLoading(true);
    const dashStats = await LatestDataApi.getDashboardStats(connection);
    setDashboardStats(dashStats);
    const scStats = await LatestDataApi.getSmartContractStats(connection);
    setSmartContractStats(scStats);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const groupStatsCardContent = [
    {
      title: "Blocks",
      value: new BigNumber(dashboardStats?.total_blocks ?? 0),
      // convert milliseconds to seconds
      footer: `Avg. speed: ${new BigNumber(
        dashboardStats?.average_block_time ?? 0
      )
        .dividedBy(1000)
        .toFixed(1)} sec`,
      testId: "blocks",
    },
    {
      title: "Transactions",
      value: new BigNumber(dashboardStats?.total_transactions ?? 0),
      footer: `Today: ${new BigNumber(
        dashboardStats?.transactions_today ?? 0
      )} transactions`,
      testId: "transactions",
    },
    {
      title: "Contracts",
      value: new BigNumber(smartContractStats?.smart_contracts ?? 0),
      footer: `${new BigNumber(
        smartContractStats?.verified_smart_contracts ?? 0
      )
        .multipliedBy(smartContractStats?.smart_contracts ?? 0)
        .dividedBy(1000)
        .toFixed(2)}% verified`,
      testId: "contracts",
    },
    {
      title: "Tokens",
      value: new BigNumber(smartContractStats?.smart_contracts ?? 0),
      footer: "",
      testId: "tokens",
    },
  ];

  return (
    <div>
      <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-7 md:justify-end md:px-10 mb-11 md:mb-8 lg:mb-[72px]">
        <div className="flex flex-row justify-between md:justify-start md:space-x-2 items-center">
          <span className="text-white-700 text-sm -tracking-[0.14px]">
            Gas Tracker:
          </span>
          <span className="text-white-50 text-base -tracking-[0.32px] font-semibold">
            {dashboardStats?.gas_prices.average}
          </span>
        </div>
        <div className="flex flex-row justify-between md:justify-start md:space-x-2 items-center">
          <span className="text-white-700 text-sm -tracking-[0.14px]">
            Daily transactions:
          </span>
          <span className="text-white-50 text-base -tracking-[0.32px] font-semibold">
            {dashboardStats?.transactions_today}
          </span>
        </div>
      </div>
      <div
        className={clsx(
          "grid grid-cols-1 gap-4",
          "grid md:grid-cols-2 gap-6",
          "grid lg:grid-cols-4 gap-6"
        )}
      >
        {groupStatsCardContent.map((card) => (
          <StatisticCard
            key={card.title}
            title={card.title}
            value={card.value}
            footer={card.footer}
            testId={card.testId}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}
