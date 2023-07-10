import clsx from "clsx";
import { useState } from "react";
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
    <div className="flex flex-col md:pt-[3.67px] pt-[23.67px]">
      {tabs.length > 0 && (
        <div className="flex flex-row gap-x-6">
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

      <div>
        {activeTab === TabTitle.transfers && <TokenTransfers />}
        {activeTab === TabTitle.holders && <TokenHolders />}
      </div>
    </div>
  );
}
