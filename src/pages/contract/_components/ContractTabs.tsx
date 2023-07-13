import clsx from "clsx";
import { AddressContractTabsTitle } from "enum/tabsTitle";
import { Dispatch, SetStateAction } from "react";

interface ContractOptionsProps {
  selectedTab: AddressContractTabsTitle;
  tokenCount: number;
  setSelectedTab: Dispatch<SetStateAction<AddressContractTabsTitle>>;
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
          active ? "text-white-50" : "text-white-700"
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

export default function ContractTabs({
  selectedTab,
  tokenCount,
  setSelectedTab,
}: ContractOptionsProps) {
  return (
    <div className="flex flex-row gap-x-8">
      <ButtonTab
        testId={
          selectedTab === AddressContractTabsTitle.Transactions
            ? "contract-transaction-options-clicked-title"
            : "contract-transaction-options-title"
        }
        active={selectedTab === AddressContractTabsTitle.Transactions}
        tab={AddressContractTabsTitle.Transactions}
        setSelectedTab={setSelectedTab}
      />
      <ButtonTab
        testId={
          selectedTab === AddressContractTabsTitle.Contract
            ? "contract-code-options-clicked-title"
            : "contract-code-options-title"
        }
        active={selectedTab === AddressContractTabsTitle.Contract}
        tab={AddressContractTabsTitle.Contract}
        setSelectedTab={setSelectedTab}
      />
      <ButtonTab
        testId={
          selectedTab === AddressContractTabsTitle.Tokens
            ? "contract-tokens-options-clicked-title"
            : "contract-tokens-options-title"
        }
        active={selectedTab === AddressContractTabsTitle.Tokens}
        tab={AddressContractTabsTitle.Tokens}
        setSelectedTab={setSelectedTab}
      >
        {selectedTab === AddressContractTabsTitle.Tokens && (
          <div className="ml-2 bg-lightBlue text-xs font-semibold rounded-full min-h-[24px] min-w-[24px] flex justify-center px-1.5 items-center">
            {tokenCount}
          </div>
        )}
      </ButtonTab>
    </div>
  );
}
