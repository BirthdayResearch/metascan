import { Dispatch, SetStateAction } from "react";

interface ContractOptionsProps {
  selectedTab: ContractOptionsTitle;
  setSelectedTab: Dispatch<SetStateAction<ContractOptionsTitle>>;
}

export default function ContractOptions({
  selectedTab,
  setSelectedTab,
}: ContractOptionsProps) {
  return (
    <div className="flex flex-row gap-x-4 md:pt-[3.67px] pt-[19.67px]">
      {selectedTab === ContractOptionsTitle.Code ? (
        <div>
          <button
            type="button"
            className="text-white-50 font-medium"
            data-testid="contract-code-options-clicked-title"
            onClick={() =>
              onOptionsClick(setSelectedTab, ContractOptionsTitle.Code)
            }
          >
            {ContractOptionsTitle.Code}
          </button>
          <div className="brand-gradient-1 h-1 mt-[19.33px]" />
        </div>
      ) : (
        <div>
          <button
            type="button"
            className="text-white-700 font-medium"
            data-testid="contract-code-options-title"
            onClick={() =>
              onOptionsClick(setSelectedTab, ContractOptionsTitle.Code)
            }
          >
            {ContractOptionsTitle.Code}
          </button>
        </div>
      )}
      {selectedTab === ContractOptionsTitle.Transactions ? (
        <div>
          <button
            type="button"
            className="text-white-50 font-medium"
            data-testid="contract-transactions-options-clicked-title"
            onClick={() =>
              onOptionsClick(setSelectedTab, ContractOptionsTitle.Transactions)
            }
          >
            {ContractOptionsTitle.Transactions}
          </button>
          <div className="brand-gradient-1 h-1 mt-[19.33px]" />
        </div>
      ) : (
        <div>
          <button
            type="button"
            className="text-white-700 font-medium"
            data-testid="contract-transactions-options-title"
            onClick={() =>
              onOptionsClick(setSelectedTab, ContractOptionsTitle.Transactions)
            }
          >
            {ContractOptionsTitle.Transactions}
          </button>
        </div>
      )}
      {selectedTab === ContractOptionsTitle.Tokens ? (
        <div>
          <button
            type="button"
            className="text-white-50 font-medium"
            data-testid="contract-token-options-clicked-title"
            onClick={() =>
              onOptionsClick(setSelectedTab, ContractOptionsTitle.Tokens)
            }
          >
            {ContractOptionsTitle.Tokens}
          </button>
          <div className="brand-gradient-1 h-1 mt-[19.33px]" />
        </div>
      ) : (
        <div>
          <button
            type="button"
            className="text-white-700 font-medium"
            data-testid="contract-token-options-title"
            onClick={() =>
              onOptionsClick(setSelectedTab, ContractOptionsTitle.Tokens)
            }
          >
            {ContractOptionsTitle.Tokens}
          </button>
        </div>
      )}
    </div>
  );
}

const onOptionsClick = (
  setSelectedTab: Dispatch<SetStateAction<ContractOptionsTitle>>,
  itemClicked: ContractOptionsTitle
) => {
  switch (itemClicked) {
    case ContractOptionsTitle.Code:
      setSelectedTab(ContractOptionsTitle.Code);
      break;
    case ContractOptionsTitle.Transactions:
      setSelectedTab(ContractOptionsTitle.Transactions);
      break;
    case ContractOptionsTitle.Tokens:
      setSelectedTab(ContractOptionsTitle.Tokens);
      break;
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
