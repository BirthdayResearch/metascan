import clsx from "clsx";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  RawTransactionI,
  WalletAddressCounterI,
  WalletAddressInfoI,
} from "@api/types";
import { useOutsideAlerter } from "@hooks/useOutsideAlerter";
import LinkText from "@components/commons/LinkText";
import NumericFormat from "@components/commons/NumericFormat";
import TokenSearchDropDown from "@components/commons/TokenSearchDropDown";
import { TxnNextPageParamsProps } from "@api/TransactionsApi";
import { DFI_TOKEN_SYMBOL } from "shared/constants";
import DetailRowTitle from "./shared/DetailRowTitle";

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
  walletDetail: WalletAddressInfoI;
  counters: WalletAddressCounterI;
  tokens: WalletDetailTokenI | null;
  addressTransactions: AddressTransactionsProps;
  isLoading?: boolean;
}

export default function WalletDetails({
  detail,
}: {
  detail: WalletDetailProps;
}) {
  const { walletDetail, counters } = detail;
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

  // Token Contract (TODO: combine this part with contract)
  const isTokenAddress = walletDetail.token !== null;

  return (
    <div
      className={clsx(
        "grid gap-x-5 gap-y-5",
        "md:grid md:grid-cols-2",
        "lg:grid-cols-3"
      )}
    >
      {isTokenAddress && (
        <div className="flex flex-col gap-y-1">
          <DetailRowTitle title="Token" />
          <div className="">
            <LinkText
              href={`/token/${walletDetail.token.address}`}
              label={walletDetail.token.name}
            />
            <span className="text-sm text-white-700 ml-1">
              {walletDetail.token.symbol
                ? `(${walletDetail.token.symbol})`
                : ""}
            </span>
          </div>
        </div>
      )}
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
            suffix={` ${DFI_TOKEN_SYMBOL}`}
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

      {isTokenAddress && (
        <div className="flex flex-col gap-y-1">
          <DetailRowTitle title="Tokens" />
          <NumericFormat
            className="text-white-50 tracking-[0.01em]"
            thousandSeparator
            value={1} // TODO (lyka): add total num of tokens
            decimalScale={0}
            suffix={` tokens`}
            data-testid="token-contract-tokens-count"
          />
        </div>
      )}
      <div className="flex flex-col gap-y-1">
        <DetailRowTitle title="Transactions" />
        <NumericFormat
          className="text-white-50 tracking-[0.01em]"
          thousandSeparator
          value={counters.transactions_count ?? 0}
          decimalScale={0}
          suffix={` transactions`}
          data-testid="token-contract-txs-count"
        />
      </div>
      {isTokenAddress && (
        <>
          <div className="flex flex-col gap-y-1">
            <DetailRowTitle title="Transfers" />
            <NumericFormat
              className="text-white-50 tracking-[0.01em]"
              thousandSeparator
              value={counters.token_transfers_count ?? 0}
              decimalScale={0}
              suffix={` transfers`}
              data-testid="token-contract-transfers-count"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <DetailRowTitle title="Gas used" />
            <NumericFormat
              className="text-white-50 tracking-[0.01em]"
              thousandSeparator
              value={counters.gas_usage_count ?? 0}
              decimalScale={0}
              data-testid="token-contract-gas-used"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <DetailRowTitle title="Last updated" />
            <LinkText
              href={`/block/${detail.walletDetail.block_number_balance_updated_at}`}
              label={`Block #${detail.walletDetail.block_number_balance_updated_at}`}
            />
          </div>
        </>
      )}
    </div>
  );
}
