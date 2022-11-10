import React from "react";
import ChainStatsCard from "@components/commons/ChainStatsCard";
import Container from "@components/commons/Container";

function GroupChainStatsCard() {
  const groupStatsCardContent = [
    {
      cardTitle: "24h total transactions",
      cardBody: "32324000000",
      cardFooter: "+12.34% last 30 days",
      classNames: "brand-gradient-2",
    },
    {
      cardTitle: "24h total volume liquidity",
      cardBody: "3232400000",
      cardFooter: "+2.34% last 24H",
      classNames: "brand-gradient-1",
    },
  ];
  return (
    <Container className="px-1 md:px-0 lg:px-[196px]">
      <div className="flex flex-col space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row ">
        {groupStatsCardContent.map((card) => (
          <ChainStatsCard
            key={card.cardTitle}
            title={card.cardTitle}
            body={card.cardBody}
            footer={card.cardFooter}
            classNames={card.classNames}
          />
        ))}
      </div>
    </Container>
  );
}

export default GroupChainStatsCard;
