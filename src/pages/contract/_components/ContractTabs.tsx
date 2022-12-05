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
    <div className="flex flex-row gap-x-4 md:pt-[3.67px] pt-[19.67px]">
      <ButtonTab
        testId={
          selectedTab === ContractTabsTitle.Code
            ? "contract-code-options-clicked-title"
            : "contract-code-options-title"
        }
        active={selectedTab === ContractTabsTitle.Code}
        tab={ContractTabsTitle.Code}
        setSelectedTab={setSelectedTab}
      />
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

const onOptionsClick = (
  setSelectedTab: Dispatch<SetStateAction<ContractTabsTitle>>,
  itemClicked: ContractTabsTitle
) => {
  switch (itemClicked) {
    case ContractTabsTitle.Transactions:
      setSelectedTab(ContractTabsTitle.Transactions);
      break;
    case ContractTabsTitle.Tokens:
      setSelectedTab(ContractTabsTitle.Tokens);
      break;
    case ContractTabsTitle.Code:
    default:
      setSelectedTab(ContractTabsTitle.Code);
      break;
  }
};

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
        onClick={() => onOptionsClick(setSelectedTab, tab)}
      >
        {tab}
      </button>
      {active && <div className="brand-gradient-1 h-1 mt-[19.33px]" />}
    </div>
  );
}
