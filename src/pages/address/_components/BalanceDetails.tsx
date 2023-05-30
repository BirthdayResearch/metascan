import { useRef, useState, Dispatch, SetStateAction } from "react";
import { useOutsideAlerter } from "@hooks/useOutsideAlerter";
import NumericFormat from "@components/commons/NumericFormat";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { walletAddressData } from "mockdata/WalletAddressData";
import TokenSearchDropDown from "@components/commons/TokenSearchDropDown";

export default function BalanceDetails() {
  const [isTokenIconClicked, setIsTokenIconClicked] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setIsTokenIconClicked);

  const onTokenDropDownIconClick = (
    setIsTokenIconDropdownClicked: Dispatch<SetStateAction<boolean>>,
    isTokenClicked: boolean
  ) => {
    if (isTokenClicked) {
      setIsTokenIconDropdownClicked(false);
    } else {
      setIsTokenIconDropdownClicked(true);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row md:flex-row gap-y-6 lg:gap-x-[109px] md:gap-x-[76px] mt-11 mb-[53px]">
      <div className="flex flex-col gap-y-2">
        <div
          data-testid="wallet-networth-title"
          className="text-white-700 tracking-[0.005em] text-sm"
        >
          Net worth
        </div>
        <NumericFormat
          data-testid="wallet-networth"
          className="text-white-50 text-2xl font-bold"
          value={walletAddressData.networth.toString()}
          thousandSeparator
          decimalScale={2}
          prefix="$"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <div
          data-testid="wallet-dmctx-balance-title"
          className="text-white-700 tracking-[0.005em] text-sm"
        >
          DMCTx Balance
        </div>
        <NumericFormat
          data-testid="wallet-dmctx-balance-dollar-value"
          className="text-white-50 text-2xl font-bold"
          thousandSeparator
          value={walletAddressData.dmctxBalance.dollarValue.toString()}
          decimalScale={2}
          prefix="$"
        />
        <NumericFormat
          data-testid="wallet-dmctx-balance-value"
          className="text-white-700 tracking-[0.05em]"
          thousandSeparator
          value={walletAddressData.dmctxBalance.value.toString()}
          decimalScale={8}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <div
          data-testid="wallet-other-tokens-title"
          className="text-white-700 text-sm tracking-[0.005em]"
        >
          Other tokens
        </div>
        <NumericFormat
          data-testid="wallet-other-tokens-dollar-value"
          className="text-white-50 text-2xl font-bold"
          thousandSeparator
          value={walletAddressData.otherTokens.value.toString()}
          decimalScale={2}
          prefix="$"
        />
        <div ref={wrapperRef} className="relative">
          <div
            role="button"
            tabIndex={0}
            onKeyDown={() =>
              onTokenDropDownIconClick(
                setIsTokenIconClicked,
                isTokenIconClicked
              )
            }
            onClick={() =>
              onTokenDropDownIconClick(
                setIsTokenIconClicked,
                isTokenIconClicked
              )
            }
            className="flex flex-row items-center gap-x-[10.29px]"
          >
            <div
              data-testid="wallet-other-tokens"
              className="text-white-700 tracking-[0.005em]"
            >
              {walletAddressData.otherTokens.allTokens.length} Tokens
            </div>
            {isTokenIconClicked ? (
              <FiChevronDown
                data-testid="wallet-other-tokens-dropdown-icon"
                size={24}
                className="text-white-700"
              />
            ) : (
              <FiChevronUp
                data-testid="wallet-other-tokens-up-icon"
                size={24}
                className="text-white-700"
              />
            )}
          </div>
          {isTokenIconClicked && (
            <TokenSearchDropDown
              data-testid="wallet-other-tokens-dropdown"
              addressTokens={walletAddressData.otherTokens.allTokens}
            />
          )}
        </div>
      </div>
    </div>
  );
}
