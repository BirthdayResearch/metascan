import BigNumber from "bignumber.js";
import clsx from "clsx";

import { formatDateToUTC, getDuration } from "shared/durationHelper";
import { transformTransactionData } from "shared/transactionDataHelper";
import { truncateTextFromMiddle } from "shared/textHelper";
import { GWEI_SYMBOL } from "shared/constants";
import TransactionsApi from "@api/TransactionsApi";
import { TransactionI } from "@api/types";

import { SearchBar } from "layouts/components/searchbar/SearchBar";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import NumericFormat from "@components/commons/NumericFormat";
import LinkText from "@components/commons/LinkText";
import { iconMapping } from "@components/commons/TransactionRow";
import { NetworkConnection } from "@contexts/Environment";

import DetailRow from "@components/commons/DetailRow";
import TransactionRowStatus from "@components/commons/TransactionRowStatus";
import BoldedTitle from "./_components/BoldedTitle";
import RawInput from "./_components/RawInput";
import WithCopy from "./_components/WithCopy";
import GasDetails from "./_components/GasDetails";
import TokenTransferDetails from "./_components/TokenTransferDetails";
import DecodedInput from "./_components/DecodedInput";

export default function Transaction({
  txDetails,
}: {
  txDetails: TransactionI;
}) {
  const gasPrice = { value: txDetails.gasPrice, symbol: GWEI_SYMBOL };
  const gasUsedPercentage = new BigNumber(txDetails.gasUsed)
    .dividedBy(txDetails.gasLimit)
    .multipliedBy(100)
  const timeDuration = getDuration(Number(txDetails.timeInSec));
  const timeInUTC = formatDateToUTC(txDetails.timestamp);

  const Icon = iconMapping[txDetails.transactionType];
  const titleFontCss =
    "text-white-700 break-words leading-[22.4px] tracking-[0.01em] lg:leading-[24px] lg:-tracking-[0.02em] min-w-[100px]";
  const valueFontCss =
    "block break-words text-white-50 leading-[24px] -tracking-[0.02em] text-end md:text-start xs:text-start";
  const rowCss =
    "flex md:flex-col justify-between md:justify-normal gap-y-2 gap-x-1 xs:flex-col xs:gap-y-1";

  return (
    <div className="px-1 md:px-0 mt-12 antialiased">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer>
        <div className="p-5 pt-8 pb-8 md:p-10">
          <div
            className="flex flex-row lg:mb-8 mb-6"
            data-testid="transaction-details-title"
          >
            <BoldedTitle
              className="md:text-xl -tracking-[0.02em] md:tracking-[0.01em]"
              title="Transaction details"
            />
          </div>
          <div>
            <span
              data-testid="tx-hash"
              className="text-white-50 text-lg md:text-2xl font-semibold md:leading-9 break-all -tracking-[0.02em] md:tracking-normal"
            >
              {txDetails.hash}
            </span>
            <WithCopy
              textToCopy={txDetails.hash}
              testId="transaction-id"
              copyIconStyle="md:mb-1"
              successCopyStyle="ml-2"
            />
          </div>
          <div
            data-testid="transaction-timestamp"
            className="text-white-700 mt-1 -tracking-[0.02em]"
          >
            {`${timeDuration} ago (${timeInUTC} +UTC)`}
          </div>

          <div className="flex flex-col md:grid md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-3 md:gap-y-8 mt-9 lg:mt-[30px]">
            {/* Block */}
            <div className={rowCss}>
              <div
                data-testid="transaction-block-title"
                className="text-white-700 tracking-[0.01em]"
              >
                Block
              </div>
              <div className="flex flex-row gap-x-2.5 items-center">
                <LinkText
                  customStyle="tracking-[0.01em]"
                  testId="transaction-block"
                  label={txDetails.blockNumber}
                  href={`/block/${txDetails.blockNumber}`}
                />
              </div>
            </div>
            {/* Confirmations */}
            <div className={rowCss}>
              <div
                data-testid="transaction-confimations-title"
                className={titleFontCss}
              >
                Confirmation
              </div>
              <div className="flex flex-row gap-x-2.5 items-center">
                <NumericFormat
                  testId="transaction-confirmations"
                  className={valueFontCss}
                  value={txDetails.confirmations ?? "0"}
                  decimalScale={0}
                  suffix={txDetails.confirmations > 1 ? " blocks" : " block"}
                />
              </div>
            </div>
            {/* Transaction type */}
            <div className={rowCss}>
              <div
                data-testid="transaction-type-title"
                className={titleFontCss}
              >
                Transaction type
              </div>
              <div
                data-testid="transaction-type"
                className={clsx(
                  "flex gap-1 md:gap-2 items-center",
                  valueFontCss,
                )}
              >
                <Icon className="text-white-50 stroke-white-50 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                {txDetails.transactionType}
              </div>
            </div>
            {/* Transaction status */}
            <div className={rowCss}>
              <div
                data-testid="transaction-status-title"
                className={titleFontCss}
              >
                Status
              </div>
              <TransactionRowStatus status={txDetails.status} />{" "}
            </div>
            {/* Amount */}
            <div className={rowCss}>
              <div
                data-testid="transaction-amount-title"
                className={titleFontCss}
              >
                Amount
              </div>
              <div>
                <NumericFormat
                  testId="transaction-amount"
                  className={valueFontCss}
                  thousandSeparator
                  value={txDetails.value}
                  decimalScale={8}
                  suffix={` ${txDetails.symbol}`}
                />
              </div>
            </div>
            {/* Transaction fee */}
            <div className={rowCss}>
              <div data-testid="transaction-fee-title" className={titleFontCss}>
                Transaction fee
              </div>
              <div>
                <NumericFormat
                  testId="transaction-fee"
                  className={valueFontCss}
                  thousandSeparator
                  value={txDetails.fee}
                  decimalScale={8}
                  suffix={` ${txDetails.symbol}`}
                />
              </div>
            </div>
          </div>
          <SectionDivider />
          {/* From */}
          <DetailRow label="From" className="mb-7">
            <WithCopy
              textToCopy={txDetails.from}
              testId="transaction-details-from"
              copyIconStyle="mb-1"
            >
              <LinkText
                customStyle="tracking-[0.01em]"
                testId="transaction-details-from"
                label={truncateTextFromMiddle(txDetails.from, 4)}
                href={`/address/${txDetails.from}`}
              />
            </WithCopy>
          </DetailRow>
          {/* To */}
          {txDetails.to && (
            <DetailRow
              label={
                txDetails.isToContract ? "Interacted with contract (To)" : "To"
              }
              className="mb-7"
            >
              <WithCopy
                textToCopy={txDetails.to}
                testId="transaction-details-to"
                copyIconStyle="mb-1"
              >
                <LinkText
                  customStyle="tracking-[0.01em]"
                  testId="transaction-details-to"
                  label={truncateTextFromMiddle(txDetails.to, 4)}
                  href={`/address/${txDetails.to}`}
                />
              </WithCopy>
            </DetailRow>
          )}
          {txDetails.tokenTransfers && txDetails.tokenTransfers.length > 0 && (
            <TokenTransferDetails tokenTransfers={txDetails.tokenTransfers} />
          )}
          <GasDetails
            gasPrice={gasPrice}
            gasLimit={txDetails.gasLimit}
            gasUsed={txDetails.gasUsed}
            gasUsedPercentage={gasUsedPercentage.isNaN() ? "0" : gasUsedPercentage.toFixed(2)}
            nonce={txDetails.nonce}
            from={txDetails.from}
            to={txDetails.to}
            transactionType={txDetails.transactionType}
            position={txDetails.position}
          />
          <SectionDivider />
          <RawInput hex={txDetails.rawInput} />
          {txDetails.decodedInput && (
            <>
              <SectionDivider />
              <DecodedInput input={txDetails.decodedInput} />
            </>
          )}
        </div>
      </GradientCardContainer>
    </div>
  );
}

function SectionDivider() {
  return (
    <div
      className={clsx(
        "border-b border-black-600",
        "mt-9 mb-6",
        "md:mt-14 md:mb-9",
        "lg:mt-10 lg:mb-11",
      )}
    />
  );
}

export async function getServerSideProps(context) {
  const {
    params: { tid },
    query: { network },
  } = context;
  try {
    const data = await TransactionsApi.getTransaction(
      network as NetworkConnection,
      tid,
    );
    const txDetails = transformTransactionData(data);

    return { props: { txDetails } };
  } catch (e) {
    return { notFound: true };
  }
}
