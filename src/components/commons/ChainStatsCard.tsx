import React from "react";
import clsx from "clsx";
import BigNumber from "bignumber.js";

interface StatsCardProps {
  cardTitle: string;
  cardBody: string;
  cardFooter: string;
  classNames?: string;
}

export function useUnitSuffix(
  units: Record<number, string>,
  value: string
): string {
  const updatedValue = new BigNumber(value);
  const places = updatedValue.e !== null ? Math.floor(updatedValue.e / 3) : 0;
  const suffix = `${units[places * 3] ?? ""}`;

  return updatedValue.dividedBy(1000 ** places).toFormat(2, {
    decimalSeparator: ".",
    suffix,
  });
}

function ChainStatsCard({
  cardTitle,
  cardBody,
  cardFooter,
  classNames,
}: StatsCardProps) {
  const isSuffixRequired = new BigNumber(cardBody ?? 0).gte(
    new BigNumber(1000000)
  );
  const valueToUnitSuffix = useUnitSuffix(
    {
      6: "M",
      9: "B",
      12: "T",
    },
    cardBody
  );

  return (
    <div
      className="rounded-2xl w-full h-full p-[0.3px] shadow-[0_3px_6px_rgba(0,0,0,0.2)]"
      style={{
        background:
          "linear-gradient(152.58deg,rgba(255, 255, 255, 0.4),rgba(255, 255, 255, 0))",
      }}
    >
      <div className="bg-black-900 rounded-2xl rounded-2xl w-full h-full">
        <div className="rounded-2xl flex flex-col justify-center pl-10 black-gradient-1 py-8">
          <div className="text-white-700 font-medium text-xs tracking-wider uppercase ">
            {cardTitle}
          </div>
          <div className="text-white-50 text-2xl font-light tracking-wider py-2">
            {isSuffixRequired ? valueToUnitSuffix : cardBody}
          </div>
          <div
            className={clsx(
              " text-transparent bg-clip-text font-medium text-xs tracking-wider uppercase max-w-[146px]",
              classNames
            )}
          >
            {cardFooter}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChainStatsCard;
