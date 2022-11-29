import { Dispatch, SetStateAction } from "react";

interface ContractOptionsProps {
  isTransactionClicked: boolean;
  isCodeClicked: boolean;
  isTokenClicked: boolean;
  setIsTransactionClicked: Dispatch<SetStateAction<boolean>>;
  setIsCodeClicked: Dispatch<SetStateAction<boolean>>;
  setIsTokenClicked: Dispatch<SetStateAction<boolean>>;
}

export default function ContractOptions({
  isTransactionClicked,
  isCodeClicked,
  isTokenClicked,
  setIsTransactionClicked,
  setIsCodeClicked,
  setIsTokenClicked,
}: ContractOptionsProps) {
  return (
    <div className="flex flex-row gap-x-4 md:pt-[3.67px] pt-[19.67px]">
      {isCodeClicked ? (
        <div>
          <div
            className="text-white-50 font-medium"
            data-testid="contract-code-options-clicked-title"
            role="button"
            tabIndex={0}
            onKeyDown={() =>
              onOptionsClick(
                setIsTransactionClicked,
                setIsCodeClicked,
                setIsTokenClicked,
                ContractOptionsTitle.Code
              )
            }
            onClick={() =>
              onOptionsClick(
                setIsTransactionClicked,
                setIsCodeClicked,
                setIsTokenClicked,
                ContractOptionsTitle.Code
              )
            }
          >
            {ContractOptionsTitle.Code}
          </div>
          <div className="brand-gradient-1 h-1 mt-[19.33px]" />
        </div>
      ) : (
        <div>
          <div
            className="text-white-700 font-medium"
            data-testid="contract-code-options-title"
            role="button"
            tabIndex={0}
            onKeyDown={() =>
              onOptionsClick(
                setIsTransactionClicked,
                setIsCodeClicked,
                setIsTokenClicked,
                ContractOptionsTitle.Code
              )
            }
            onClick={() =>
              onOptionsClick(
                setIsTransactionClicked,
                setIsCodeClicked,
                setIsTokenClicked,
                ContractOptionsTitle.Code
              )
            }
          >
            {ContractOptionsTitle.Code}
          </div>
        </div>
      )}
      {isTransactionClicked ? (
        <div>
          <div
            className="text-white-50 font-medium"
            data-testid="contract-transactions-options-clicked-title"
            role="button"
            tabIndex={0}
            onKeyDown={() =>
              onOptionsClick(
                setIsTransactionClicked,
                setIsCodeClicked,
                setIsTokenClicked,
                ContractOptionsTitle.Transactions
              )
            }
            onClick={() =>
              onOptionsClick(
                setIsTransactionClicked,
                setIsCodeClicked,
                setIsTokenClicked,
                ContractOptionsTitle.Transactions
              )
            }
          >
            {ContractOptionsTitle.Transactions}
          </div>
          <div className="brand-gradient-1 h-1 mt-[19.33px]" />
        </div>
      ) : (
        <div>
          <div
            className="text-white-700 font-medium"
            data-testid="contract-transactions-options-title"
            role="button"
            tabIndex={0}
            onKeyDown={() =>
              onOptionsClick(
                setIsTransactionClicked,
                setIsCodeClicked,
                setIsTokenClicked,
                ContractOptionsTitle.Transactions
              )
            }
            onClick={() =>
              onOptionsClick(
                setIsTransactionClicked,
                setIsCodeClicked,
                setIsTokenClicked,
                ContractOptionsTitle.Transactions
              )
            }
          >
            {ContractOptionsTitle.Transactions}
          </div>
        </div>
      )}
      {isTokenClicked ? (
        <div>
          <div
            className="text-white-50 font-medium"
            data-testid="contract-token-options-clicked-title"
            role="button"
            tabIndex={0}
            onKeyDown={() =>
              onOptionsClick(
                setIsTransactionClicked,
                setIsCodeClicked,
                setIsTokenClicked,
                ContractOptionsTitle.Tokens
              )
            }
            onClick={() =>
              onOptionsClick(
                setIsTransactionClicked,
                setIsCodeClicked,
                setIsTokenClicked,
                ContractOptionsTitle.Tokens
              )
            }
          >
            {ContractOptionsTitle.Tokens}
          </div>
          <div className="brand-gradient-1 h-1 mt-[19.33px]" />
        </div>
      ) : (
        <div>
          <div
            className="text-white-700 font-medium"
            data-testid="contract-token-options-title"
            role="button"
            tabIndex={0}
            onKeyDown={() =>
              onOptionsClick(
                setIsTransactionClicked,
                setIsCodeClicked,
                setIsTokenClicked,
                ContractOptionsTitle.Tokens
              )
            }
            onClick={() =>
              onOptionsClick(
                setIsTransactionClicked,
                setIsCodeClicked,
                setIsTokenClicked,
                ContractOptionsTitle.Tokens
              )
            }
          >
            {ContractOptionsTitle.Tokens}
          </div>
        </div>
      )}
    </div>
  );
}

const onOptionsClick = (
  setIsTransactionClicked: Dispatch<SetStateAction<boolean>>,
  setIsCodeClicked: Dispatch<SetStateAction<boolean>>,
  setIsTokenClicked: Dispatch<SetStateAction<boolean>>,
  itemClicked: ContractOptionsTitle
) => {
  switch (itemClicked) {
    case ContractOptionsTitle.Code:
      setIsTransactionClicked(false);
      setIsTokenClicked(false);
      setIsCodeClicked(true);
      break;
    case ContractOptionsTitle.Transactions:
      setIsTransactionClicked(true);
      setIsTokenClicked(false);
      setIsCodeClicked(false);
      break;
    case ContractOptionsTitle.Tokens:
      setIsTransactionClicked(false);
      setIsTokenClicked(true);
      setIsCodeClicked(false);
      break;
    default:
      setIsTransactionClicked(false);
      setIsTokenClicked(false);
      setIsCodeClicked(true);
      break;
  }
};

enum ContractOptionsTitle {
  Code = "Code",
  Transactions = "Transactions",
  Tokens = "Tokens",
}
