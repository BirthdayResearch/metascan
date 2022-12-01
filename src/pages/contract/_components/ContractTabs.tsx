import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { ContractOptionsTitle } from "./ContractOptionsTitle";

interface ContractOptionsProps {
  selectedTab: ContractOptionsTitle;
  setSelectedTab: Dispatch<SetStateAction<ContractOptionsTitle>>;
}

export default function ContractTabs({
  selectedTab,
  setSelectedTab,
}: ContractOptionsProps) {
  return (
    <div className="flex flex-row gap-x-4 md:pt-[3.67px] pt-[19.67px]">
      <ButtonTab
        testId={
          selectedTab === ContractOptionsTitle.Code
            ? "contract-code-options-clicked-title"
            : "contract-code-options-title"
        }
        active={selectedTab === ContractOptionsTitle.Code}
        tab={ContractOptionsTitle.Code}
        setSelectedTab={setSelectedTab}
      />
      <ButtonTab
        testId={
          selectedTab === ContractOptionsTitle.Transactions
            ? "contract-transaction-options-clicked-title"
            : "contract-transaction-options-title"
        }
        active={selectedTab === ContractOptionsTitle.Transactions}
        tab={ContractOptionsTitle.Transactions}
        setSelectedTab={setSelectedTab}
      />
      <ButtonTab
        testId={
          selectedTab === ContractOptionsTitle.Tokens
            ? "contract-tokens-options-clicked-title"
            : "contract-tokens-options-title"
        }
        active={selectedTab === ContractOptionsTitle.Tokens}
        tab={ContractOptionsTitle.Tokens}
        setSelectedTab={setSelectedTab}
      />
    </div>
  );
}

const onOptionsClick = (
  setSelectedTab: Dispatch<SetStateAction<ContractOptionsTitle>>,
  itemClicked: ContractOptionsTitle
) => {
  switch (itemClicked) {
    case ContractOptionsTitle.Transactions:
      setSelectedTab(ContractOptionsTitle.Transactions);
      break;
    case ContractOptionsTitle.Tokens:
      setSelectedTab(ContractOptionsTitle.Tokens);
      break;
    case ContractOptionsTitle.Code:
    default:
      setSelectedTab(ContractOptionsTitle.Code);
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
  tab: ContractOptionsTitle;
  setSelectedTab: Dispatch<SetStateAction<ContractOptionsTitle>>;
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
