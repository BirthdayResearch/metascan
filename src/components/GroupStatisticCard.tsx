import { useState, useEffect } from "react";
import StatisticCard from "@components/commons/StatisticCard";
import clsx from "clsx";
import { MdCheckCircle } from "react-icons/md";
import LatestDataApi from "@api/LatestDataApi";
import { useNetwork } from "@contexts/NetworkContext";
import BigNumber from "bignumber.js";
import { DashboardStatsProps, SmartContractStatsProps } from "@api/types";
import { GWEI_SYMBOL } from "shared/constants";
import NumericFormat from "./commons/NumericFormat";

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

  return (
    <div className="mt-11 md:mt-8 lg:mt-[72px]">
      <div
        className={clsx(
          "grid grid-cols-1 gap-4",
          "grid md:grid-cols-2 gap-6",
          "grid lg:grid-cols-4 gap-6"
        )}
      >
        <StatisticCard
          title="Blocks"
          value={new BigNumber(dashboardStats?.total_blocks ?? 0)}
          testId="blocks"
          isLoading={isLoading}
        >
          <span>
            {`Avg. speed: ${new BigNumber(
              dashboardStats?.average_block_time ?? 0
            )
              .dividedBy(1000)
              .toFixed(1)} sec`}
          </span>
        </StatisticCard>

        <StatisticCard
          title="Transactions"
          value={new BigNumber(dashboardStats?.total_transactions ?? 0)}
          testId="transactions"
          isLoading={isLoading}
        >
          <NumericFormat
            value={new BigNumber(dashboardStats?.transactions_today ?? 0)}
            thousandSeparator
            prefix={`Today: `}
            suffix={` transactions`}
            decimalScale={0}
          />
        </StatisticCard>

        <StatisticCard
          title="Contracts"
          value={
            new BigNumber(smartContractStats?.verified_smart_contracts ?? 0)
          }
          testId="contracts"
          isLoading={isLoading}
        >
          <span className="flex flex-row items-center">
            <NumericFormat
              value={new BigNumber(
                smartContractStats?.verified_smart_contracts ?? 0
              )
                .multipliedBy(smartContractStats?.smart_contracts ?? 0)
                .dividedBy(100)
                .toFixed(2)}
              thousandSeparator
              suffix="% verified"
              decimalScale={2}
            />
            <MdCheckCircle className="h-5 w-5 ml-1 text-green-800" />
          </span>
        </StatisticCard>

        <StatisticCard
          title="Gas price"
          value={new BigNumber(dashboardStats?.gas_prices.average ?? 0)}
          testId="gas-price"
          suffix={` ${GWEI_SYMBOL}`}
          isLoading={isLoading}
        >
          <NumericFormat
            value={new BigNumber(dashboardStats?.gas_prices.fast ?? 0)}
            thousandSeparator
            prefix={`High: `}
            suffix={` ${GWEI_SYMBOL}`}
            decimalScale={0}
          />
          <NumericFormat
            value={new BigNumber(dashboardStats?.gas_prices.slow ?? 0)}
            thousandSeparator
            prefix={`Low: `}
            suffix={` ${GWEI_SYMBOL}`}
            decimalScale={0}
            className="ml-2"
          />
        </StatisticCard>
      </div>
    </div>
  );
}
