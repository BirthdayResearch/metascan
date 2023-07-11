import clsx from "clsx";
import { useState } from "react";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import TokenTransfers from "./TokenTransfers";
import TokenHolders from "./TokenHolders";

enum TabTitle {
  transfers = "Token transfers",
  holders = "Token holders",
}
const tabs = [{ title: TabTitle.transfers }, { title: TabTitle.holders }];

export default function TokenDetailTabs() {
  const [activeTab, setActiveTab] = useState(TabTitle.transfers);

  return (
    <div className="flex flex-col mt-10 lg:mt-8">
      {tabs.length > 0 && (
        <div className="flex flex-row gap-x-4 md:gap-x-8 ml-2 md:ml-10">
          {tabs.map(({ title }) => (
            <div className="flex flex-col" key={title}>
              <button
                type="button"
                className={clsx(
                  "font-medium",
                  activeTab === title ? "text-white-50" : "text-white-700"
                )}
                data-testid={`wallet-${title}-options-title`}
                onClick={() => setActiveTab(title)}
              >
                {title}
              </button>
              {activeTab === title && (
                <div className="brand-gradient-1 h-1 mt-3" />
              )}
            </div>
          ))}
        </div>
      )}

      <GradientCardContainer className="mt-6 lg:mt-4">
        <div className="p-5 pt-1 md:p-10 md:pt-6">
          {activeTab === TabTitle.transfers && <TokenTransfers />}
          {activeTab === TabTitle.holders && <TokenHolders />}
        </div>
      </GradientCardContainer>
    </div>
  );
}
