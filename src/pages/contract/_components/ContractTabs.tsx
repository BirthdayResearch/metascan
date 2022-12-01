import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

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
      {selectedTab === ContractOptionsTitle.Code ? (
        <ButtonTab
          testId="contract-code-options-clicked-title"
          active
          tab={ContractOptionsTitle.Code}
          setSelectedTab={setSelectedTab}
        />
      ) : (
        <ButtonTab
          testId="contract-code-options-title"
          active={false}
          tab={ContractOptionsTitle.Code}
          setSelectedTab={setSelectedTab}
        />
      )}
      {selectedTab === ContractOptionsTitle.Transactions ? (
        <ButtonTab
          testId="contract-transaction-options-clicked-title"
          active
          tab={ContractOptionsTitle.Transactions}
          setSelectedTab={setSelectedTab}
        />
      ) : (
        <ButtonTab
          testId="contract-transaction-options-title"
          active={false}
          tab={ContractOptionsTitle.Transactions}
          setSelectedTab={setSelectedTab}
        />
      )}
      {selectedTab === ContractOptionsTitle.Tokens ? (
        <ButtonTab
          testId="contract-tokens-options-clicked-title"
          active
          tab={ContractOptionsTitle.Tokens}
          setSelectedTab={setSelectedTab}
        />
      ) : (
        <ButtonTab
          testId="contract-tokens-options-title"
          active={false}
          tab={ContractOptionsTitle.Tokens}
          setSelectedTab={setSelectedTab}
        />
      )}
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

enum ContractOptionsTitle {
  Code = "Code",
  Transactions = "Transactions",
  Tokens = "Tokens",
}

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
