import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { AddressContractTabsTitle } from "enum/tabsTitle";

interface ContractOptionsProps {
  selectedTab: AddressContractTabsTitle;
  setSelectedTab: Dispatch<SetStateAction<AddressContractTabsTitle>>;
  isContract: boolean;
  isTokenContract: boolean;
}

export default function AddressContractTabsMenu({
  selectedTab,
  setSelectedTab,
  isContract,
  isTokenContract,
}: ContractOptionsProps) {
  const tabs = [
    { title: AddressContractTabsTitle.Transactions },
    ...(isTokenContract ? [{ title: AddressContractTabsTitle.Logs }] : []),
    ...(isContract ? [{ title: AddressContractTabsTitle.Contract }] : []),
    ...(isContract && !isTokenContract
      ? [{ title: AddressContractTabsTitle.Tokens }]
      : []),
  ];

  /**
   * For reference, refer to below for straightforward list of tabs for each page:
   * 
    const normalAddressTabs = [{ title: AddressContractTabsTitle.Transactions }];
    const tokenAddressTabs = [
      { title: AddressContractTabsTitle.Transactions },
      { title: AddressContractTabsTitle.Logs },
    ];
    const contractTabs = [
      { title: AddressContractTabsTitle.Transactions },
      { title: AddressContractTabsTitle.Contract },
      { title: AddressContractTabsTitle.Tokens },
    ];
    const tokenContractTabs = [
      { title: AddressContractTabsTitle.Transactions },
      { title: AddressContractTabsTitle.Logs },
      { title: AddressContractTabsTitle.Contract },
    ];
  */

  return (
    <div className="flex flex-row gap-x-4">
      {tabs.map(({ title }) => (
        <ButtonTab
          key={title}
          testId={
            selectedTab === AddressContractTabsTitle.Transactions
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
  tab: AddressContractTabsTitle;
  setSelectedTab: Dispatch<SetStateAction<AddressContractTabsTitle>>;
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
