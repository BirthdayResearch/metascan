import React from "react";
import LinkText from "@components/commons/LinkText";
import NumericFormat from "@components/commons/NumericFormat";
import { truncateTextFromMiddle } from "shared/textHelper";
import { TokenItemI } from "@api/types";
import BigNumber from "bignumber.js";
import clsx from "clsx";

export const TokenTableFixedTitle = {
  asset: "Asset",
  type: "Type",
  symbol: "Symbol",
  quantity: "Quantity",
  price: "Price",
  value: "Value",
  contractAddress: "Contract Address",
};

export default function ContractTokenRow({ data }: { data: TokenItemI }) {
  const { token } = data;
  const value = new BigNumber(data.value).dividedBy(
    new BigNumber(10).pow(token?.decimals)
  );
  const titleClass = "text-base tracking-[0.032em]";
  const valueClass = "text-white-50 tracking-[0.032em]";
  return (
    <div>
      {/* desktop */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-7 py-5">
          <LinkText
            label={token.name}
            href={`/token/${token?.address}`}
            customStyle="tracking-[0.032em]"
          />
          <div className={valueClass}>{token?.type}</div>
          <div className={valueClass}>{token?.symbol?.toUpperCase()}</div>
          <div className="col-span-2 text-right">
            <NumericFormat
              value={value}
              thousandSeparator
              decimalScale={8}
              suffix={` ${token?.symbol?.toUpperCase()}`}
              className={clsx(valueClass, "break-all")}
            />
          </div>
          <div className="col-span-2 text-right">
            <LinkText
              label={truncateTextFromMiddle(token?.address, 5)}
              href={`/token/${token?.address}`}
            />
          </div>
        </div>
        <div className="bg-black-600 h-[1px]" />
      </div>
      {/* tablet and mobile */}
      <div className="lg:hidden">
        <div className="py-3 space-y-3">
          <LinkText
            label={token.name}
            href={`/token/${token?.address}`}
            customStyle="text-xl font-semibold tracking-[0.032em]"
          />
          <div className="flex flex-row justify-between">
            <AddressTokenTableTitle
              title={TokenTableFixedTitle.type}
              className={titleClass}
            />
            <div className={valueClass}>{token?.type}</div>
          </div>
          <div className="flex flex-row justify-between">
            <AddressTokenTableTitle
              title={TokenTableFixedTitle.symbol}
              className={titleClass}
            />
            <div className={valueClass}>{token?.symbol?.toUpperCase()}</div>
          </div>
          <div className="flex flex-row justify-between">
            <AddressTokenTableTitle
              title={TokenTableFixedTitle.quantity}
              className={titleClass}
            />
            <NumericFormat
              value={value}
              decimalScale={8}
              thousandSeparator
              suffix={` ${token?.symbol?.toUpperCase()}`}
              className={clsx(valueClass, "break-all")}
            />
          </div>
          <div className="flex flex-row justify-between">
            <AddressTokenTableTitle
              title={TokenTableFixedTitle.contractAddress}
              className={titleClass}
            />
            <LinkText
              label={truncateTextFromMiddle(token?.address, 4)}
              href={`/token/${token?.address}`}
              customStyle="tracking-[0.032em]"
            />
          </div>
        </div>
        <div className="bg-black-600 h-[1px] my-4" />
      </div>
    </div>
  );
}

function AddressTokenTableTitle({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "text-white-700 tracking-[0.01em] leading-[22.4px]",
        className
      )}
    >
      {title}
    </div>
  );
}
