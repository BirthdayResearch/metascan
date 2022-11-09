import React from "react";
import StatisticCard from "@components/commons/StatisticCard";

function GroupStatisticCard() {
  const groupStatsCardContent = [
    {
      title: "24h total value locked",
      body: "3232400000",
      footer: "+2.34%",
      testId: "24h-total-value-locked",
    },
    {
      title: "24h transactions",
      body: "32324000000",
      footer: "-0.02%",
      testId: "24h-total-transactions",
    },
  ];
  return (
    <div className="flex flex-col space-y-2 lg:space-y-0 md:space-y-0 lg:space-x-2 md:space-x-2 lg:flex-row md:flex-row">
      {groupStatsCardContent.map((card) => (
        <StatisticCard
          key={card.title}
          title={card.title}
          body={card.body}
          footer={card.footer}
          testId={card.testId}
        />
      ))}
    </div>
  );
}

export default GroupStatisticCard;
