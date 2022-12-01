import GradientCardContainer from "@components/commons/GradientCardContainer";
import { FiCopy, FiChevronUp, FiChevronDown } from "react-icons/fi";
import NumericFormat from "@components/commons/NumericFormat";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import transactionDetailData from "mockdata/TransactionDetailData";
import LinkText from "@components/commons/LinkText";
import { stringToNumber, truncateTextFromMiddle } from "shared/textHelper";
import { Dispatch, SetStateAction, useState } from "react";
import { useUnitSuffix } from "hooks/useUnitSuffix";
import { InfoIcon } from "@components/icons/InfoIcon";
import Tooltip from "@components/commons/Tooltip";
import clsx from "clsx";
import { ConfirmCheck } from "@components/icons/ConfirmCheck";
import { RejectedCross } from "@components/icons/RejectedCross";
import { GreenTickIcon } from "@components/icons/GreenTickIcon";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useRouter } from "next/router";
import { getDuration } from "shared/durationHelper";
import BoldedTitle from "./_components/BoldedTitle";

const data = transactionDetailData.transactionDetailData;

function Transaction() {
  const router = useRouter();
  const tid = router.query.tid?.toString()!;

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
            transactionId={tid}
            tokenPrice={data.transactions.tokenPrice}
            valuePrice={data.transactions.valuePrice}
            status={data.transactions.status}
            blockNumber={data.number}
            timestamp={data.timestamp}
            transactionFee={data.transactions.transactionFee}
            block={data.transactions.block}
            transactionType={data.transactions.transactionType}
            nonce={data.transactions.nonce}
            address={data.transactions.address}
            type={data.type}
          />
          <div className="border-b border-black-600 lg:my-11 md:mt-9 md:mb-11 mt-10 mb-[52px]" />
          <TransactionDetailSegmentTwo
            gasPrice={data.transactions.gasPrice}
            gasLimit={data.gasLimit}
            gasUsed={data.gasUsed}
            gasUsedPercentage={data.gasUsedPercentage}
            from={data.transactions.address.from}
            to={data.transactions.address.to}
            forToken={data.forToken}
            type={data.type}
            hex={data.hex}
          />
        </div>
      </GradientCardContainer>
    </div>
  );
}

interface TransactionDetailSegmentOneProp {
  transactionId: string;
  tokenPrice: {
    value: string;
    symbol: string;
  };
  valuePrice: string;
  status: string;
  blockNumber: string;
  timestamp: string;
  transactionFee: {
    value: string;
    symbol: string;
  };
  block: string;
  transactionType: string;
  nonce: string;
  address: {
    from: string;
    to: string;
    contractAddress: string;
  };
  type: string;
}

function TransactionDetailSegmentOne({
  transactionId,
  tokenPrice,
  valuePrice,
  status,
  blockNumber,
  timestamp,
  transactionFee,
  block,
  transactionType,
  nonce,
  address,
  type,
}: TransactionDetailSegmentOneProp) {
  const [isFromAddressCopied, setIsFromAddressCopied] = useState(false);
  const [isToAddressCopied, setIsToAddressCopied] = useState(false);
  const [isTransactionIdCopied, setIsTransationIdCopied] = useState(false);
  const windowDimension = useWindowDimensions().width;
  const parsedBlockNumber = stringToNumber(block);

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
              <LinkText
                testId="trasaction-id"
                label={truncateTextFromMiddle(transactionId, 11)}
                href={`/address/${transactionId}`}
                customStyle="tracking-[0.01em] leading-[22.4px]"
              />
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
              value={
                type === "tokenized" || type === "contract"
                  ? tokenPrice.value
                  : "0"
              }
              decimalScale={type === "tokenized" || type === "contract" ? 8 : 2}
              suffix={` ${tokenPrice.symbol}`}
            />
          </div>

          <NumericFormat
            data-testid="transaction-value-price"
            className="text-white-700 tracking-[0.01em] h-[22px] leading-[22.4px]"
            thousandSeparator
            value={
              type === "tokenized" || type === "contract" ? valuePrice : "0"
            }
            prefix="$"
            decimalScale={2}
          />
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
              <Tooltip text={`Confirmed by ${blockNumber} blocks`}>
                <InfoIcon className="lg:mr-[8.67px] md:mr-[8.67px] ml-[9.33px]" />
              </Tooltip>
            </div>
            <div
              data-testid="transaction-confirmed-blocks"
              className="text-white-700 tracking-[0.01em] leading-[22.4px]"
            >
              Confirmed by {blockNumber} blocks
            </div>
          </div>

          <div
            data-testid="transaction-timestamp"
            className="text-white-700 tracking-[0.01em] h-[22px] leading-[22.4px]"
          >
            {getDuration(Number(timestamp))} ago
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
                label={block}
                href={`/block/${parsedBlockNumber}`}
              />
            </div>
          </div>
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
              {transactionType}
            </div>
          </div>
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
                {type === "contract" && (
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
                    windowDimension >= 760 ? 5 : 11
                  )}
                  href={`/address/${address.to}`}
                />
                <FiCopy
                  role="button"
                  onClick={() =>
                    onCopyAddressIconClick(setIsToAddressCopied, address.to)
                  }
                  className="text-white-50 h-[22px]"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-1 col-start-1 row-start-2">
            <div
              data-testid="transaction-nonce-title"
              className="text-white-700 tracking-[0.01em]"
            >
              {fixedTitle.nonce}
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
              label={block}
              href={`/block/${parsedBlockNumber}`}
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
          <div
            data-testid="transaction-nonce-title"
            className="text-white-700 tracking-[0.01em]"
          >
            {fixedTitle.nonce}
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
                    windowDimension >= 760 ? 5 : 11
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
              {type === "contract" && (
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
                  windowDimension >= 760 ? 5 : 11
                )}
                href={`/address/${address.to}`}
              />
              <FiCopy
                role="button"
                onClick={() =>
                  onCopyAddressIconClick(setIsToAddressCopied, address.to)
                }
                className="text-white-50 h-[22px]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface TransactionDetailSegmentTwoProps {
  gasPrice: {
    value: string;
    symbol: string;
  };
  gasLimit: string;
  gasUsed: string;
  gasUsedPercentage: string;
  from: string;
  to: string;
  forToken: {
    value: string;
    symbol: string;
  };
  type: string;
  hex: string;
}

function TransactionDetailSegmentTwo({
  gasPrice,
  gasLimit,
  gasUsed,
  gasUsedPercentage,
  from,
  to,
  forToken,
  type,
  hex,
}: TransactionDetailSegmentTwoProps) {
  const [isRawInputExpanded, setIsRawInputExpanded] = useState(false);
  const [isFromAddressCopied, setIsFromAddressCopied] = useState(false);
  const [isToAddressCopied, setIsToAddressCopied] = useState(false);
  const windowDimension = useWindowDimensions().width;

  const onRawInputClick = () => {
    setIsRawInputExpanded(!isRawInputExpanded);
  };

  return (
    <div>
      {/* desktop tablet */}
      <div className="hidden md:block">
        <div className="grid grid-rows-4 lg:grid-cols-6 md:grid-cols-4 lg:gap-x-0 gap-x-5">
          <div>
            <BoldedTitle
              title={fixedTitle.gasDetail}
              testId="desktop-transaction-gas-detail-title"
            />
          </div>
          <div className="row-start-2 col-start-1">
            <div
              data-testid="desktop-transaction-gas-price-title"
              className="text-white-700 tracking-[0.01em]"
            >
              {fixedTitle.gasPrice}
            </div>
          </div>
          <div className="row-start-2 col-start-2 lg:col-span-2">
            <div className="flex">
              <NumericFormat
                data-testid="desktop-transaction-gas-price"
                className="text-white-50 whitespace-normal tracking-[0.01em]"
                thousandSeparator
                value={gasPrice.value}
                decimalScale={8}
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
                {fixedTitle.gasLimit}
              </div>
              <Tooltip text={fixedTitle.gasLimit}>
                <InfoIcon
                  data-testid="desktop-transaction-gas-limit-icon"
                  className="ml-[9.33px] mr-[8.67px]"
                />
              </Tooltip>
            </div>
          </div>
          <div className="row-start-3 col-start-2 lg:col-span-2">
            <div className="text-white-50 tracking-[0.01em] whitespace-normal">
              {useUnitSuffix(gasLimit)}
            </div>
          </div>
          <div className="row-start-4 col-start-1">
            <div
              data-testid="desktop-transaction-gas-used-title"
              className="text-white-700 w-[101px] tracking-[0.01em]"
            >
              {fixedTitle.gasUsed}
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
          {type === fixedTitle.tokenized && (
            <div className="lg:col-start-4 col-start-3 row-start-1 col-span-2">
              <BoldedTitle
                title={fixedTitle.tokenTransferred}
                testId="desktop-transaction-token-transferred-title"
              />
            </div>
          )}
          {type === fixedTitle.tokenized && (
            <div className="lg:col-start-4 col-start-3 row-start-2">
              <div
                data-testid="desktop-transaction-token-transferred-from-title"
                className="text-white-700 tracking-[0.01em]"
              >
                {fixedTitle.from}
              </div>
            </div>
          )}
          {type === fixedTitle.tokenized && (
            <div className="lg:col-span-2 lg:col-start-5 col-start-4 row-start-2 ">
              {isFromAddressCopied ? (
                <div className="flex flex-row items-center gap-x-2.5">
                  <LinkText
                    testId="desktop-transaction-token-transferred-from-copied"
                    label={fixedTitle.copied}
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
                      windowDimension <= 1280 ? 5 : 11
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
          {type === fixedTitle.tokenized && (
            <div className="lg:col-start-4 col-start-3 row-start-3">
              <div
                data-testid="desktop-transaction-token-transferred-to-title"
                className="text-white-700 tracking-[0.01em]"
              >
                {fixedTitle.to}
              </div>
            </div>
          )}
          {type === fixedTitle.tokenized && (
            <div className="lg:col-start-5 col-start-4 row-start-3 lg:col-span-2">
              {isToAddressCopied ? (
                <div className="flex flex-row items-center gap-x-2.5">
                  <LinkText
                    testId="desktop-transaction-token-transferred-to-copied"
                    label={fixedTitle.copied}
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
                      windowDimension <= 1280 ? 5 : 11
                    )}
                    href={`/address/${to}`}
                  />
                  <FiCopy
                    role="button"
                    data-testid="transaction-token-transferred-to-copy-icon"
                    onClick={() =>
                      onCopyAddressIconClick(setIsToAddressCopied, to)
                    }
                    className="text-white-50 h-[22px]"
                  />
                </div>
              )}
            </div>
          )}
          {type === fixedTitle.tokenized && (
            <div className="lg:col-start-4 col-start-3 row-start-4">
              <div
                data-testid="desktop-transaction-token-transferred-for-title"
                className="text-white-700 tracking-[0.01em]"
              >
                {fixedTitle.for}
              </div>
            </div>
          )}

          {type === fixedTitle.tokenized && (
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
          )}
        </div>
      </div>
      {/* mobile */}
      <div className="md:hidden flex flex-col gap-y-16">
        <div className="flex flex-col gap-y-6">
          <BoldedTitle
            title={fixedTitle.gasDetail}
            testId="transaction-gas-detail-title"
          />
          <div className="flex flex-row">
            <div className="grow">
              <div
                data-testid="transaction-gas-price-title"
                className="text-white-700 tracking-[0.01em]"
              >
                {fixedTitle.gasPrice}
              </div>
            </div>
            <div className="flex text-right">
              <NumericFormat
                data-testid="transaction-gas-price"
                className="text-white-50 whitespace-normal tracking-[0.01em]"
                thousandSeparator
                value={gasPrice.value}
                decimalScale={8}
                suffix={` ${gasPrice.symbol}`}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-row items-center grow">
              <div
                data-testid="transaction-gas-limit-title"
                className="text-white-700 tracking-[0.01em]"
              >
                {fixedTitle.gasLimit}
              </div>
              <Tooltip text={fixedTitle[9]}>
                <InfoIcon
                  data-testid="transaction-gas-limit-icon"
                  className="ml-[9.33px] mr-[8.67px]"
                />
              </Tooltip>
            </div>
            <div className="text-right">
              <div className="text-white-50 tracking-[0.01em] whitespace-normal">
                {useUnitSuffix(gasLimit)}
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className=" grow">
              <div
                data-testid="transaction-gas-used-title"
                className="text-white-700 w-[101px] tracking-[0.01em]"
              >
                {fixedTitle.gasUsed}
              </div>
            </div>
            <div className="flex flex-col">
              <NumericFormat
                data-testid="transaction-gas-used"
                className="text-white-50 tracking-[0.01em] whitespace-normal text-right"
                thousandSeparator
                value={gasUsed}
                decimalScale={0}
              />
              <NumericFormat
                data-testid="transaction-gas-used-percentage"
                className="text-white-700 tracking-[0.02em] text-xs mt-1 text-right"
                thousandSeparator
                value={gasUsedPercentage}
                decimalScale={2}
                suffix="%"
              />
            </div>
          </div>
        </div>
        {type === fixedTitle.tokenized && (
          <div className="flex flex-col gap-y-6">
            <BoldedTitle
              title={fixedTitle.tokenTransferred}
              testId="transaction-token-transferred-title"
            />
            <div className="flex flex-row">
              <div className="grow">
                <div
                  data-testid="transaction-token-transferred-from-title"
                  className="text-white-700 tracking-[0.01em]"
                >
                  {fixedTitle.from}
                </div>
              </div>
              {isFromAddressCopied ? (
                <div className="flex flex-row items-center gap-x-2.5">
                  <LinkText
                    testId="transaction-token-transferred-from-copied"
                    label={fixedTitle.copied}
                    href={`/address/${from}`}
                  />
                  <GreenTickIcon data-testid="transaction-token-transferred-from-green-tick-icon" />
                </div>
              ) : (
                <div className="flex flex-row items-center gap-x-2.5">
                  <div className={clsx({ "mr-[10px]": isFromAddressCopied })}>
                    <LinkText
                      customStyle="tracking-[0.01em]"
                      testId="transaction-token-transferred-from"
                      label={truncateTextFromMiddle(
                        from,
                        windowDimension <= 1280 ? 5 : 11
                      )}
                      href={`/address/${from}`}
                    />
                  </div>
                  <FiCopy
                    role="button"
                    data-testid="transaction-token-transferred-from-copy-icon"
                    onClick={() =>
                      onCopyAddressIconClick(setIsFromAddressCopied, from)
                    }
                    className="text-white-50"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-row">
              <div className="grow">
                <div
                  data-testid="transaction-token-transferred-to-title"
                  className="text-white-700"
                >
                  {fixedTitle.to}
                </div>
              </div>
              <div>
                {isToAddressCopied ? (
                  <div className="flex flex-row items-center gap-x-2.5">
                    <LinkText
                      testId="transaction-token-transferred-to-copied"
                      label={fixedTitle.copied}
                      href={`/address/${to}`}
                    />
                    <GreenTickIcon data-testid="transaction-token-transferred-to-green-tick-icon" />
                  </div>
                ) : (
                  <div className="flex flex-row items-center gap-x-2.5 ">
                    <div className={clsx({ "mr-[10px]": isToAddressCopied })}>
                      <LinkText
                        testId="transaction-token-transferred-to"
                        label={truncateTextFromMiddle(
                          to,
                          windowDimension <= 1280 ? 5 : 11
                        )}
                        href={`/address/${to}`}
                      />
                    </div>
                    <FiCopy
                      role="button"
                      data-testid="transaction-token-transferred-to-copy-icon"
                      onClick={() =>
                        onCopyAddressIconClick(setIsToAddressCopied, to)
                      }
                      className="text-white-50"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-row">
              <div className="grow">
                <div
                  data-testid="transaction-token-transferred-for-title"
                  className="text-white-700 tracking-[0.01em]"
                >
                  {fixedTitle.for}
                </div>
              </div>
              <div className="flex lg:text-left md:text-left text-right">
                <NumericFormat
                  data-testid="transaction-token-transferred-for"
                  className="text-white-50 tracking-[0.01em]"
                  thousandSeparator
                  value={forToken.value}
                  decimalScale={8}
                  suffix={` ${forToken.symbol}`}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <BoldedTitle
          className="lg:pt-14 md:pt-14 pt-16 pb-6"
          testId="transaction-raw-input-title"
          title={fixedTitle.rawInput}
        />
        <div
          className={clsx("flex flex-row items-center lg:mb-[14px] mb-3", {
            "mb-3": isRawInputExpanded,
          })}
        >
          <div
            data-testid="transaction-hex-title"
            role="button"
            tabIndex={0}
            onKeyDown={onRawInputClick}
            onClick={onRawInputClick}
            className="text-white-50 pr-[10.29px]"
          >
            {fixedTitle.hex}
          </div>
          <div
            data-testid="transaction-hex-icon"
            role="button"
            tabIndex={0}
            onKeyDown={onRawInputClick}
            onClick={onRawInputClick}
          >
            <div className="grid ">
              <FiChevronDown
                size={24}
                className={clsx(
                  "col-start-1 row-start-1 text-white-700 opacity-0",
                  {
                    "transition-opacity duration-1000 ease-out opacity-100":
                      isRawInputExpanded,
                  }
                )}
              />
              <FiChevronUp
                size={24}
                className={clsx(
                  "col-start-1 row-start-1 text-white-700 opacity-0",
                  {
                    "transition-opacity duration-1000 ease-out opacity-100":
                      !isRawInputExpanded,
                  }
                )}
              />
            </div>
          </div>
        </div>
        <div
          data-testid="transaction-hex"
          className={clsx(
            "rounded-lg h-0 p-0 font-space-mono tracking-[-0.04em] break-all border-[1px] border-black-600 bg-black-800 opacity-0 text-white-50 text-xs",
            {
              "h-auto lg:py-6 md:py-5 py-4 lg:px-10 md:px-8 px-4 transition-opacity duration-1000 ease-out opacity-100":
                isRawInputExpanded,
            }
          )}
        >
          {hex}
        </div>
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

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
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
