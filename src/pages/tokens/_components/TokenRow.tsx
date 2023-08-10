import { truncateTextFromMiddle } from "shared/textHelper";
import LinkText from "@components/commons/LinkText";
import NumericFormat from "@components/commons/NumericFormat";
import { RawTokenI } from "@api/types";
import { formatUnits } from "viem";

const transformTokenData = (rawToken: RawTokenI) => ({
  address: rawToken.address,
  circulatingMarketCap: rawToken.circulating_market_cap ?? "N/A",
  decimals: rawToken.decimals,
  exchangeRate: rawToken.exchange_rate,
  holders: rawToken.holders,
  iconUrl: rawToken.icon_url,
  name: rawToken.name,
  symbol: rawToken.symbol,
  totalSupply: rawToken.total_supply
    ? formatUnits(
        BigInt(rawToken.total_supply ?? "0"),
        Number(rawToken.decimals)
      ).toString()
    : undefined,
  type: rawToken.type,
});

export default function TokenRow({
  rawData,
  index,
}: {
  rawData: RawTokenI;
  index: number;
}) {
  const token = transformTokenData(rawData);
  return (
    <div>
      {/* for desktop and tablet */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12 gap-5 py-4 items-center">
          <div className="col-start-1 col-end-2">
            <span className="text-white-50">{index + 1}</span>
          </div>

          <div className="col-start-2 col-end-3 xl:col-start-2 xl:col-end-5">
            <div className="flex flex-row">
              <div className="flex flex-col ml-2 xl:ml-0 text-base">
                <TokenName
                  address={token.address}
                  name={token.name}
                  symbol={token.symbol}
                />
              </div>
            </div>
          </div>

          <div className="col-start-5 col-end-7 xl:col-start-6 xl:col-end-8">
            <TransactionLinkRow
              label="Address"
              pathname={`/address/${token.address}`}
              value={token.address}
              containerClass="flex flex-col"
            />
          </div>
          <div className="col-start-7 xl:col-start-8 col-end-11">
            <div className="flex">
              <span className="text-white-700 mr-1">Circulation</span>
              <span className="text-white-50">
                {token.circulatingMarketCap}
              </span>
            </div>
            <div className="flex">
              <span className="text-white-700 mr-1 shrink-0">Total Supply</span>
              <span className="text-white-50 mr-1">
                {token.totalSupply ? (
                  <NumericFormat
                    data-testid="total-supply-desktop"
                    thousandSeparator
                    value={token.totalSupply}
                    decimalScale={0}
                    suffix={rawData.symbol ? ` ${rawData.symbol}` : ""}
                  />
                ) : (
                  "N/A"
                )}
              </span>
            </div>
          </div>
          <div className="flex flex-col col-start-12 col-end-12 items-end">
            <span className="text-white-700">Holders</span>
            <NumericFormat
              thousandSeparator
              value={token.holders}
              className="text-white-50"
              decimalScale={0}
            />
          </div>
        </div>
      </div>

      {/* For mobile */}
      <div className="lg:hidden flex justify-between py-6 flex-col sm:flex-row sm:border-t-0 border-t border-black-600">
        {/* First two columns (index and data) */}
        <div className="flex">
          <div>
            <span className="text-white-700">{index + 1}</span>
          </div>
          <div className="flex flex-col gap-2 ml-[26px] grow">
            <div className="pb-1">
              <TokenName
                address={token.address}
                name={token.name}
                symbol={token.symbol}
              />
            </div>
            <TransactionLinkRow
              label="Address"
              pathname={`/address/${token.address}`}
              value={token.address}
              containerClass="flex justify-between sm:justify-start sm:gap-2"
            />
            <div className="flex justify-between sm:justify-start sm:gap-2 text-sm sm:text-base">
              <span className="text-white-700 mr-1">Circulation</span>
              <span className="text-white-50">
                {token.circulatingMarketCap}
              </span>
            </div>
            <div className="flex justify-between sm:justify-start sm:gap-2 text-sm sm:text-base mb-2">
              <span className="text-white-700 mr-1">Total Supply</span>
              <span className="text-white-50">
                {token.totalSupply ? (
                  <NumericFormat
                    data-testid="total-supply"
                    thousandSeparator
                    value={token.totalSupply}
                    decimalScale={0}
                    suffix={rawData.symbol ? ` ${rawData.symbol}` : ""}
                  />
                ) : (
                  "N/A"
                )}
              </span>
            </div>
          </div>
        </div>
        {/* Holders */}
        <div className="flex flex-row sm:flex-col ml-9 justify-between sm:justify-start sm:gap-1 text-sm sm:text-base">
          <span className="text-white-700">Holders</span>
          <span className="text-white-50 text-end">{token.holders}</span>
        </div>
      </div>
      <div className="border-b border-black-600" />
    </div>
  );
}

function TokenName({
  address,
  name,
  symbol,
}: {
  address: string;
  name: string;
  symbol: string;
}) {
  return (
    <div>
      <LinkText
        href={`/token/${address}`}
        customStyle="font-semibold"
        label={name ?? "N/A"}
      />
      <span className="text-sm text-white-700 ml-1">
        {symbol ? `(${symbol})` : ""}
      </span>
    </div>
  );
}

function TransactionLinkRow({
  pathname,
  value,
  label,
  containerClass,
}: {
  pathname: string;
  value: string;
  label: string;
  containerClass?: string;
}): JSX.Element {
  return (
    <div className={containerClass}>
      <span className="text-white-700 text-sm sm:text-base mr-1 md:mr-0 xl:mr-1">
        {label}
      </span>
      <LinkText
        testId={`from-address-link-${value}`}
        href={pathname}
        label={truncateTextFromMiddle(value)}
      />
    </div>
  );
}
