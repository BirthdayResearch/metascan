import React from "react";
import NumericFormat from "@components/commons/NumericFormat";
import { getTokenIcon } from "../../shared/getTokenIcon";

interface DropDownTokenRowProps {
  value: number;
  symbol: string;
}

export default function DropDownTokenRow({
  value,
  symbol,
}: DropDownTokenRowProps) {
  const Icon = getTokenIcon(symbol);
  return (
    <div className="pb-6 flex flex-row items-center">
      <div className="flex flex-row gap-x-2 grow items-center">
        <Icon size={32} symbol={symbol} />
        <div className="text-white-50">{symbol}</div>
      </div>

      <div>
        <NumericFormat
          value={value}
          thousandSeparator
          decimalScale={8}
          className="text-white-50"
        />
      </div>
    </div>
  );
}
