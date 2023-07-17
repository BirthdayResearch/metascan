import React from "react";
import { IconType } from "react-icons";
import BigNumber from "bignumber.js";
import GradientCardContainer from "./GradientCardContainer";
import NumericFormat from "./NumericFormat";

interface StatsCardProps {
  title: string;
  footer: string;
  value: BigNumber;
  icon?: IconType;
  iconClass?: string;
  testId: string;
  isLoading: boolean;
}

export default function StatisticCard({
  title,
  value,
  footer,
  testId,
  icon: Icon,
  iconClass,
  isLoading,
}: StatsCardProps) {
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
              className="text-white-50 text-2xl font-semibold"
            />
          )}
        </div>
        <div className="text-white-50 -tracking-[0.14px]">
          {isLoading ? (
            <div className="py-1">
              <div className="bg-dark-200 rounded-[5px] mr-1 w-4/6 h-[16px]" />
            </div>
          ) : (
            <>
              {footer}
              {Icon && <Icon size="20" className={iconClass} />}
            </>
          )}
        </div>
      </div>
    </GradientCardContainer>
  );
}
