import React from "react";
import NumericFormat from "@components/commons/NumericFormat";
import BTC from "@components/icons/BTC";
import dBCH from "@components/icons/dBCH";
import DFI from "@components/icons/DFI";
import dBTC from "@components/icons/dBTC";
import dDFI from "@components/icons/dDFI";
import dETH from "@components/icons/dETH";
import dLTC from "@components/icons/dLTC";
import dUSDT from "@components/icons/dUSDT";
import dUSDC from "@components/icons/dUSDC";
import dUSD from "@components/icons/dUSD";
import DefaultToken from "@components/icons/DefaultToken";

interface MappingProps {
  size?: number;
  symbol?: string;
}

const mapping: Record<string, ({ size, symbol }: MappingProps) => JSX.Element> =
  {
    _UTXO: DFI,
    DFI,
    "DFI (UTXO)": DFI,
    "DFI (Token)": DFI,
    BTC,
    dBCH,
    dBTC,
    dDFI,
    dETH,
    dLTC,
    dUSDT,
    dUSDC,
    dUSD,
    DUSD: dUSD,
    DefaultToken,
  };

interface DropDownTokenRowProps {
  value: number;
  symbol: string;
}

export default function DropDownTokenRow({
  value,
  symbol,
}: DropDownTokenRowProps) {
  const Icon = getIcon(symbol);
  return (
    <div className="pb-6 flex flex-row items-center">
      <div className="flex flex-row gap-x-2 grow items-center">
        <Icon size={32} symbol={symbol} />
        <div className="text-white-50">{symbol}</div>
      </div>

      <div>
        <NumericFormat
          value={value.toString()}
          thousandSeparator
          decimalScale={8}
          className="text-white-50"
        />
      </div>
    </div>
  );
}

function getIcon(symbol: string): (size: MappingProps) => JSX.Element {
  let Icon = mapping[symbol];
  if (Icon === undefined) {
    Icon = mapping.DefaultToken;
  }
  return Icon;
}
