import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useUnitSuffix } from "hooks/useUnitSuffix";
import { RawTransactionI } from "@api/types";
import { useOutsideAlerter } from "@hooks/useOutsideAlerter";
import NumericFormat from "@components/commons/NumericFormat";
import TokenSearchDropDown from "@components/commons/TokenSearchDropDown";
import { TxnNextPageParamsProps } from "@api/TransactionsApi";

export interface WalletDetailTokenI {
  value: number;
  allTokens: {
    value: number;
    symbol: string;
  }[];
}

export interface AddressTransactionsProps {
  transactions: RawTransactionI[];
  nextPageParams: TxnNextPageParamsProps;
}

export interface WalletDetailProps {
  balance: string;
  transactionCount: string;
  tokens: WalletDetailTokenI | null;
  addressTransactions: AddressTransactionsProps;
}

export default function WalletDetails({
  detail,
}: {
  detail: WalletDetailProps;
}) {
  const [isTokenDropDownIconClicked, setIsTokenDropDownIconClicked] =
    useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setIsTokenDropDownIconClicked);

  const onTokenDropDownIconClick = (
    setIsTokenIconClicked: Dispatch<SetStateAction<boolean>>,
    isTokenIconClicked: boolean
  ) => {
    if (isTokenIconClicked) {
      setIsTokenIconClicked(false);
    } else {
      setIsTokenIconClicked(true);
    }
  };

  return (
    <div className="flex lg:flex-row md:flex-col flex-col gap-y-4 lg:gap-x-5">
      <div className="flex flex-col lg:flex-row md:flex-row gap-y-4 lg:gap-x-5">
        <div className="flex flex-col gap-y-1 lg:min-w-[265px] md:min-w-[294px]">
          <div
            data-testid="wallet-balance-title"
            className="text-white-700 tracking-[0.01em]"
          >
            Balance
          </div>
          <NumericFormat
            className="text-white-50 tracking-[0.01em] break-all"
            thousandSeparator
            value={detail.balance}
            decimalScale={8}
            data-testid="wallet-balance-value"
          />
        </div>
        {/* hides token field for now */}
        {detail.tokens !== null && (
          <div className="flex flex-col gap-y-1 lg:w-[265px] md:w-[294px]">
            <div
              data-testid="wallet-tokens-title"
              className="text-white-700 tracking-[0.01em]"
            >
              Tokens
            </div>
            <div ref={wrapperRef} className="relative">
              <div
                role="button"
                tabIndex={0}
                onKeyDown={() =>
                  onTokenDropDownIconClick(
                    setIsTokenDropDownIconClicked,
                    isTokenDropDownIconClicked
                  )
                }
                onClick={() =>
                  onTokenDropDownIconClick(
                    setIsTokenDropDownIconClicked,
                    isTokenDropDownIconClicked
                  )
                }
                className="flex flex-row items-center"
              >
                <div className="text-white-50 tracking-[0.01em] mr-[10px]">
                  {detail.tokens.allTokens.length} Tokens
                </div>
                <div>
                  {isTokenDropDownIconClicked ? (
                    <FiChevronDown
                      data-testid="wallet-tokens-dropdown-icon"
                      size={24}
                      className="text-white-700"
                    />
                  ) : (
                    <FiChevronUp
                      data-testid="wallet-tokens-up-icon"
                      size={24}
                      className="text-white-700"
                    />
                  )}
                </div>
                <div>
                  <NumericFormat
                    className="text-white-700 ml-[14px] tracking-[0.01em]"
                    value={detail.tokens.value.toString()}
                    thousandSeparator
                    decimalScale={2}
                    suffix=")"
                    prefix="($"
                    data-testid="wallet-tokens-value"
                  />
                </div>
              </div>
              {isTokenDropDownIconClicked && (
                <TokenSearchDropDown
                  data-testid="wallet-token-search-dropdown"
                  addressTokens={detail.tokens.allTokens}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-1 lg:w-[265px] md:w-[294px]">
        <div
          data-testid="wallet-transactions-title"
          className="text-white-700 tracking-[0.01em]"
        >
          Transactions
        </div>
        <div
          data-testid="wallet-transactions-value"
          className="text-white-50 tracking-[0.01em]"
        >
          {useUnitSuffix(detail.transactionCount)}
        </div>
      </div>
    </div>
  );
}
