import { truncateTextFromMiddle } from "shared/textHelper";
import LinkText from "@components/commons/LinkText";
import NumericFormat from "@components/commons/NumericFormat";
import { RawTokenI } from "@api/types";
import { formatUnits } from "viem";

const transformTokenData = (rawToken: RawTokenI) => ({
  address: rawToken.address,
  circulatingMarketCap: rawToken.circulating_market_cap ?? "n/a",
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
      <div className="hidden md:block">
        <div className="grid grid-cols-12 gap-5 py-4">
          <div className="col-start-1 col-end-2">
            <span className="text-white-50">{index + 1}</span>
          </div>

          <div className="col-start-2 col-end-3 xl:col-start-2 xl:col-end-5">
            <div className="flex flex-row">
              <div className="flex flex-col ml-2 xl:ml-4 text-base">
                <span className="text-white-50">{`${token.name ?? "n/a"} ${
                  token.symbol ? `(${token.symbol})` : ""
                }`}</span>
              </div>
            </div>
          </div>

          <div className="col-start-6 col-end-8">
            <TransactionLinkRow
              label="Address"
              pathname={`/address/${token.address}`}
              value={token.address}
              containerClass="flex flex-col"
            />
          </div>
          <div className="col-start-8 col-end-11">
            <div className="flex">
              <span className="text-white-700 mr-1">Circulation</span>
              <span className="text-white-50">
                {token.circulatingMarketCap}
              </span>
            </div>
            <div className="flex">
              <span className="text-white-700 mr-1">Total Supply</span>
              <span className="text-white-50 mr-1">
                {token.totalSupply ? (
                  <NumericFormat
                    data-testid="gas-limit"
                    thousandSeparator
                    value={token.totalSupply}
                    decimalScale={0}
                  />
                ) : (
                  "n/a"
                )}
              </span>
              <span className="text-white-50">{rawData.symbol}</span>
            </div>
          </div>
          <div className="flex flex-col col-start-12 col-end-12 items-end">
            <span className="text-white-700 mr-1">Holders</span>
            <span className="text-white-50">{token.holders}</span>
          </div>
        </div>
      </div>

      {/* For mobile */}
      <div className="md:hidden flex justify-between py-6 flex-col sm:flex-row">
        {/* First two columns (index and data) */}
        <div className="flex">
          <div className="mt-2">
            <span className="text-white-700">{index + 1}</span>
          </div>
          <div className="ml-8">
            <span className="text-white-50">{`${token.name} (${token.symbol})`}</span>
            <TransactionLinkRow
              label="Address"
              pathname={`/address/${token.address}`}
              value={token.address}
            />
            <div className="flex">
              <span className="text-white-700 mr-1">Circulation</span>
              <span className="text-white-50">
                {token.circulatingMarketCap}
              </span>
            </div>
            <div className="flex">
              <span className="text-white-700 mr-1">Total Supply</span>
              <span className="text-white-50 mr-1">
                {token.totalSupply ? (
                  <NumericFormat
                    data-testid="gas-limit"
                    thousandSeparator
                    value={token.totalSupply}
                    decimalScale={0}
                  />
                ) : (
                  "n/a"
                )}
              </span>
              <span className="text-white-50">{rawData.symbol}</span>
            </div>
          </div>
        </div>
        {/* Holders */}
        <div className="flex flex-row sm:flex-col ml-10">
          <span className="text-white-700 mr-1">Holders</span>
          <span className="text-white-50">{token.holders}</span>
        </div>
      </div>
      <div className="border-b border-black-600" />
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
      <span className="text-white-700 text-base mr-1 md:mr-0 xl:mr-1">
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
