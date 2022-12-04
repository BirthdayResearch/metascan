import React from "react";
import LinkText from "@components/commons/LinkText";
import NumericFormat from "@components/commons/NumericFormat";
import { Token } from "mockdata/TokenData";
import { truncateTextFromMiddle } from "shared/textHelper";
import AddressTokenTableTitle from "./AddressTokenTableTitle";

export default function TokenRow({ data }: { data: Token }) {
  return (
    <div>
      {/* desktop */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-9 py-5">
          <div className="text-white-50 tracking-[0.01em]">{data.asset}</div>
          <div className="text-white-50 tracking-[0.01em]">{data.type}</div>
          <div className="text-white-50 tracking-[0.01em]">
            {data.symbol.toUpperCase()}
          </div>
          <div className="col-span-2 text-right pr-10">
            <NumericFormat
              value={data.amount}
              thousandSeparator
              decimalScale={8}
              className="text-white-50 tracking-[0.01em]"
            />
          </div>
          <div className="text-right pr-5">
            <NumericFormat
              value={data.price}
              decimalScale={2}
              thousandSeparator
              className="text-white-50 tracking-[0.01em]"
              prefix="$"
            />
          </div>
          <div className="text-right">
            <NumericFormat
              value={data.value}
              decimalScale={2}
              thousandSeparator
              className="text-white-50 tracking-[0.01em]"
              prefix="$"
            />
          </div>
          <div className="col-span-2 text-right">
            <LinkText
              label={truncateTextFromMiddle(data.contractAddress, 4)}
              href={`/contract/${data.contractAddress}`}
            />
          </div>
        </div>
        <div className="bg-black-600 h-[1px]" />
      </div>
      {/* tablet */}
      <div className="hidden lg:hidden md:block">
        <div className="grid grid-cols-5 grid-rows-2 py-5 gap-y-4">
          <div className="flex flex-col">
            <AddressTokenTableTitle
              title={tokenTableFixedTitle.asset}
              className="text-xs tracking-[0.02em]"
            />
            <div className="text-white-50 tracking-[0.01em]">{data.asset}</div>
          </div>
          <div className="flex flex-col">
            <AddressTokenTableTitle
              title={tokenTableFixedTitle.symbol}
              className="text-xs tracking-[0.02em]"
            />
            <div className="text-white-50 tracking-[0.01em]">
              {data.symbol.toUpperCase()}
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col items-end">
              <AddressTokenTableTitle
                title={tokenTableFixedTitle.type}
                className="text-xs tracking-[0.02em]"
              />
              <div className="text-white-50 tracking-[0.01em]">
                {data.type.toUpperCase()}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <AddressTokenTableTitle
              title={tokenTableFixedTitle.amount}
              className="text-xs tracking-[0.02em]"
            />
            <NumericFormat
              value={data.amount}
              decimalScale={8}
              thousandSeparator
              className="text-white-50 tracking-[0.01em]"
            />
          </div>
          <div className="flex flex-col">
            <AddressTokenTableTitle
              title={tokenTableFixedTitle.price}
              className="text-xs tracking-[0.02em]"
            />
            <div>
              <NumericFormat
                value={data.price}
                decimalScale={2}
                className="text-white-50 tracking-[0.01em]"
                prefix="$"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <AddressTokenTableTitle
              title={tokenTableFixedTitle.value}
              className="text-xs tracking-[0.02em]"
            />
            <div>
              <NumericFormat
                value={data.value}
                decimalScale={2}
                className="text-white-50 tracking-[0.01em]"
                prefix="$"
              />
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col items-end">
              <AddressTokenTableTitle
                title={tokenTableFixedTitle.contractAddress}
                className="text-xs tracking-[0.02em]"
              />
              <div>
                <LinkText
                  label={truncateTextFromMiddle(data.contractAddress, 4)}
                  href={`/address/${data.contractAddress}`}
                  customStyle="tracking-[0.01em]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-black-600 h-[1px]" />
      </div>

      {/* mobile */}
      <div className="lg:hidden md:hidden sm:block">
        <div className="grid grid-cols-2 grid-rows-4 pb-5 pt-4 gap-y-4 gap-x-5">
          <div className="flex flex-col">
            <AddressTokenTableTitle
              title={tokenTableFixedTitle.asset}
              className="text-xs tracking-[0.02em]"
            />
            <div className="text-white-50 tracking-[0.01em]">{data.asset}</div>
          </div>
          <div className="flex flex-col items-end">
            <AddressTokenTableTitle
              title={tokenTableFixedTitle.type}
              className="text-xs tracking-[0.02em]"
            />
            <div className="text-white-50 tracking-[0.01em]">
              {data.type.toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col">
            <AddressTokenTableTitle
              title={tokenTableFixedTitle.symbol}
              className="text-xs tracking-[0.02em]"
            />
            <div className="text-white-50 tracking-[0.01em]">
              {data.symbol.toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <AddressTokenTableTitle
              title={tokenTableFixedTitle.amount}
              className="text-xs tracking-[0.02em]"
            />
            <NumericFormat
              value={data.amount}
              decimalScale={8}
              thousandSeparator
              className="text-white-50 tracking-[0.01em]"
            />
          </div>
          <div className="flex flex-col">
            <AddressTokenTableTitle
              title={tokenTableFixedTitle.price}
              className="text-xs tracking-[0.02em]"
            />
            <div>
              <NumericFormat
                value={data.price}
                decimalScale={2}
                className="text-white-50 tracking-[0.01em]"
                prefix="$"
              />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <AddressTokenTableTitle
              title={tokenTableFixedTitle.value}
              className="text-xs tracking-[0.02em]"
            />
            <div>
              <NumericFormat
                value={data.value}
                decimalScale={2}
                className="text-white-50 tracking-[0.01em]"
                prefix="$"
              />
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col">
              <AddressTokenTableTitle
                title={tokenTableFixedTitle.contractAddress}
                className="text-xs tracking-[0.02em]"
              />
              <div>
                <LinkText
                  label={truncateTextFromMiddle(data.contractAddress, 13)}
                  href={`/address/${data.contractAddress}`}
                  customStyle="tracking-[0.01em]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-black-600 h-[1px]" />
      </div>
    </div>
  );
}

const tokenTableFixedTitle = {
  asset: "Asset",
  type: "Type",
  symbol: "Symbol",
  amount: "Amount",
  price: "Price",
  value: "Value",
  contractAddress: "Contract Address",
};
