import clsx from "clsx";
import TokenStatsApi from "@api/TokenStatsApi";
import { useUnitSuffix } from "hooks/useUnitSuffix";
import { DMX_TOKEN_SYMBOL } from "shared/contants";
import TrendLineChart, { LineData } from "./TrendLineChart";
import GradientCardContainer from "./commons/GradientCardContainer";

export interface TokenStats {
  tokenPrice: number;
  percentChange: number;
  circulation: string;
  last24hVolume: string;
  marketCap: string;
}

export default function TokenStatsDisplay(): JSX.Element {
  const stats: TokenStats = TokenStatsApi.useTokenStats();
  const priceHistory = TokenStatsApi.useTokenPriceHistory();

  const trendLineData: LineData[] = priceHistory.map((data) => ({
    value: data.price,
  }));

  return (
    <div className="pb-2 pt-6 lg:pb-6">
      <GradientCardContainer>
        <section className="flex flex-col md:flex-row md:flex-wrap xl:flex-nowrap xl:items-center xl:justify-between p-5 pb-10 md:p-10 xl:py-7 rounded-[15px]">
          <section className="flex flex-1 items-center md:items-start xl:flex-1 xl:order-first xl:items-center">
            <TokenPriceSection data={stats} />
          </section>
          <section className="xl:order-last xl:ml-16">
            <DetailsSection data={stats} />
          </section>
          <section className="mt-8 md:mt-12 xl:mt-0 h-[88px] md:basis-full xl:order-2 xl:basis-auto xl:w-[304px]">
            <TrendLineChart data={trendLineData} />
          </section>
        </section>
      </GradientCardContainer>
    </div>
  );
}

function TokenPriceSection({ data }: { data: TokenStats }) {
  return (
    <>
      <div className="h-10 w-10 mb-1 md:mb-0 md:mt-1 xl:mt-0 md:h-[39px] md:w-[39px] xl:h-[46px] xl:w-[46px] rounded-full bg-gradient-to-r from-green-800 to-blue-800" />
      <div className="flex flex-1 md:flex-col xl:flex-row justify-between md:justify-start xl:items-end ml-2 md:ml-3">
        <div>
          <div className="text-white-700 text-xs md:text-sm">
            DefiMetaChain Token
          </div>
          <div className="text-white-50 font-bold text-2xl xl:text-[32px] xl:leading-10 pt-1 md:pt-0">
            {DMX_TOKEN_SYMBOL}
          </div>
        </div>
        <div className="flex-wrap md:flex md:items-baseline md:pt-2 xl:pt-0 xl:pl-3">
          <div className="text-white-50 text-right text-lg md:text-2xl xl:text-[28px] leading-5 md:leading-10">
            ${data.tokenPrice}
          </div>
          <div
            className={clsx(
              "text-right text-sm pt-2 md:pt-0 md:pl-2",
              data.percentChange < 0 ? "text-red-800" : "text-green-800"
            )}
          >
            {data.percentChange >= 0 ? "+" : ""}
            {data.percentChange}%
          </div>
        </div>
      </div>
    </>
  );
}

function DetailsSection({ data }: { data: TokenStats }) {
  const circulation = useUnitSuffix(data.circulation);
  const last24hVolume = useUnitSuffix(data.last24hVolume);
  const marketCap = useUnitSuffix(data.marketCap);
  return (
    <div className="pt-10 md:pt-0">
      <DetailRow
        label="Circulation"
        value={`${circulation} ${DMX_TOKEN_SYMBOL}`}
      />
      <DetailRow label="24h Volume" value={last24hVolume} />
      <DetailRow label="Market Cap" value={`$${marketCap}`} />
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  const labelStyle = "text-white-700 md:pr-2";
  const valueStyle = "text-right text-white-50";
  return (
    <div className="flex justify-between md:justify-end pt-2 md:pt-3 xl:pt-2 first:pt-0">
      <div className={labelStyle}>{label}</div>
      <div className={valueStyle}>{value}</div>
    </div>
  );
}
