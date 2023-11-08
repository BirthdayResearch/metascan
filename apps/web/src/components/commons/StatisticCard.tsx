import React from "react";
import clsx from "clsx";
import { useUnitSuffix } from "hooks/useUnitSuffix";
import GradientCardContainer from "./GradientCardContainer";

interface StatsCardProps {
  title: string;
  body: string;
  footer: string;
  testId: string;
}

function StatisticCard({ title, body, footer, testId }: StatsCardProps) {
  const valueToUnitSuffix = useUnitSuffix(body);

  return (
    <GradientCardContainer data-testid={testId}>
      <div className="rounded-[15px] flex flex-col justify-center px-5 lg:px-10 md:px-10 py-8">
        <div className="text-white-700 font-medium text-xs tracking-wider uppercase ">
          {title}
        </div>
        <div className="text-white-50 text-2xl font-light tracking-wider py-2">
          {valueToUnitSuffix}
        </div>
        <div
          className={clsx(
            "text-transparent bg-clip-text font-medium text-xs tracking-wider uppercase max-w-[60px]",
            footer.includes("-") ? "brand-gradient-1" : "brand-gradient-2",
          )}
        >
          {footer}
        </div>
      </div>
    </GradientCardContainer>
  );
}

export default StatisticCard;
