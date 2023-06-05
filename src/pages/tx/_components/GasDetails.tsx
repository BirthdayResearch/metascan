import useWindowDimensions from "hooks/useWindowDimensions";
import { truncateTextFromMiddle } from "shared/textHelper";
import { TransactionType } from "@api/types";

import NumericFormat from "@components/commons/NumericFormat";
import LinkText from "@components/commons/LinkText";
import Tooltip from "@components/commons/Tooltip";
import { InfoIcon } from "@components/icons/InfoIcon";
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
  from,
  to,
  transactionType,
}: Props) {
  const windowDimension = useWindowDimensions().width;
  const rowValueFont = "text-white-50 whitespace-normal tracking-[0.01em]";

  return (
    <>
      <div>
        <BoldedTitle title="Gas detail" testId="gas-detail-title" />
        <div className="flex flex-col gap-y-4 mt-[22px] md:mt-[30px]">
          <DetailRow label="Gas price" tooltip="Gas price">
            <NumericFormat
              data-testid="gas-price"
              className={rowValueFont}
              thousandSeparator
              value={gasPrice.value}
              decimalScale={0}
              suffix={` ${gasPrice.symbol}`}
            />
          </DetailRow>
          <DetailRow label="Gas limit" tooltip="Gas limit">
            <NumericFormat
              data-testid="gas-limit"
              className={rowValueFont}
              thousandSeparator
              value={gasLimit}
              decimalScale={0}
            />
          </DetailRow>
          <DetailRow label="Gas used by txn" tooltip="Gas used by txn">
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
          <DetailRow label="Nonce" tooltip="Nonce">
            <NumericFormat
              data-testid="nonce"
              className={rowValueFont}
              thousandSeparator
              value={nonce}
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
          <WithCopy textToCopy={from} testId="token-from">
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
          <WithCopy textToCopy={to} testId="token-to">
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

function DetailRow({
  label,
  tooltip,
  children,
}: {
  label: string;
  tooltip: string;
  children: any;
}) {
  const testId = label.replaceAll(" ", "");
  return (
    <div className="flex items-start gap-8 justify-between md:justify-normal">
      <div className="flex flex-row items-center md:w-[212px]">
        <div
          data-testid={`${testId}-title`}
          className="text-white-700 tracking-[0.01em]"
        >
          {label}
        </div>
        <Tooltip text={tooltip}>
          <InfoIcon data-testid={`${testId}-icon`} className="ml-1 md:ml-2" />
        </Tooltip>
      </div>
      {children}
    </div>
  );
}
