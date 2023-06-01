import BigNumber from "bignumber.js";
import { Dispatch, SetStateAction, useState } from "react";
import { FiCopy } from "react-icons/fi";

import useWindowDimensions from "hooks/useWindowDimensions";
import { formatDateToUTC, getDuration } from "shared/durationHelper";
import { transformTransactionData } from "shared/transactionDataHelper";
import { truncateTextFromMiddle } from "shared/textHelper";
import { GWEI_SYMBOL } from "shared/constants";
import TransactionsApi from "@api/TransactionsApi";
import { TransactionI, TransactionType } from "@api/types";

import { SearchBar } from "layouts/components/searchbar/SearchBar";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import NumericFormat from "@components/commons/NumericFormat";
import LinkText from "@components/commons/LinkText";
import Tooltip from "@components/commons/Tooltip";
import { InfoIcon } from "@components/icons/InfoIcon";
import { ConfirmCheck } from "@components/icons/ConfirmCheck";
import { RejectedCross } from "@components/icons/RejectedCross";
import { GreenTickIcon } from "@components/icons/GreenTickIcon";
import { NetworkConnection } from "@contexts/Environment";
import BoldedTitle from "./_components/BoldedTitle";
import GasDetails from "./_components/GasDetails";
import RawInput from "./_components/RawInput";

function Transaction({ txDetails }: { txDetails: TransactionI }) {
  const amount = { value: txDetails.value, symbol: txDetails.symbol };
  const transactionFee = { value: txDetails.fee, symbol: txDetails.symbol };
  const gasPrice = { value: txDetails.gasPrice, symbol: GWEI_SYMBOL };
  const gasUsedPercentage = new BigNumber(txDetails.gasUsed)
    .dividedBy(txDetails.gasLimit)
    .multipliedBy(100)
    .toFixed(2);

  return (
    <div className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer>
        <div className="p-5 pt-8 pb-8 md:p-10">
          <div
            className="flex flex-row lg:mb-8 md:mb-6 mb-6"
            data-testid="transaction-details-title"
          >
            <BoldedTitle
              className="text-2xl"
              title={fixedTitle.transactionDetails}
            />
          </div>
          <TransactionDetailSegmentOne
            transactionId={txDetails.hash}
            amount={amount}
            status={txDetails.status}
            blockNumber={txDetails.blockNumber}
            confirmations={txDetails.confirmations}
            timeInSec={txDetails.timeInSec}
            timestamp={txDetails.timestamp}
            transactionFee={transactionFee}
            transactionType={txDetails.transactionType}
            nonce={txDetails.nonce}
            address={{
              from: txDetails.from,
              to: txDetails.to,
              contractAddress: "", // TODO: Revisit contract address can be removed
            }}
            type={txDetails.type}
          />
          <div className="border-b border-black-600 lg:my-11 md:mt-9 md:mb-11 mt-10 mb-[52px]" />
          <GasDetails
            gasPrice={gasPrice}
            gasLimit={txDetails.gasLimit}
            gasUsed={txDetails.gasUsed}
            gasUsedPercentage={gasUsedPercentage}
            from={txDetails.from}
            to={txDetails.to}
            transactionType={txDetails.transactionType}
          />
          <RawInput hex={txDetails.rawInput} />
        </div>
      </GradientCardContainer>
    </div>
  );
}

interface TransactionDetailSegmentOneProp {
  transactionId: string;
  amount: {
    value: string;
    symbol: string;
  };
  status: string;
  blockNumber: string;
  confirmations: number;
  timeInSec: number;
  timestamp: string;
  transactionFee: {
    value: string;
    symbol: string;
  };
  transactionType: TransactionType;
  nonce: number;
  address: {
    from: string;
    to: string | null;
    contractAddress: string;
  };
  type: number;
}

function TransactionDetailSegmentOne({
  transactionId,
  amount,
  status,
  blockNumber,
  confirmations,
  timeInSec,
  timestamp,
  transactionFee,
  transactionType,
  nonce,
  address,
  type,
}: TransactionDetailSegmentOneProp) {
  const [isFromAddressCopied, setIsFromAddressCopied] = useState(false);
  const [isToAddressCopied, setIsToAddressCopied] = useState(false);
  const [isTransactionIdCopied, setIsTransationIdCopied] = useState(false);
  const windowDimension = useWindowDimensions().width;

  const timeDuration = getDuration(Number(timeInSec));
  const timeInUTC = formatDateToUTC(timestamp);

  return (
    <div className="flex flex-col gap-y-10">
      {/* first row */}
      <div className="flex flex-col lg:flex-row md:flex-row gap-y-[41.5px]">
        {/* 1st flex */}
        <div className="flex flex-col grow">
          {isTransactionIdCopied ? (
            <div className="flex flex-row gap-x-2.5 items-center mb-2 h-[22px]">
              <LinkText
                testId="transaction-id-copied"
                label={fixedTitle.copied}
                href={`/address/${transactionId}`}
                customStyle="tracking-[0.01em] leading-[22.4px]"
              />
              <GreenTickIcon data-testid="transaction-id-copied-green-tick-icon" />
            </div>
          ) : (
            <div className="flex flex-row gap-x-2.5 items-center mb-2 h-[22px]">
              <span className="text-white-50 tracking-[0.01em] leading-[22.4px]">
                {truncateTextFromMiddle(transactionId, 11)}
              </span>
              <FiCopy
                role="button"
                data-testid="transaction-id-copy-icon"
                onClick={() =>
                  onCopyAddressIconClick(setIsTransationIdCopied, transactionId)
                }
                className="text-white-50"
              />
            </div>
          )}

          <div className="lg:h-[42px] md:h-[31px] h-[26px] align-middle mb-1">
            <NumericFormat
              data-testid="transaction-token-price"
              className="text-white-50 lg:text-[32px] md:text-2xl text-xl font-bold lg:leading-[41.6px] md:leading-[31.2px] leading-[26px]"
              value={amount.value ?? "0"}
              decimalScale={amount.value ? 8 : 2}
              suffix={` ${amount.symbol}`}
            />
          </div>

          {/*
          // TODO: Confirm if we need value price in USD
           <NumericFormat
            data-testid="transaction-value-price"
            className="text-white-700 tracking-[0.01em] h-[22px] leading-[22.4px]"
            thousandSeparator
            value={
              [
                TransactionType.ContractCall,
                TransactionType.Tokenized,
              ].includes(transactionType)
                ? valuePrice
                : "0"
            }
            prefix="$"
            decimalScale={2}
          /> */}
        </div>
        {/* 2nd flex */}
        <div className="flex flex-col lg:items-end md:items-end items-start">
          {status.toLowerCase() === "confirmed" ? (
            <div className="flex flex-row items-center lg:mb-[23px] md:mb-[14px] mb-[5.5px] ">
              <div
                data-testid="transaction-confirm-status"
                className="text-green-800 font-bold lg:mr-[10.57px] md:mr-[10.57px] mr-[6.57px] leading-[20.8px] h-[21px]"
              >
                {status}
              </div>
              <ConfirmCheck />
            </div>
          ) : (
            <div className="flex flex-row lg:mb-[23px] md:mb-[14px] mb-[5.5px] ">
              <div
                data-testid="transaction-revert-status"
                className="text-red-800 font-bold lg:mr-[10.57px] md:mr-[10.57px] mr-[6.57px] leading-[20.8px] h-[21px]"
              >
                {status}
              </div>
              <RejectedCross />
            </div>
          )}
          <div className="flex flex-row items-center mb-1 h-[22px]">
            <div className="lg:order-first md:order-first order-last">
              <Tooltip text={`Confirmed by ${confirmations} blocks`}>
                <InfoIcon className="lg:mr-[8.67px] md:mr-[8.67px] ml-[9.33px]" />
              </Tooltip>
            </div>
            <div
              data-testid="transaction-confirmed-blocks"
              className="text-white-700 tracking-[0.01em] leading-[22.4px]"
            >
              Confirmed by {confirmations} blocks
            </div>
          </div>

          <div
            data-testid="transaction-timestamp"
            className="text-white-700 tracking-[0.01em] h-[22px] leading-[22.4px]"
          >
            {`${timeDuration} ago (${timeInUTC} +UTC)`}
          </div>
        </div>
      </div>
      {/* desktop & tablet */}
      <div className="hidden md:block">
        <div className="grid lg:grid-cols-6 lg:grid-rows-2 md:grid-cols-4 md:grid-rows-3 grid-rows-7 gap-y-5">
          <div className="flex flex-col gap-y-1 lg:col-start-1 md:col-start-3">
            <div
              data-testid="transaction-fee-title"
              className="text-white-700 tracking-[0.01em]"
            >
              {fixedTitle.transactionFee}
            </div>
            <div>
              <NumericFormat
                data-testid="transaction-fee"
                className="text-white-50 tracking-[0.01em]"
                thousandSeparator
                value={transactionFee.value}
                decimalScale={8}
                suffix={` ${transactionFee.symbol}`}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-1 lg:col-start-2 md:col-start-1 row-start-1">
            <div
              data-testid="transaction-block-title"
              className="text-white-700 tracking-[0.01em]"
            >
              {fixedTitle.block}
            </div>
            <div className="flex flex-row gap-x-2.5 items-center">
              <LinkText
                customStyle="tracking-[0.01em]"
                testId="transaction-block"
                label={blockNumber}
                href={`/block/${blockNumber}`}
              />
            </div>
          </div>
          {/* TODO: finalize transaction types */}
          {type && (
            <div className="flex flex-col gap-y-1 lg:col-start-3 md:col-start-2 md:row-start-1">
              <div
                data-testid="transaction-fee-title"
                className="text-white-700 tracking-[0.01em]"
              >
                {fixedTitle.transactionType}
              </div>
              <div
                data-testid="transaction-type"
                className="text-white-50 tracking-[0.01em]"
              >
                {type}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-y-1 lg:row-auto md:row-start-3">
            <div
              data-testid="transaction-details-from-title"
              className="text-white-700 tracking-[0.01em]"
            >
              {fixedTitle.from}
            </div>
            <div>
              {isFromAddressCopied ? (
                <div className="flex flex-row gap-x-2.5 items-center">
                  <LinkText
                    customStyle="tracking-[0.01em]"
                    testId="transaction-details-from-copied"
                    label={fixedTitle.copied}
                    href={`/address/${address.from}`}
                  />
                  <GreenTickIcon />
                </div>
              ) : (
                <div className="flex flex-row gap-x-2.5 items-center">
                  <LinkText
                    customStyle="tracking-[0.01em]"
                    testId="transaction-details-from"
                    label={truncateTextFromMiddle(
                      address.from,
                      windowDimension >= 760 ? 5 : 11
                    )}
                    href={`/address/${address.from}`}
                  />
                  <FiCopy
                    role="button"
                    onClick={() =>
                      onCopyAddressIconClick(
                        setIsFromAddressCopied,
                        address.from
                      )
                    }
                    className="text-white-50 h-[22px]"
                  />
                </div>
              )}
            </div>
          </div>
          {address.to && (
            <div className="flex flex-col gap-y-1 lg:row-auto md:row-start-3">
              <div
                data-testid="transaction-details-to-title"
                className="text-white-700 tracking-[0.01em]"
              >
                {fixedTitle.to}
              </div>
              {isToAddressCopied ? (
                <div className="flex flex-row gap-x-2.5 items-center">
                  <LinkText
                    testId="transaction-details-to-copied"
                    label={fixedTitle.copied}
                    href={`/address/${address.to}`}
                  />
                  <GreenTickIcon />
                </div>
              ) : (
                <div className="flex flex-row gap-x-2.5 items-center">
                  {transactionType === TransactionType.ContractCall && (
                    <div
                      data-testid="transaction-details-to-contract-title"
                      className="text-white-50"
                    >
                      {fixedTitle.contract}
                    </div>
                  )}
                  <LinkText
                    testId="transaction-details-to"
                    label={truncateTextFromMiddle(
                      address.to,
                      windowDimension >= 760 ? 4 : 11
                    )}
                    href={`/address/${address.to}`}
                  />
                  <FiCopy
                    role="button"
                    onClick={() =>
                      onCopyAddressIconClick(
                        setIsToAddressCopied,
                        address.to ?? ""
                      )
                    }
                    className="text-white-50 h-[22px]"
                  />
                </div>
              )}
            </div>
          )}
          <div className="flex flex-col gap-y-1 col-start-1 row-start-2">
            <div className="flex flex-row items-center grow">
              <div
                data-testid="transaction-nonce-title"
                className="text-white-700 tracking-[0.01em]"
              >
                {fixedTitle.nonce}
              </div>
              <Tooltip text={fixedTitle.nonce}>
                <InfoIcon
                  data-testid="desktop-transaction-nonce-icon"
                  className="ml-[9.33px] mr-[8.67px]"
                />
              </Tooltip>
            </div>
            <div
              data-testid="transaction-nonce"
              className="text-white-50 tracking-[0.01em]"
            >
              {nonce}
            </div>
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="md:hidden grid grid-rows-7 gap-y-4">
        <div className="flex flex-col gap-y-1">
          <div
            data-testid="transaction-fee-title"
            className="text-white-700 tracking-[0.01em]"
          >
            {fixedTitle.transactionFee}
          </div>
          <div>
            <NumericFormat
              data-testid="transaction-fee"
              className="text-white-50 tracking-[0.01em]"
              thousandSeparator
              value={transactionFee.value}
              decimalScale={8}
              suffix={` ${transactionFee.symbol}`}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-1 md:row-auto">
          <div
            data-testid="transaction-block-title"
            className="text-white-700 tracking-[0.01em]"
          >
            {fixedTitle.block}
          </div>
          <div className="flex flex-row gap-x-2.5 items-center">
            <LinkText
              customStyle="tracking-[0.01em]"
              testId="transaction-block"
              label={blockNumber}
              href={`/block/${blockNumber}`}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          <div
            data-testid="transaction-fee-title"
            className="text-white-700 tracking-[0.01em]"
          >
            {fixedTitle.transactionType}
          </div>
          <div
            data-testid="transaction-type"
            className="text-white-50 tracking-[0.01em]"
          >
            {transactionType}
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="flex flex-row items-center grow">
            <div
              data-testid="transaction-nonce-title"
              className="text-white-700 tracking-[0.01em]"
            >
              {fixedTitle.nonce}
            </div>
            <Tooltip text={fixedTitle.nonce}>
              <InfoIcon
                data-testid="transaction-nonce-icon"
                className="ml-[9.33px] mr-[8.67px]"
              />
            </Tooltip>
          </div>
          <div
            data-testid="transaction-nonce"
            className="text-white-50 tracking-[0.01em]"
          >
            {nonce}
          </div>
        </div>
        <div className="flex flex-col gap-y-1 mt-9">
          <div
            data-testid="transaction-details-from-title"
            className="text-white-700 tracking-[0.01em]"
          >
            {fixedTitle.from}
          </div>
          <div>
            {isFromAddressCopied ? (
              <div className="flex flex-row gap-x-2.5 items-center">
                <LinkText
                  customStyle="tracking-[0.01em]"
                  testId="transaction-details-from-copied"
                  label={fixedTitle.copied}
                  href={`/address/${address.from}`}
                />
                <GreenTickIcon />
              </div>
            ) : (
              <div className="flex flex-row gap-x-2.5 items-center">
                <LinkText
                  customStyle="tracking-[0.01em]"
                  testId="transaction-details-from"
                  label={truncateTextFromMiddle(
                    address.from,
                    windowDimension >= 760 ? 4 : 11
                  )}
                  href={`/address/${address.from}`}
                />
                <FiCopy
                  role="button"
                  onClick={() =>
                    onCopyAddressIconClick(setIsFromAddressCopied, address.from)
                  }
                  className="text-white-50 h-[22px]"
                />
              </div>
            )}
          </div>
        </div>
        {address.to && (
          <div className="flex flex-col gap-y-1">
            <div
              data-testid="transaction-details-to-title"
              className="text-white-700 tracking-[0.01em]"
            >
              {fixedTitle.to}
            </div>
            {isToAddressCopied ? (
              <div className="flex flex-row gap-x-2.5 items-center">
                <LinkText
                  testId="transaction-details-to-copied"
                  label={fixedTitle.copied}
                  href={`/address/${address.to}`}
                />
                <GreenTickIcon />
              </div>
            ) : (
              <div className="flex flex-row gap-x-2.5 items-center">
                {transactionType === TransactionType.ContractCall && (
                  <div
                    data-testid="transaction-details-to-contract-title"
                    className="text-white-50"
                  >
                    {fixedTitle.contract}
                  </div>
                )}
                <LinkText
                  testId="transaction-details-to"
                  label={truncateTextFromMiddle(
                    address.to,
                    windowDimension >= 760 ? 4 : 11
                  )}
                  href={`/address/${address.to}`}
                />
                <FiCopy
                  role="button"
                  onClick={() =>
                    onCopyAddressIconClick(
                      setIsToAddressCopied,
                      address.to ?? ""
                    )
                  }
                  className="text-white-50 h-[22px]"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

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

    return { props: { txDetails } };
  } catch (e) {
    return { notFound: true };
  }
}

const fixedTitle = {
  transactionFee: "Transaction fee",
  block: "Block",
  transactionType: "Transaction Type",
  nonce: "Nonce",
  from: "From",
  to: "To",
  contractAddress: "Contract Address",
  gasDetail: "Gas detail",
  gasPrice: "Gas price",
  gasLimit: "Gas limit",
  gasUsed: "Gas used by transaction",
  tokenTransferred: "Token transferred",
  for: "For",
  rawInput: "Raw input",
  hex: "Hex (Default)",
  transfer: "Transfer",
  transactionDetails: "Transaction details",
  contract: "Contract",
  copied: "Copied!",
  tokenized: "tokenized",
};

export default Transaction;
