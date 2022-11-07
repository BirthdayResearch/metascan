import React from "react";
import clsx from "clsx";
import BigNumber from "bignumber.js";
import { useUnitSuffix } from "hooks/useUnitSuffix";
import GradientCardContainer from "./GradientCardContainer";

interface StatsCardProps {
  title: string;
  body: string;
  footer: string;
  classNames?: string;
}

function ChainStatsCard({ title, body, footer, classNames }: StatsCardProps) {
  const isSuffixRequired = new BigNumber(body ?? 0).gte(new BigNumber(1000000));
  const valueToUnitSuffix = useUnitSuffix(
    {
      6: "M",
      9: "B",
      12: "T",
    },
    body
  );

  return (
    <GradientCardContainer>
      <div className="rounded-[15px] flex flex-col justify-center px-5 sm:px-10 py-8">
        <div className="text-white-700 font-medium text-xs tracking-wider uppercase ">
          {title}
        </div>
        <div className="text-white-50 text-2xl font-light tracking-wider py-2">
          {isSuffixRequired ? valueToUnitSuffix : body}
        </div>
        <div
          className={clsx(
            "text-transparent bg-clip-text font-medium text-xs tracking-wider uppercase max-w-[146px]",
            classNames
          )}
        >
          {footer}
        </div>
      </div>
    </GradientCardContainer>
  );
}

export default ChainStatsCard;
