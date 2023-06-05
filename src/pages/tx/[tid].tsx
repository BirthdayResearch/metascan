import BigNumber from "bignumber.js";
import clsx from "clsx";
import { FiX } from "react-icons/fi";
import { IoMdCheckmarkCircle } from "react-icons/io";

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
import { NetworkConnection } from "@contexts/Environment";

import BoldedTitle from "./_components/BoldedTitle";
import GasDetails from "./_components/GasDetails";
import RawInput from "./_components/RawInput";
import WithCopy from "./_components/WithCopy";

function Transaction({ txDetails }: { txDetails: TransactionI }) {
  const gasPrice = { value: txDetails.gasPrice, symbol: GWEI_SYMBOL };
  const gasUsedPercentage = new BigNumber(txDetails.gasUsed)
    .dividedBy(txDetails.gasLimit)
    .multipliedBy(100)
    .toFixed(2);
  const timeDuration = getDuration(Number(txDetails.timeInSec));
  const timeInUTC = formatDateToUTC(txDetails.timestamp);

  const titleFontCss =
    "text-white-700 break-all leading-[22.4px] tracking-[0.01em] lg:leading-[24px] lg:-tracking-[0.02em]";
  const valueFontCss = "text-white-50 leading-[24px] -tracking-[0.02em]";
  const rowCss =
    "flex md:flex-col justify-between md:justify-normal gap-y-2 h-6 md:h-auto";

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
          <div className="">
            <span className="text-white-50 text-lg md:text-2xl font-semibold md:leading-9 break-all -tracking-[0.02em] md:tracking-normal">
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
                data-testid="transaction-block-title"
                className={titleFontCss}
              >
                Confirmation
              </div>
              <div className="flex flex-row gap-x-2.5 items-center">
                <NumericFormat
                  data-testid="transaction-confirmations"
                  className={valueFontCss}
                  value={txDetails.confirmations ?? "0"}
                  decimalScale={0}
                  suffix={` blocks`}
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
              <div data-testid="transaction-type" className={valueFontCss}>
                {/* TODO: Add transaction type icon */}
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
              <div
                className={clsx(
                  "flex items-center",
                  txDetails.status.toLowerCase() === "confirmed"
                    ? "text-green-800"
                    : "text-red-800"
                )}
              >
                <div
                  data-testid="transaction-status"
                  className={clsx(
                    "text-sm  -tracking-[0.01em] ",
                    "md:text-base md:font-semibold md:-tracking-[0.02em]"
                  )}
                >
                  {txDetails.status}
                </div>
                {txDetails.status.toLowerCase() === "confirmed" ? (
                  <IoMdCheckmarkCircle size={20} className=" ml-1" />
                ) : (
                  <FiX size={20} className=" ml-1" />
                )}
              </div>
            </div>
            {/* From */}
            <div className={rowCss}>
              <div data-testid="from-title" className={titleFontCss}>
                From
              </div>
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
            </div>
            {/* To */}
            {txDetails.to && (
              <div className={rowCss}>
                <div data-testid="to-title" className={titleFontCss}>
                  To
                </div>
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
              </div>
            )}
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
                  data-testid="transaction-amount"
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
                  data-testid="transaction-fee"
                  className={valueFontCss}
                  thousandSeparator
                  value={txDetails.fee}
                  decimalScale={8}
                  suffix={` ${txDetails.symbol}`}
                />
              </div>
            </div>
          </div>
          <div
            className={clsx(
              "border-b border-black-600",
              "mt-9 mb-6",
              "md:mt-[58px] md:mb-9",
              "lg:mt-[38px] lg:mb-11"
            )}
          />
          <GasDetails
            gasPrice={gasPrice}
            gasLimit={txDetails.gasLimit}
            gasUsed={txDetails.gasUsed}
            gasUsedPercentage={gasUsedPercentage}
            nonce={txDetails.nonce}
            from={txDetails.from}
            to={txDetails.to}
            transactionType={txDetails.transactionType}
          />
          <div
            className={clsx(
              "border-b border-black-600",
              "mt-9 mb-6",
              "md:mt-14 md:mb-9",
              "lg:mt-10 lg:mb-11"
            )}
          />
          <RawInput hex={txDetails.rawInput} />
        </div>
      </GradientCardContainer>
    </div>
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
      tid
    );
    const txDetails = transformTransactionData(data);

    console.log({ txDetails });

    return { props: { txDetails } };
  } catch (e) {
    return { notFound: true };
  }
}

export default Transaction;
