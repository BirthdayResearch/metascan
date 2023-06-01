import { Dispatch, SetStateAction, useState } from "react";
import { FiCopy } from "react-icons/fi";
import useWindowDimensions from "hooks/useWindowDimensions";
import { truncateTextFromMiddle } from "shared/textHelper";
import { TransactionType } from "@api/types";

import NumericFormat from "@components/commons/NumericFormat";
import LinkText from "@components/commons/LinkText";
import Tooltip from "@components/commons/Tooltip";
import { InfoIcon } from "@components/icons/InfoIcon";
import { GreenTickIcon } from "@components/icons/GreenTickIcon";
import BoldedTitle from "./BoldedTitle";

interface Props {
  gasPrice: {
    value: string;
    symbol: string;
  };
  gasLimit: string;
  gasUsed: string;
  gasUsedPercentage: string;
  from: string;
  to: string | null;
  transactionType: TransactionType;
}

export default function GasDetails({
  gasPrice,
  gasLimit,
  gasUsed,
  gasUsedPercentage,
  from,
  to,
  transactionType,
}: Props) {
  const [isFromAddressCopied, setIsFromAddressCopied] = useState(false);
  const [isToAddressCopied, setIsToAddressCopied] = useState(false);
  const windowDimension = useWindowDimensions().width;

  const COPY_SUCCESS = "Copied!";
  const sleep = (ms: number) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  const onCopyAddressIconClick = async (
    onTextClick: Dispatch<SetStateAction<boolean>>,
    address: string
  ) => {
    onTextClick(true);
    navigator.clipboard.writeText(address);
    await sleep(2000);
    onTextClick(false);
  };

  return (
    <div className="grid grid-rows-4 lg:grid-cols-6 md:grid-cols-4 lg:gap-x-0 gap-x-5">
      <div>
        <BoldedTitle
          title="Gas detail"
          testId="desktop-transaction-gas-detail-title"
        />
      </div>
      <div className="row-start-2 col-start-1">
        <div className="flex flex-row items-center grow">
          <div
            data-testid="desktop-transaction-gas-price-title"
            className="text-white-700 tracking-[0.01em]"
          >
            Gas price
          </div>
          <Tooltip text="Gas price">
            <InfoIcon
              data-testid="desktop-transaction-gas-price-icon"
              className="ml-[9.33px] mr-[8.67px]"
            />
          </Tooltip>
        </div>
      </div>
      <div className="row-start-2 col-start-2 lg:col-span-2">
        <div className="flex">
          <NumericFormat
            data-testid="desktop-transaction-gas-price"
            className="text-white-50 whitespace-normal tracking-[0.01em]"
            thousandSeparator
            value={gasPrice.value}
            decimalScale={0}
            suffix={` ${gasPrice.symbol}`}
          />
        </div>
      </div>
      <div className="row-start-3 col-start-1">
        <div className="flex flex-row items-center grow">
          <div
            data-testid="desktop-transaction-gas-limit-title"
            className="text-white-700 tracking-[0.01em]"
          >
            Gas limit
          </div>
          <Tooltip text="Gas limit">
            <InfoIcon
              data-testid="desktop-transaction-gas-limit-icon"
              className="ml-[9.33px] mr-[8.67px]"
            />
          </Tooltip>
        </div>
      </div>
      <div className="row-start-3 col-start-2 lg:col-span-2">
        <div className="text-white-50 tracking-[0.01em] whitespace-normal">
          <NumericFormat
            data-testid="desktop-transaction-gas-limit"
            thousandSeparator
            value={gasLimit}
            decimalScale={0}
          />
        </div>
      </div>
      <div className="row-start-4 col-start-1">
        <div className="flex flex-row items-center grow">
          <div
            data-testid="desktop-transaction-gas-used-title"
            className="text-white-700 w-[101px] tracking-[0.01em]"
          >
            Gas used by transaction
          </div>
          <Tooltip text="Gas used by transaction">
            <InfoIcon
              data-testid="desktop-transaction-gas-used-icon"
              className="ml-[9.33px] mr-[8.67px]"
            />
          </Tooltip>
        </div>
      </div>
      <div className="row-start-4 col-start-2 lg:col-span-2">
        <div className="flex flex-col">
          <NumericFormat
            data-testid="desktop-transaction-gas-used"
            className="text-white-50 tracking-[0.01em] whitespace-normal"
            thousandSeparator
            value={gasUsed}
            decimalScale={0}
          />
          <NumericFormat
            data-testid="desktop-transaction-gas-used-percentage"
            className="text-white-700 tracking-[0.02em] text-xs mt-1"
            thousandSeparator
            value={gasUsedPercentage}
            decimalScale={2}
            suffix="%"
          />
        </div>
      </div>
      {/* TODO: finalize transaction type (all "Tokenized") */}
      {transactionType === TransactionType.Tokenized && (
        <div className="lg:col-start-4 col-start-3 row-start-1 col-span-2">
          <BoldedTitle
            title="Token transferred"
            testId="desktop-transaction-token-transferred-title"
          />
        </div>
      )}
      {transactionType === TransactionType.Tokenized && (
        <div className="lg:col-start-4 col-start-3 row-start-2">
          <div
            data-testid="desktop-transaction-token-transferred-from-title"
            className="text-white-700 tracking-[0.01em]"
          >
            From
          </div>
        </div>
      )}
      {transactionType === TransactionType.Tokenized && (
        <div className="lg:col-span-2 lg:col-start-5 col-start-4 row-start-2 ">
          {isFromAddressCopied ? (
            <div className="flex flex-row items-center gap-x-2.5">
              <LinkText
                testId="desktop-transaction-token-transferred-from-copied"
                label={COPY_SUCCESS}
                href={`/address/${from}`}
              />
              <GreenTickIcon data-testid="desktop-transaction-token-transferred-from-green-tick-icon" />
            </div>
          ) : (
            <div className="flex flex-row items-center gap-x-2.5">
              <LinkText
                customStyle="tracking-[0.01em]"
                testId="desktop-transaction-token-transferred-from"
                label={truncateTextFromMiddle(
                  from,
                  windowDimension <= 1280 ? 4 : 11
                )}
                href={`/address/${from}`}
              />
              <FiCopy
                role="button"
                data-testid="desktop-transaction-token-transferred-from-copy-icon"
                onClick={() =>
                  onCopyAddressIconClick(setIsFromAddressCopied, from)
                }
                className="text-white-50"
              />
            </div>
          )}
        </div>
      )}
      {transactionType === TransactionType.Tokenized && to && (
        <div className="lg:col-start-4 col-start-3 row-start-3">
          <div
            data-testid="desktop-transaction-token-transferred-to-title"
            className="text-white-700 tracking-[0.01em]"
          >
            To
          </div>
        </div>
      )}
      {transactionType === TransactionType.Tokenized && to && (
        <div className="lg:col-start-5 col-start-4 row-start-3 lg:col-span-2">
          {isToAddressCopied ? (
            <div className="flex flex-row items-center gap-x-2.5">
              <LinkText
                testId="desktop-transaction-token-transferred-to-copied"
                label={COPY_SUCCESS}
                href={`/address/${to}`}
              />
              <GreenTickIcon data-testid="desktop-transaction-token-transferred-to-green-tick-icon" />
            </div>
          ) : (
            <div className="flex flex-row items-center gap-x-2.5">
              <LinkText
                testId="desktop-transaction-token-transferred-to"
                label={truncateTextFromMiddle(
                  to,
                  windowDimension <= 1280 ? 4 : 11
                )}
                href={`/address/${to}`}
              />
              <FiCopy
                role="button"
                data-testid="transaction-token-transferred-to-copy-icon"
                onClick={() => onCopyAddressIconClick(setIsToAddressCopied, to)}
                className="text-white-50 h-[22px]"
              />
            </div>
          )}
        </div>
      )}
      {transactionType === TransactionType.Tokenized && (
        <div className="lg:col-start-4 col-start-3 row-start-4">
          <div
            data-testid="desktop-transaction-token-transferred-for-title"
            className="text-white-700 tracking-[0.01em]"
          >
            For
          </div>
        </div>
      )}

      {/* Commented because we have no token txs for now
     {type === TransactionType.Tokenized && (
      <div className="lg:col-start-5 col-start-4 row-start-4 col-span-2">
        <NumericFormat
          data-testid="desktop-transaction-token-transferred-for"
          className="text-white-50 tracking-[0.01em] whitespace-normal"
          thousandSeparator
          value={forToken.value}
          decimalScale={8}
          suffix={` ${forToken.symbol}`}
        />
      </div>
    )} */}
    </div>
  );
}
