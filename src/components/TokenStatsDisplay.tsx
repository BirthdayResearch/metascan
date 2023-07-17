import { useState, useEffect } from "react";
import LatestDataApi from "@api/LatestDataApi";
import { useNetwork } from "@contexts/NetworkContext";
import { ChartDataI } from "@api/types";
import TransactionsLineChart from "./TransactionsLineChart";

export interface TokenStats {
  tokenPrice: number;
  percentChange: number;
  circulation: string;
  last24hVolume: string;
  marketCap: string;
}

export default function TokenStatsDisplay(): JSX.Element {
  const { connection } = useNetwork();
  const [chartData, setChartData] = useState<ChartDataI[]>([]);

  const fetchStats = async () => {
    const data = await LatestDataApi.getTxnChartsData(connection);
    setChartData(data.chart_data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="mb-4 mt-8 md:mt-2 lg:mt-12">
      <div>
        <div className="space-x-2 mb-6">
          <span className="text-2xl text-white-50 font-semibold">
            {" "}
            Transaction history
          </span>
          <span className="text-sm text-white-50">in 30 days</span>
        </div>
        <section className="h-[200px]">
          <TransactionsLineChart data={chartData} />
        </section>
      </div>
    </div>
  );
}
