import React from "react";
import ChainStatsCard from "@components/commons/ChainStatsCard";
import Container from "@components/commons/Container";

function GroupChainStatsCard() {
  const groupStatsCardContent = [
    {
      cardTitle: "24h total transactions",
      cardBody: "32324000000",
      cardFooter: "+12.34% last 30 days",
      classNames: "bg-gradient-to-br from-[#42F9C2] to-[#082FD4]",
    },
    {
      cardTitle: "24h total volume liquidity",
      cardBody: "3232400000",
      cardFooter: "+2.34% last 24H",
      classNames:
        "bg-gradient-to-r from-[#BE0000] via-[#FF12AF] via-[#B117B3] via-[#0821BB] to-[#42F9C2]",
    },
  ];
  return (
    <Container className=" px-4 sm:px-10 md:px-10">
      <div className="flex flex-col space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row ">
        {groupStatsCardContent.map((card) => (
          <ChainStatsCard
            key={card.cardTitle}
            cardTitle={card.cardTitle}
            cardBody={card.cardBody}
            cardFooter={card.cardFooter}
            classNames={card.classNames}
          />
        ))}
      </div>
    </Container>
  );
}

export default GroupChainStatsCard;
