import useWindowDimensions from "hooks/useWindowDimensions";
import { truncateTextFromMiddle } from "shared/textHelper";
import { TransactionType } from "@api/types";

import NumericFormat from "@components/commons/NumericFormat";
import LinkText from "@components/commons/LinkText";
import DetailRow from "@components/commons/DetailRow";
import clsx from "clsx";
import BoldedTitle from "./BoldedTitle";
import WithCopy from "./WithCopy";

interface Props {
  gasPrice: {
    value: string;
    symbol: string;
  };
  gasLimit: string;
  gasUsed: string;
  gasUsedPercentage: string;
  nonce: number;
  position: number;
  from: string;
  to: string | null;
  transactionType: TransactionType;
}

export default function GasDetails({
  gasPrice,
  gasLimit,
  gasUsed,
  gasUsedPercentage,
  nonce,
  position,
  from,
  to,
  transactionType,
}: Props) {
  const windowDimension = useWindowDimensions().width;
  const rowValueFont = "text-white-50 whitespace-normal tracking-[0.01em]";

  return (
    <>
      <div
        className={clsx(
          "border-b border-black-600",
          "mt-9 mb-6",
          "md:mt-[58px] md:mb-9",
          "lg:mt-[38px] lg:mb-11"
        )}
      />
      <div>
        <BoldedTitle title="Gas detail" testId="gas-detail-title" />
        <div className="flex flex-col gap-y-4 mt-[22px] md:mt-[30px]">
          <DetailRow
            label="Gas price"
            tooltip="Cost per unit of gas specified for the transaction"
          >
            <span data-testid="gas-price" className={rowValueFont}>
              {gasPrice.value} {gasPrice.symbol}
            </span>
          </DetailRow>
          <DetailRow
            label="Gas limit"
            tooltip="Maximum amount of gas allocated for the transaction"
          >
            <NumericFormat
              data-testid="gas-limit"
              className={rowValueFont}
              thousandSeparator
              value={gasLimit}
              decimalScale={0}
            />
          </DetailRow>
          <DetailRow
            label="Gas used by txn"
            tooltip="Amount of gas actually used"
          >
            <div className="flex flex-col">
              <NumericFormat
                data-testid="gas-used"
                className={rowValueFont}
                thousandSeparator
                value={gasUsed}
                decimalScale={0}
              />
              <NumericFormat
                data-testid="gas-used-percentage"
                className="text-white-700 tracking-[0.02em] text-xs mt-1"
                thousandSeparator
                value={gasUsedPercentage}
                decimalScale={2}
                suffix="%"
              />
            </div>
          </DetailRow>
          <DetailRow
            label="Nonce"
            tooltip="Number of transaction sent from the sender’s address"
          >
            <NumericFormat
              data-testid="nonce"
              className={rowValueFont}
              thousandSeparator
              value={nonce}
              decimalScale={0}
            />
          </DetailRow>
          <DetailRow
            label="Position in block"
            tooltip="The position refers to the index number assigned to a transaction within a block on the blockchain"
          >
            <NumericFormat
              data-testid="position"
              className={rowValueFont}
              thousandSeparator
              value={position}
              decimalScale={0}
            />
          </DetailRow>
        </div>
      </div>

      {/* TODO: finalize transaction type (all "Tokenized") */}
      {transactionType === TransactionType.Tokenized && (
        <div className="lg:col-start-4 col-start-3 row-start-1 col-span-2">
          <BoldedTitle
            title="Token transferred"
            testId="token-transferred-title"
          />
        </div>
      )}
      {transactionType === TransactionType.Tokenized && (
        <div className="lg:col-start-4 col-start-3 row-start-2">
          <div
            data-testid="token-transferred-from-title"
            className="text-white-700 tracking-[0.01em]"
          >
            From
          </div>
        </div>
      )}
      {transactionType === TransactionType.Tokenized && (
        <div className="lg:col-span-2 lg:col-start-5 col-start-4 row-start-2 ">
          <WithCopy textToCopy={from} testId="token-from" copyIconStyle="mb-1">
            <LinkText
              customStyle="tracking-[0.01em]"
              testId="token-transferred-from"
              label={truncateTextFromMiddle(
                from,
                windowDimension <= 1280 ? 4 : 11
              )}
              href={`/address/${from}`}
            />
          </WithCopy>
        </div>
      )}
      {transactionType === TransactionType.Tokenized && to && (
        <div className="lg:col-start-4 col-start-3 row-start-3">
          <div
            data-testid="token-transferred-to-title"
            className="text-white-700 tracking-[0.01em]"
          >
            To
          </div>
        </div>
      )}
      {transactionType === TransactionType.Tokenized && to && (
        <div className="lg:col-start-5 col-start-4 row-start-3 lg:col-span-2">
          <WithCopy textToCopy={to} testId="token-to" copyIconStyle="mb-1">
            <LinkText
              testId="token-transferred-to"
              label={truncateTextFromMiddle(
                to,
                windowDimension <= 1280 ? 4 : 11
              )}
              href={`/address/${to}`}
            />
          </WithCopy>
        </div>
      )}
      {transactionType === TransactionType.Tokenized && (
        <div className="lg:col-start-4 col-start-3 row-start-4">
          <div
            data-testid="token-transferred-for-title"
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
          data-testid="token-transferred-for"
          className="text-white-50 tracking-[0.01em] whitespace-normal"
          thousandSeparator
          value={forToken.value}
          decimalScale={8}
          suffix={` ${forToken.symbol}`}
        />
      </div>
    )} */}
    </>
  );
}
