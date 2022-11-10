import clsx from "clsx";
import Container from "@components/commons/Container";
import TokenStatsApi from "@api/TokenStatsApi";
import TrendLineChart, { LineData } from "./TrendLineChart";
import GradientCardContainer from "./commons/GradientCardContainer";

export interface TokenStats {
  tokenPrice: number;
  percentChange: number;
  circulation: string;
  last24hVolume: string;
  marketCap: string;
}

const DmxTokenSymbol = "DMXTc";

export default function TokenStatsDisplay(): JSX.Element {
  const stats: TokenStats = TokenStatsApi.useTokenStats();
  const priceHistory = TokenStatsApi.useTokenPriceHistory();

  const trendLineData: LineData[] = priceHistory.map((data) => ({
    value: data.price,
  }));

  return (
    <Container className="px-1 md:px-0 lg:px-[196px] pb-2 sm:py-5 md:py-6">
      <GradientCardContainer>
        <section className="flex flex-col sm:flex-row sm:flex-wrap xl:flex-nowrap xl:items-center xl:justify-between p-5 pb-10 sm:p-10 xl:py-7 rounded-[15px]">
          <section className="flex flex-1 items-center sm:items-start xl:flex-1 xl:order-first xl:items-center">
            <TokenPriceSection data={stats} />
          </section>
          <section className="xl:order-last xl:ml-16">
            <DetailsSection data={stats} />
          </section>
          <section className="mt-8 sm:mt-12 xl:mt-0 h-[88px] sm:basis-full xl:order-2 xl:basis-auto xl:w-[304px]">
            <TrendLineChart data={trendLineData} />
          </section>
        </section>
      </GradientCardContainer>
    </Container>
  );
}

function TokenPriceSection({ data }: { data: TokenStats }) {
  return (
    <>
      <div className="h-10 w-10 mb-1 sm:mb-0 sm:mt-1 xl:mt-0 sm:h-[39px] sm:w-[39px] xl:h-[46px] xl:w-[46px] rounded-full bg-gradient-to-r from-green-800 to-blue-800" />
      <div className="flex flex-1 sm:flex-col xl:flex-row justify-between sm:justify-start xl:items-end ml-2 sm:ml-3">
        <div>
          <div className="text-white-700 text-xs sm:text-sm">
            DefiMetaChain Token
          </div>
          <div className="text-white-50 font-bold text-2xl xl:text-[32px] xl:leading-10 pt-1 sm:pt-0">
            {DmxTokenSymbol}
          </div>
        </div>
        <div className="flex-wrap sm:flex sm:items-baseline sm:pt-2 xl:pt-0 xl:pl-3">
          <div className="text-white-50 text-right text-lg sm:text-2xl xl:text-[28px] leading-5 sm:leading-10">
            ${data.tokenPrice}
          </div>
          <div
            className={clsx(
              "text-right text-sm pt-2 sm:pt-0 sm:pl-2",
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
  return (
    <div className="pt-10 sm:pt-0">
      <DetailRow
        label="Circulation"
        value={`${data.circulation} ${DmxTokenSymbol}`}
      />
      <DetailRow label="24h Volume" value={data.last24hVolume} />
      <DetailRow label="Market Cap" value={`$${data.marketCap}`} />
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  const labelStyle = "text-white-700 sm:pr-2";
  const valueStyle = "text-right text-white-50";
  return (
    <div className="flex justify-between sm:justify-end pt-2 sm:pt-3 xl:pt-2 first:pt-0">
      <div className={labelStyle}>{label}</div>
      <div className={valueStyle}>{value}</div>
    </div>
  );
}
