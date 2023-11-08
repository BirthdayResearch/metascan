import { AddressType } from "@components/types";
import clsx from "clsx";
import { AddressContractTabsTitle } from "enum/tabsTitle";
import { Dispatch, SetStateAction, PropsWithChildren } from "react";

interface ContractOptionsProps {
  selectedTab: AddressContractTabsTitle;
  tokenCount: number;
  setSelectedTab: Dispatch<SetStateAction<AddressContractTabsTitle>>;
  addressType: AddressType;
}

const getTabsByAddressType = (addressType: AddressType) => {
  switch (addressType) {
    case AddressType.TokenContract:
      return [
        { title: AddressContractTabsTitle.Transactions },
        { title: AddressContractTabsTitle.Logs },
        { title: AddressContractTabsTitle.Contract },
      ];
    case AddressType.Contract:
      return [
        { title: AddressContractTabsTitle.Transactions },
        { title: AddressContractTabsTitle.Contract },
        { title: AddressContractTabsTitle.Tokens },
      ];
    case AddressType.Token:
      return [
        { title: AddressContractTabsTitle.TokenTransfers },
        { title: AddressContractTabsTitle.TokenHolders },
      ];
    case AddressType.Wallet:
    default:
      return [{ title: AddressContractTabsTitle.Transactions }];
  }
};

export default function ListTabs({
  selectedTab,
  tokenCount,
  setSelectedTab,
  addressType,
}: ContractOptionsProps) {
  const tabs = getTabsByAddressType(addressType);

  return (
    <div className="flex flex-row gap-x-8">
      {tabs.map(({ title }) => (
        <ButtonTab
          key={title}
          testId={
            selectedTab === title
              ? `contract-${title}-clicked-title`
              : `contract-${title}-title`
          }
          active={selectedTab === title}
          tab={title}
          setSelectedTab={setSelectedTab}
        >
          {selectedTab === AddressContractTabsTitle.Tokens &&
            selectedTab === title &&
            tokenCount > 0 && <TokenCounterBadge tokenCount={tokenCount} />}
        </ButtonTab>
      ))}
    </div>
  );
}

function ButtonTab({
  active,
  tab,
  setSelectedTab,
  testId,
  children,
}: PropsWithChildren<{
  active: boolean;
  tab: AddressContractTabsTitle;
  setSelectedTab: Dispatch<SetStateAction<AddressContractTabsTitle>>;
  testId?: string;
}>): JSX.Element {
  return (
    <div>
      <button
        type="button"
        className={clsx(
          "font-medium",
          active ? "text-white-50" : "text-white-700",
        )}
        data-testid={testId}
        onClick={() => setSelectedTab(tab)}
      >
        <div className="flex flex-row">
          {tab}
          {children}
        </div>
      </button>
      {active && <div className="brand-gradient-1 h-1 mt-3" />}
    </div>
  );
}

function TokenCounterBadge({ tokenCount }: { tokenCount: number }) {
  return (
    <div className="ml-2 bg-lightBlue text-xs font-semibold rounded-full min-h-[24px] min-w-[24px] flex justify-center px-1.5 items-center">
      {tokenCount}
    </div>
  );
}
