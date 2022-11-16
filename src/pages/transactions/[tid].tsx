import Container from "@components/commons/Container";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import { FiCopy, FiChevronUp, FiChevronDown } from "react-icons/fi";
import NumericFormat from "@components/commons/NumericFormat";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import transactionDetailData from "mockdata/TransactionDetailData";
import LinkText from "@components/commons/LinkText";
import { truncateTextFromMiddle } from "shared/textHelper";
import { Dispatch, SetStateAction, useState } from "react";
import { useUnitSuffix } from "hooks/useUnitSuffix";
import { InfoIcon } from "@components/icons/InfoIcon";
import Tooltip from "@components/commons/Tooltip";
import clsx from "clsx";
import { ConfirmCheck } from "@components/icons/ConfirmCheck";
import { RejectedCross } from "@components/icons/RejectedCross";
import { GreenTickIcon } from "@components/icons/GreenTickIcon";

const data = transactionDetailData.transactionDetailData;

function Transaction() {
  return (
    <Container className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer>
        <div className="lg:p-10 md:p-10 p-5">
          <div
            className="flex flex-row py-4 mb-6"
            data-testid="transaction-details-title"
          >
            <span className="font-bold text-2xl text-white-50">
              {fixedTitle.transactionDetails}
            </span>
          </div>
          <TransactionDetailSegmentOne
            transactionId={data.transactions.transactionId}
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
          <div className="border-[1px] border-black-600 lg:my-11 md:mt-9 md:mb-11 mt-10 mb-[52px]" />
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
    </Container>
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

  return (
    <div className="flex flex-col gap-y-10">
      {/* first row */}
      <div className="flex flex-col lg:flex-row md:flex-row gap-y-[41.5px]">
        {/* 1st flex */}
        <div className="flex flex-col grow gap-y-2">
          {isTransactionIdCopied ? (
            <div className="flex flex-row gap-x-2.5 items-center">
              <LinkText
                testId="transaction-id-copied"
                label={fixedTitle.copied}
                href={`/address/${transactionId}`}
              />
              <GreenTickIcon data-testid="transaction-id-copied-green-tick-icon" />
            </div>
          ) : (
            <div className="flex flex-row gap-x-2.5 items-center">
              <LinkText
                testId="trasaction-id"
                label={truncateTextFromMiddle(transactionId)}
                href={`/address/${transactionId}`}
              />
              <FiCopy
                data-testid="transaction-id-copy-icon"
                onClick={() =>
                  onCopyAddressIconClick(setIsTransationIdCopied, transactionId)
                }
                className="text-white-50"
              />
            </div>
          )}

          <NumericFormat
            data-testid="transaction-token-price"
            className="text-white-50 lg:text-[32px] md:text-2xl text-xl"
            value={
              type === "tokenized" || type === "contract"
                ? tokenPrice.value
                : "0"
            }
            decimalScale={type === "tokenized" || type === "contract" ? 8 : 2}
            suffix={` ${tokenPrice.symbol}`}
          />

          <NumericFormat
            data-testid="transaction-value-price"
            className="text-white-700"
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
            <div className="flex flex-row">
              <div
                data-testid="transaction-confirm-status"
                className="text-green-800 lg:mb-[23px] md:mb-[14px] mb-[5.5px] lg:mr-[10.57px] md:mr-[10.57px] mr-[6.57px]"
              >
                {status}
              </div>
              <ConfirmCheck />
            </div>
          ) : (
            <div className="flex flex-row">
              <div
                data-testid="transaction-revert-status"
                className="text-red-800 lg:mb-[23px] md:mb-[14px] mb-[5.5px]  lg:mr-[10.57px] md:mr-[10.57px] mr-[6.57px]"
              >
                {status}
              </div>
              <RejectedCross />
            </div>
          )}
          <div className="flex flex-row items-center lg:mb-2 md:mb-1 mb-1">
            <div className="lg:order-first md:order-first order-last">
              <Tooltip text={`Confirmed by ${blockNumber} blocks`}>
                <InfoIcon className="lg:mr-[8.67px] md:mr-[8.67px] ml-[9.33px]" />
              </Tooltip>
            </div>
            <div
              data-testid="transaction-confirmed-blocks"
              className="text-white-700"
            >
              Confirmed by {blockNumber} blocks
            </div>
          </div>

          <div data-testid="transaction-timestamp" className="text-white-700">
            {timestamp} seconds ago
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row md:flex-col lg:gap-y-0 md:gap-y-4 gap-y-[52px]">
        {/* 2nd row */}
        <div className="flex flex-col gap-y-6 w-full">
          <div className="flex flex-col lg:flex-row md:flex-row gap-y-6">
            <div className="grow">
              <div className="flex flex-col gap-y-1">
                <div
                  data-testid="transaction-fee-title"
                  className="text-white-700"
                >
                  {fixedTitle.transactionFee}
                </div>
                <div>
                  <NumericFormat
                    data-testid="transaction-fee"
                    className="text-white-50"
                    thousandSeparator
                    value={transactionFee.value}
                    decimalScale={8}
                    suffix={` ${transactionFee.symbol}`}
                  />
                </div>
              </div>
            </div>
            <div className="grow">
              <div className="flex flex-col gap-y-1">
                <div
                  data-testid="transaction-block-title"
                  className="text-white-700"
                >
                  {fixedTitle.block}
                </div>
                <div className="flex flex-row gap-x-2.5 items-center">
                  <LinkText
                    testId="transaction-block"
                    label={block}
                    href={`/blocks/${block}`}
                  />
                </div>
              </div>
            </div>
            <div className="grow">
              <div className="flex flex-col gap-y-1">
                <div
                  data-testid="transaction-type-title"
                  className="text-white-700"
                >
                  {fixedTitle.trasactionType}
                </div>
                <div data-testid="transaction-type" className="text-white-50">
                  {transactionType}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-y-1">
              <div
                data-testid="transaction-nonce-title"
                className="text-white-700"
              >
                {fixedTitle.nonce}
              </div>
              <div data-testid="transaction-nonce" className="text-white-50">
                {nonce}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row md:flex-row gap-y-4 lg:gap-y-0 md:gap-y-0 w-full">
          <div className="grow">
            <div className="flex flex-col gap-y-1">
              <div
                data-testid="transaction-details-from-title"
                className="text-white-700"
              >
                {fixedTitle.from}
              </div>
              <div>
                {isFromAddressCopied ? (
                  <div className="flex flex-row gap-x-2.5 items-center">
                    <LinkText
                      testId="transaction-details-from-copied"
                      label={fixedTitle.copied}
                      href={`/address/${address.from}`}
                    />
                    <GreenTickIcon />
                  </div>
                ) : (
                  <div className="flex flex-row gap-x-2.5 items-center">
                    <LinkText
                      testId="transaction-details-from"
                      label={truncateTextFromMiddle(address.from)}
                      href={`/address/${address.from}`}
                    />
                    <FiCopy
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
          </div>
          <div className="grow">
            <div className="flex flex-col gap-y-1">
              <div
                data-testid="transaction-details-to-title"
                className="text-white-700"
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
                    label={truncateTextFromMiddle(address.to)}
                    href={`/address/${address.to}`}
                  />
                  <FiCopy
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

  const onRawInputClick = () => {
    if (isRawInputExpanded === false) {
      setIsRawInputExpanded(true);
    } else {
      setIsRawInputExpanded(false);
    }
  };

  return (
    <div>
      <div
        className={clsx(
          "flex flex-col lg:flex-row md:flex-row lg:gap-x-[143px] md:gap-x-10 gap-y-16",
          { "gap-y-0": type !== "tokenized" }
        )}
      >
        <div className="flex flex-col gap-y-6 lg:w-1/2 md:w-1/2">
          <div
            data-testid="transaction-gas-detail-title"
            className="text-white-50"
          >
            {fixedTitle.gasDetail}
          </div>
          <div className="flex flex-row">
            <div className="grow">
              <div
                data-testid="transaction-gas-price-title"
                className="text-white-700 w-[101px]"
              >
                {fixedTitle.gasPrice}
              </div>
            </div>
            <div className="flex lg:text-left md:text-left text-right">
              <NumericFormat
                data-testid="transaction-gas-price"
                className="text-white-50 whitespace-normal lg:w-[247px] md:w-[137px] w-[132px]"
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
                className="text-white-700 w-[67px]"
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

            <div className="flex lg:text-left md:text-left text-right">
              <div className="text-white-50 whitespace-normal lg:w-[247px] md:w-[137px] w-[132px]">
                {useUnitSuffix(gasLimit)}
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className=" grow">
              <div
                data-testid="transaction-gas-used-title"
                className="text-white-700 w-[101px]"
              >
                {fixedTitle.gasUsed}
              </div>
            </div>
            <div className="flex flex-col">
              <NumericFormat
                data-testid="transaction-gas-used"
                className="text-white-50 whitespace-normal lg:w-[247px] md:w-[137px] w-[132px] lg:text-left md:text-left text-right"
                thousandSeparator
                value={gasUsed}
                decimalScale={0}
              />
              <NumericFormat
                data-testid="transaction-gas-used-percentage"
                className="text-white-700 text-xs mt-1 lg:w-[247px] md:w-[137px] w-[132px] lg:text-left md:text-left text-right"
                thousandSeparator
                value={gasUsedPercentage}
                decimalScale={2}
                suffix="%"
              />
            </div>
          </div>
        </div>
        {type === "tokenized" && (
          <div className="flex flex-col gap-y-6 lg:w-1/2 md:w-1/2">
            <div
              data-testid="transaction-token-transferred-title"
              className="text-white-50"
            >
              {fixedTitle.tokenTransferred}
            </div>
            <div className="flex flex-row">
              <div className="grow">
                <div
                  data-testid="transaction-token-transferred-from-title"
                  className="text-white-700 w-[101px]"
                >
                  {fixedTitle.from}
                </div>
              </div>
              {isFromAddressCopied ? (
                <div
                  className={clsx(
                    "flex flex-row items-center gap-x-2.5 md:text-left lg:w-[247px] md:w-[136px] w-auto",
                    { "md:w-[155px] w-auto gap-x-0": isFromAddressCopied }
                  )}
                >
                  <div className={clsx({ "mr-[10px]": isFromAddressCopied })}>
                    <LinkText
                      testId="transaction-token-transferred-from-copied"
                      label={fixedTitle.copied}
                      href={`/address/${from}`}
                    />
                  </div>
                  <GreenTickIcon data-testid="transaction-token-transferred-from-green-tick-icon" />
                </div>
              ) : (
                <div
                  className={clsx(
                    "flex flex-row items-center gap-x-2.5 md:text-left lg:w-[247px] md:w-[137px] w-auto",
                    { "md:w-[155px] w-auto gap-x-0": isFromAddressCopied }
                  )}
                >
                  <div className={clsx({ "mr-[10px]": isFromAddressCopied })}>
                    <LinkText
                      testId="transaction-token-transferred-from"
                      label={truncateTextFromMiddle(from)}
                      href={`/address/${from}`}
                    />
                  </div>
                  <FiCopy
                    data-testid="transaction-token-transferred-from-copy-icon"
                    onClick={() =>
                      onCopyAddressIconClick(setIsFromAddressCopied, from)
                    }
                    className="text-white-50 h-[22px]"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-row">
              <div className="text-white-700 w-[101px] grow">
                {fixedTitle.to}
              </div>
              <div>
                {isToAddressCopied ? (
                  <div
                    className={clsx(
                      "flex flex-row items-center gap-x-2.5 md:text-left lg:w-[247px] md:w-[136px] w-auto",
                      { "md:w-[155px] w-auto gap-x-0": isToAddressCopied }
                    )}
                  >
                    <div className={clsx({ "mr-[10px]": isToAddressCopied })}>
                      <LinkText
                        testId="transaction-token-transferred-to-copied"
                        label={fixedTitle.copied}
                        href={`/address/${to}`}
                      />
                    </div>
                    <GreenTickIcon data-testid="transaction-token-transferred-to-green-tick-icon" />
                  </div>
                ) : (
                  <div
                    className={clsx(
                      "flex flex-row items-center gap-x-2.5 md:text-left lg:w-[247px] md:w-[137px] w-auto",
                      { "md:w-[155px] w-auto gap-x-0": isToAddressCopied }
                    )}
                  >
                    <div className={clsx({ "mr-[10px]": isToAddressCopied })}>
                      <LinkText
                        testId="transaction-token-transferred-to"
                        label={truncateTextFromMiddle(to)}
                        href={`/address/${to}`}
                      />
                    </div>
                    <FiCopy
                      data-testid="transaction-token-transferred-to-copy-icon"
                      onClick={() =>
                        onCopyAddressIconClick(setIsToAddressCopied, to)
                      }
                      className="text-white-50 h-[22px]"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-row">
              <div className="grow">
                <div
                  data-testid="transaction-token-transferred-for-title"
                  className="text-white-700 w-[101px]"
                >
                  {fixedTitle.for}
                </div>
              </div>
              <div className="flex lg:text-left md:text-left text-right">
                <NumericFormat
                  data-testid="transaction-token-transferred-for"
                  className="text-white-50 whitespace-normal lg:w-[247px] md:w-[137px] w-auto"
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
        <div
          data-testid="transaction-raw-input-title"
          className="text-white-50 lg:pb-6 lg:pt-14 md:pb-6 md:pt-14 pt-16 pb-6"
        >
          {fixedTitle.rawInput}
        </div>
        <div className="flex flex-row items-center mb-[14px] ">
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
            {isRawInputExpanded === true ? (
              <FiChevronDown className="text-white-700" />
            ) : (
              <FiChevronUp className="text-white-700" />
            )}
          </div>
        </div>

        {isRawInputExpanded === true && (
          <div
            data-testid="transaction-hex"
            className="font-space-mono tracking-[-0.04em] break-all lg:py-6 md:py-6 py-4 lg:px-10 md:px-8 px-4 border-[1px] border-black-600 rounded-lg text-white-50 text-xs"
          >
            {hex}
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

const fixedTitle = {
  transactionFee: "Transaction fee",
  block: "Block",
  trasactionType: "Transaction Type",
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
};

export default Transaction;
