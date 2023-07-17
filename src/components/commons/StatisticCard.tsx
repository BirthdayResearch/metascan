import React, { PropsWithChildren } from "react";
import BigNumber from "bignumber.js";
import GradientCardContainer from "./GradientCardContainer";
import NumericFormat from "./NumericFormat";

interface StatsCardProps {
  title: string;
  value: BigNumber;
  testId: string;
  isLoading: boolean;
  suffix?: string;
}

export default function StatisticCard({
  title,
  value,
  children,
  suffix,
  testId,
  isLoading,
}: PropsWithChildren<StatsCardProps>) {
  return (
    <GradientCardContainer data-testid={testId} fullBorder>
      <div className="rounded-[15px] flex flex-col justify-center p-5 md:p-6">
        <div className="text-white-700 font-medium text-base -tracking-[0.32px]">
          {title}
        </div>
        <div className="py-1">
          {isLoading ? (
            <div className="py-1">
              <div className="bg-dark-200 rounded-[5px] mr-1 w-2/4 h-[24px]" />
            </div>
          ) : (
            <NumericFormat
              value={value}
              thousandSeparator
              decimalScale={0}
              suffix={suffix}
              className="text-white-50 text-2xl font-semibold"
            />
          )}
        </div>
        <div>
          {isLoading ? (
            <div className="py-0.5">
              <div className="bg-dark-200 rounded-[5px] mr-1 w-4/6 h-[16px]" />
            </div>
          ) : (
            <div className="text-white-50 -tracking-[0.14px] text-sm">
              {children}
            </div>
          )}
        </div>
      </div>
    </GradientCardContainer>
  );
}
