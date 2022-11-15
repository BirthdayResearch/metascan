import Container from "@components/commons/Container";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import { FiCopy } from "react-icons/fi";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { NumericFormat } from "react-number-format";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import transactionDetailData from "mockdata/TransactionDetailData";
import LinkText from "@components/commons/LinkText";
import { truncateTextFromMiddle } from "shared/textHelper";
import { Dispatch, SetStateAction, useState } from "react";
import BigNumber from "bignumber.js";
import { useUnitSuffix } from "hooks/useUnitSuffix";
import { InfoIcon } from "@components/icons/InfoIcon";
import Tooltip from "@components/commons/Tooltip";
import clsx from "clsx";
import { ConfirmCheck } from "@components/icons/ConfirmCheck";
import { RejectedCross } from "@components/icons/RejectedCross";
import { GreenTickIcon } from "@components/icons/GreenTickIcon";

const data = transactionDetailData.transactionDetailData;

function TransactionDetail() {
  return (
    <Container className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer>
        <div className="lg:p-10 md:p-10 p-5">
          <div className="flex flex-row py-4 mb-6">
            <span className="font-bold text-2xl text-white-50">
              Transaction details
            </span>
          </div>
          <TransactionDetailSegmentOne
            transactionID={data.transactions.transactionID}
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
  transactionID: string;
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
  transactionID,
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
  const [copyFromAddress, setCopyFromAddress] = useState(false);
  const [copyToAddress, setCopyToAddress] = useState(false);
  const [copyContractAddress, setCopyContractAddress] = useState(false);

  return (
    <div className="flex flex-col gap-y-10">
      {/* first row */}
      <div className="flex flex-col lg:flex-row md:flex-row gap-y-[41.5px]">
        {/* 1st flex */}
        <div className="flex flex-col grow gap-y-2">
          <div className="flex flex-row gap-x-2.5 items-center">
            <LinkText label={truncateTextFromMiddle(transactionID)} href="" />
            <FiCopy className="text-white-50" />
          </div>

          <NumericFormat
            displayType="text"
            className="text-white-50 lg:text-[32px] md:text-2xl text-xl"
            thousandSeparator
            value={
              type === "tokenized"
                ? BigNumber(tokenPrice.value).toFixed(8)
                : BigNumber("0").toFixed(2)
            }
            suffix={` ${tokenPrice.symbol}`}
          />

          <NumericFormat
            displayType="text"
            className="text-white-700"
            thousandSeparator
            value={
              type === "tokenized"
                ? BigNumber(valuePrice).toFixed(2)
                : BigNumber("0").toFixed(2)
            }
            prefix="$ "
          />
        </div>
        {/* 2nd flex */}
        <div className="flex flex-col lg:items-end md:items-end items-start">
          {status.toLowerCase() === "confirmed" ? (
            <div className="flex flex-row">
              <div className="text-green-800 lg:mb-[23px] md:mb-[14px] mb-[5.5px] lg:mr-[10.57px] md:mr-[10.57px] mr-[6.57px]">
                {status}
              </div>
              <ConfirmCheck />
            </div>
          ) : (
            <div className="flex flex-row">
              <div className="text-red-800 lg:mb-[23px] md:mb-[14px] mb-[5.5px]  lg:mr-[10.57px] md:mr-[10.57px] mr-[6.57px]">
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
            <div className="text-white-700 l">
              Confirmed by {blockNumber} blocks
            </div>
          </div>

          <div className="text-white-700">{timestamp} seconds ago</div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row md:flex-col lg:gap-y-0 md:gap-y-4 gap-y-[52px]">
        {/* 2nd row */}
        <div className="flex flex-col gap-y-6 w-full">
          <div className="flex flex-col lg:flex-row md:flex-row gap-y-6">
            <div className="grow">
              <div className="flex flex-col gap-y-1">
                <div className="text-white-700">{fixedTitle[0]}</div>
                <div>
                  <NumericFormat
                    displayType="text"
                    className="text-white-50"
                    thousandSeparator
                    value={new BigNumber(transactionFee.value).toFixed(8)}
                    decimalScale={8}
                    suffix={` ${transactionFee.symbol}`}
                  />
                </div>
              </div>
            </div>
            <div className="grow">
              <div className="flex flex-col gap-y-1">
                <div className="text-white-700">{fixedTitle[1]}</div>
                <div className="flex flex-row gap-x-2.5 items-center">
                  <LinkText label={block} href="" />
                </div>
              </div>
            </div>
            <div className="grow">
              <div className="flex flex-col gap-y-1">
                <div className="text-white-700">{fixedTitle[2]}</div>
                <div className="text-white-50">{transactionType}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-y-1">
              <div className="text-white-700">{fixedTitle[3]}</div>
              <div className="text-white-50">{nonce}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row md:flex-row gap-y-4 lg:gap-y-0 md:gap-y-0 w-full">
          <div className="grow">
            <div className="flex flex-col gap-y-1">
              <div className="text-white-700">{fixedTitle[4]}</div>
              <div>
                <div className="flex flex-row gap-x-2.5 items-center">
                  <CopyableText
                    label={truncateTextFromMiddle(address.from)}
                    onTextClick={setCopyFromAddress}
                    textClicked={copyFromAddress}
                  />
                  {copyFromAddress ? (
                    <div>
                      <GreenTickIcon />
                    </div>
                  ) : (
                    <FiCopy className="text-white-50 h-[22px]" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="grow">
            <div className="flex flex-col gap-y-1">
              <div className="text-white-700">{fixedTitle[5]}</div>
              <div>
                <div className="flex flex-row gap-x-2.5 items-center">
                  <CopyableText
                    label={truncateTextFromMiddle(address.to)}
                    onTextClick={setCopyToAddress}
                    textClicked={copyToAddress}
                  />
                  {copyToAddress ? (
                    <div>
                      <GreenTickIcon />
                    </div>
                  ) : (
                    <FiCopy className="text-white-50 h-[22px]" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-y-1">
              <div className="text-white-700">{fixedTitle[6]}</div>
              <div>
                <div className="flex flex-row gap-x-2.5 items-center">
                  <CopyableText
                    label={truncateTextFromMiddle(address.contractAddress)}
                    onTextClick={setCopyContractAddress}
                    textClicked={copyContractAddress}
                  />
                  {copyContractAddress ? (
                    <div>
                      <GreenTickIcon />
                    </div>
                  ) : (
                    <FiCopy className="text-white-50 h-[22px]" />
                  )}
                </div>
              </div>
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
  const [hexClick, setHexClick] = useState(false);
  const [copyFromAddress, setCopyFromAddress] = useState(false);
  const [copyToAddress, setCopyToAddress] = useState(false);

  const onHexClick = () => {
    if (hexClick === false) {
      setHexClick(true);
    } else {
      setHexClick(false);
    }
  };
  console.log(gasPrice.value);

  return (
    <div>
      <div
        className={clsx(
          "flex flex-col lg:flex-row md:flex-row lg:gap-x-[143px] md:gap-x-10 gap-y-16",
          { "gap-y-0": type !== "tokenized" }
        )}
      >
        <div className="flex flex-col gap-y-6 lg:w-1/2 md:w-1/2">
          <div className="text-white-50">{fixedTitle[7]}</div>
          <div className="flex flex-row">
            <div className="grow">
              <div className="text-white-700 w-[101px]">{fixedTitle[8]}</div>
            </div>
            <div className="flex lg:text-left md:text-left text-right">
              <NumericFormat
                displayType="text"
                className="text-white-50 whitespace-normal lg:w-[247px] md:w-[137px] w-[132px]"
                thousandSeparator
                value={BigNumber(gasPrice.value).toFixed(8)}
                decimalScale={8}
                suffix={` ${gasPrice.symbol}`}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-row items-center grow">
              <div className="text-white-700 w-[67px]">{fixedTitle[9]}</div>
              <Tooltip text={fixedTitle[9]}>
                <InfoIcon className="ml-[9.33px] mr-[8.67px]" />
              </Tooltip>
            </div>

            <div className="flex lg:text-left md:text-left text-right">
              <NumericFormat
                displayType="text"
                className="text-white-50 whitespace-normal lg:w-[247px] md:w-[137px] w-[132px]"
                thousandSeparator
                value={gasLimit}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className=" grow">
              <div className="text-white-700 w-[101px]">{fixedTitle[10]}</div>
            </div>
            <div className="flex flex-col">
              <NumericFormat
                displayType="text"
                className="text-white-50 whitespace-normal lg:w-[247px] md:w-[137px] w-[132px] lg:text-left md:text-left text-right"
                thousandSeparator
                value={useUnitSuffix(gasUsed)}
              />
              <NumericFormat
                displayType="text"
                className="text-white-700 text-xs mt-1 lg:w-[247px] md:w-[137px] w-[132px] lg:text-left md:text-left text-right"
                thousandSeparator
                value={BigNumber(gasUsedPercentage).toFixed(2)}
                suffix="%"
              />
            </div>
          </div>
        </div>
        {type === "tokenized" ? (
          <div className="flex flex-col gap-y-6 lg:w-1/2 md:w-1/2">
            <div className="text-white-50">{fixedTitle[11]}</div>
            <div className="flex flex-row">
              <div className="grow">
                <div className="text-white-700 w-[101px]">{fixedTitle[12]}</div>
              </div>

              <div
                className={clsx(
                  "flex flex-row items-center gap-x-2.5 md:text-left lg:w-[247px] md:w-[137px] w-auto",
                  { "md:w-[155px] w-auto gap-x-0": copyFromAddress }
                )}
              >
                <div className={clsx({ "mr-[10px]": copyFromAddress })}>
                  <CopyableText
                    label={truncateTextFromMiddle(from)}
                    onTextClick={setCopyFromAddress}
                    textClicked={copyFromAddress}
                  />
                </div>
                {copyFromAddress ? (
                  <div>
                    <GreenTickIcon />
                  </div>
                ) : (
                  <FiCopy className="text-white-50 h-[22px]" />
                )}
              </div>
            </div>
            <div className="flex flex-row">
              <div className="text-white-700 w-[101px] grow">
                {fixedTitle[13]}
              </div>
              <div
                className={clsx(
                  "flex flex-row items-center gap-x-2.5 md:text-left lg:w-[247px] md:w-[137px] w-auto",
                  { "md:w-[155px] w-auto gap-x-0": copyToAddress }
                )}
              >
                <div className={clsx({ "mr-[10px]": copyToAddress })}>
                  <CopyableText
                    label={truncateTextFromMiddle(to)}
                    onTextClick={setCopyToAddress}
                    textClicked={copyToAddress}
                  />
                </div>
                {copyToAddress ? (
                  <div>
                    <GreenTickIcon />
                  </div>
                ) : (
                  <FiCopy className="text-white-50 h-[22px]" />
                )}
              </div>
            </div>
            <div className="flex flex-row">
              <div className="grow">
                <div className="text-white-700 w-[101px]">{fixedTitle[14]}</div>
              </div>
              <div className="flex lg:text-left md:text-left text-right">
                <NumericFormat
                  displayType="text"
                  className="text-white-50 whitespace-normal lg:w-[247px] md:w-[137px] w-auto"
                  thousandSeparator
                  value={BigNumber(forToken.value).toFixed(8)}
                  decimalScale={8}
                  suffix={` ${forToken.symbol}`}
                />
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
      <div>
        <div className="text-white-50 lg:pb-6 lg:pt-14 md:pb-6 md:pt-14 pt-16 pb-6">
          {fixedTitle[15]}
        </div>
        <div className="flex flex-row items-center mb-[14px] ">
          <div
            role="button"
            tabIndex={0}
            onKeyDown={onHexClick}
            onClick={onHexClick}
            className="text-white-50 brand-gradient-1 bg-clip-text hover:text-transparent transition-all ease-in duration-300 pr-[10.29px]"
          >
            {fixedTitle[16]}
          </div>
          <div
            role="button"
            tabIndex={0}
            onKeyDown={onHexClick}
            onClick={onHexClick}
          >
            {hexClick === true ? (
              <AiOutlineDown className="text-white-700" />
            ) : (
              <AiOutlineUp className="text-white-700" />
            )}
          </div>
        </div>

        {hexClick === true ? (
          <div className="break-all py-6 lg:px-10 md:px-8 px-4 border-[1px] border-black-600 rounded-lg text-white-50 text-xs">
            {hex}
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

interface CopyableTextProps {
  onTextClick: Dispatch<SetStateAction<boolean>>;
  label: string;
  textClicked: boolean;
}

function CopyableText({ onTextClick, label, textClicked }: CopyableTextProps) {
  const onTextClickAction = () => {
    onTextClick(true);
  };
  if (textClicked) {
    return (
      <div className="flex flex-row">
        <div className="text-lightBlue brand-gradient-1 bg-clip-text hover:text-transparent transition-all ease-in duration-300">
          Address copied!
        </div>
      </div>
    );
  }
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={onTextClickAction}
      onClick={onTextClickAction}
      className="text-lightBlue brand-gradient-1 bg-clip-text hover:text-transparent transition-all ease-in duration-300"
    >
      {label}
    </div>
  );
}

const fixedTitle = [
  "Transaction fee",
  "Block",
  "Transaction Type",
  "Nonce",
  "From",
  "To",
  "Contract Address",
  "Gas detail",
  "Gas price",
  "Gas limit",
  "Gas used by transaction",
  "Token transferred",
  "From",
  "To",
  "For",
  "Raw input",
  "Hex (Default)",
];

export default TransactionDetail;
