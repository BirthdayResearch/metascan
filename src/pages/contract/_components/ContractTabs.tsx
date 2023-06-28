import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { ContractTabsTitle } from "../../../enum/contractTabsTitle";

interface ContractOptionsProps {
  selectedTab: ContractTabsTitle;
  setSelectedTab: Dispatch<SetStateAction<ContractTabsTitle>>;
}

export default function ContractTabs({
  selectedTab,
  setSelectedTab,
}: ContractOptionsProps) {
  return (
    <div className="flex flex-row gap-x-4">
      <ButtonTab
        testId={
          selectedTab === ContractTabsTitle.Transactions
            ? "contract-transaction-options-clicked-title"
            : "contract-transaction-options-title"
        }
        active={selectedTab === ContractTabsTitle.Transactions}
        tab={ContractTabsTitle.Transactions}
        setSelectedTab={setSelectedTab}
      />
      <ButtonTab
        testId={
          selectedTab === ContractTabsTitle.Contract
            ? "contract-code-options-clicked-title"
            : "contract-code-options-title"
        }
        active={selectedTab === ContractTabsTitle.Contract}
        tab={ContractTabsTitle.Contract}
        setSelectedTab={setSelectedTab}
      />
      <ButtonTab
        testId={
          selectedTab === ContractTabsTitle.Tokens
            ? "contract-tokens-options-clicked-title"
            : "contract-tokens-options-title"
        }
        active={selectedTab === ContractTabsTitle.Tokens}
        tab={ContractTabsTitle.Tokens}
        setSelectedTab={setSelectedTab}
      />
    </div>
  );
}

function ButtonTab({
  active,
  tab,
  setSelectedTab,
  testId,
}: {
  active: boolean;
  tab: ContractTabsTitle;
  setSelectedTab: Dispatch<SetStateAction<ContractTabsTitle>>;
  testId?: string;
}) {
  return (
    <div>
      <button
        type="button"
        className={clsx(
          "font-medium",
          active ? "text-white-50" : "text-white-700"
        )}
        data-testid={testId}
        onClick={() => setSelectedTab(tab)}
      >
        {tab}
      </button>
      {active && <div className="brand-gradient-1 h-1 mt-3" />}
    </div>
  );
}
