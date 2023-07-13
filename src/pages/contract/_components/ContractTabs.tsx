import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { ContractTabsTitle } from "../../../enum/contractTabsTitle";

interface ContractOptionsProps {
  selectedTab: ContractTabsTitle;
  tokenCount: number;
  setSelectedTab: Dispatch<SetStateAction<ContractTabsTitle>>;
}

function ButtonTab({
  active,
  tab,
  setSelectedTab,
  testId,
  children,
}: PropsWithChildren<{
  active: boolean;
  tab: ContractTabsTitle;
  setSelectedTab: Dispatch<SetStateAction<ContractTabsTitle>>;
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
      >
        {selectedTab === ContractTabsTitle.Tokens && (
          <div className="ml-2 bg-lightBlue text-xs font-semibold rounded-full min-h-[24px] min-w-[24px] flex justify-center px-1.5 items-center">
            {tokenCount}
          </div>
        )}
      </ButtonTab>
    </div>
  );
}
