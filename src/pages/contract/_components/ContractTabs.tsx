import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { ContractTabsTitle } from "../../../enum/contractTabsTitle";

interface ContractOptionsProps {
  selectedTab: ContractTabsTitle;
  setSelectedTab: Dispatch<SetStateAction<ContractTabsTitle>>;
  isTokenContract: boolean;
}

export default function ContractTabs({
  selectedTab,
  setSelectedTab,
  isTokenContract,
}: ContractOptionsProps) {
  const contractTabs = [
    { title: ContractTabsTitle.Transactions },
    { title: ContractTabsTitle.Contract },
    { title: ContractTabsTitle.Tokens },
  ];
  const tokenContractTabs = [
    { title: ContractTabsTitle.Transactions },
    { title: ContractTabsTitle.Logs },
    { title: ContractTabsTitle.Contract },
  ];
  const tabs = isTokenContract ? tokenContractTabs : contractTabs;
  return (
    <div className="flex flex-row gap-x-4">
      {tabs.map(({ title }) => (
        <ButtonTab
          key={title}
          testId={
            selectedTab === ContractTabsTitle.Transactions
              ? `contract-${title}-clicked-title`
              : `contract-${title}-title`
          }
          active={selectedTab === title}
          tab={title}
          setSelectedTab={setSelectedTab}
        />
      ))}
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
