import React from "react";
import StatisticCard from "@components/commons/StatisticCard";

function GroupStatisticCard() {
  const groupStatsCardContent = [
    {
      cardTitle: "24h total value locked",
      cardBody: "3232400000",
      cardFooter: "+2.34%",
      testId: "24h-total-value-locked",
    },
    {
      cardTitle: "24h total transactions",
      cardBody: "32324000000",
      cardFooter: "-0.02%",
      testId: "24h-total-transactions",
    },
  ];
  return (
    <div className="flex flex-col space-y-2 lg:space-y-0 md:space-y-0 lg:space-x-2 md:space-x-2 lg:flex-row md:flex-row">
      {groupStatsCardContent.map((card) => (
        <StatisticCard
          key={card.cardTitle}
          title={card.cardTitle}
          body={card.cardBody}
          footer={card.cardFooter}
          testId={card.testId}
        />
      ))}
    </div>
  );
}

export default GroupStatisticCard;
