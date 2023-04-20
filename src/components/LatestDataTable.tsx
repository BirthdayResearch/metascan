import BigNumber from "bignumber.js";
import clsx from "clsx";
import { TransactionType } from "mockdata/TransactionData";
import { iconMapping as txnIconMapping } from "pages/txs/_components/TransactionRow";
import { FiBox } from "react-icons/fi";
import { DMX_TOKEN_SYMBOL } from "shared/constants";
import { getDuration } from "shared/durationHelper";
import { truncateTextFromMiddle } from "shared/textHelper";
import Button from "./commons/Button";
import GradientCardContainer from "./commons/GradientCardContainer";
import LinkText from "./commons/LinkText";
import NumericFormat from "./commons/NumericFormat";

type DataType = "blocks" | "transactions";

export interface TxnWalletInfo {
  from: string;
  to?: string;
  transactionType: TransactionType;
}

export interface BlockInfo {
  transactionsPerBlock: string;
  blockTimeInSec: string;
}

export interface RowData {
  transactionId: string;
  tokenAmount: string;
  txnOrBlockInfo: TxnWalletInfo | BlockInfo;
  time: number;
}

interface Props {
  type: DataType;
  title: string;
  data: RowData[];
  listPageUrl: string;
  detailsPageBaseUrl: string;
  containerClass?: string;
  amountLabel?: string;
}

export default function LatestDataTable({
  type,
  title,
  data,
  listPageUrl,
  detailsPageBaseUrl,
  amountLabel = "",
  containerClass = "",
}: Props): JSX.Element {
  return (
    <div
      data-testid={`latest-${type}-table`}
      className={`${containerClass ?? ""}`}
    >
      <GradientCardContainer>
        <div className="p-5 py-6 md:p-10">
          <div className="flex flex-col md:grid md:grid-cols-6 md:items-center">
            <h2
              data-testid={`latest-${type}-title`}
              className="text-white-50 font-bold text-xl md:text-2xl leading-8 pb-4 md:pb-0 md:col-span-3"
            >
              {title}
            </h2>
            <div className="md:order-last md:flex-1 md:pt-6 md:col-span-8">
              {data.map((row, index) => (
                <div key={row.transactionId}>
                  <RowItem
                    rowIndex={index}
                    type={type}
                    rowData={row}
                    amountLabel={amountLabel}
                    detailsPageBaseUrl={detailsPageBaseUrl}
                  />
                  <div
                    className={clsx(
                      "w-[calc(100% - 16px)] ml-8 h-5 border-b border-black-600",
                      { hidden: data.length === index + 1 }
                    )}
                  />
                </div>
              ))}
            </div>
            <div className="pt-10 md:pt-0 md:col-span-3 md:col-end-auto">
              <div className="md:flex md:justify-end md:text-rightt">
                <Button
                  testId={`view-${type}`}
                  label={`View all ${type}`}
                  href={listPageUrl}
                  customStyle="w-full md:w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </GradientCardContainer>
    </div>
  );
}

function RowItem({
  type,
  rowData,
  amountLabel,
  detailsPageBaseUrl,
  rowIndex,
}: {
  type: DataType;
  rowData: RowData;
  amountLabel: string;
  detailsPageBaseUrl: string;
  rowIndex: number;
}): JSX.Element {
  const { transactionId, tokenAmount, time, txnOrBlockInfo } = rowData;
  const detailsPageLink = `${detailsPageBaseUrl}/${transactionId}`;

  const iconMapping = {
    ...txnIconMapping,
    Block: FiBox,
  };
  const iconType =
    type === "blocks"
      ? "Block"
      : (txnOrBlockInfo as TxnWalletInfo).transactionType;
  const Icon = iconMapping[iconType];

  return (
    <div
      data-testid={`latest-${type}-row-${rowIndex}`}
      className="text-white-50 pt-5 md:flex md:flex-wrap md:items-start lg:flex-nowrap xl:gap-5"
    >
      <div
        data-testid={
          type === "blocks" ? `block-${rowIndex}` : `txn-hash-${rowIndex}`
        }
        className="w-2/4 inline-flex items-center md:w-32 lg:w-36"
      >
        <span className="mr-2">
          <Icon size={24} className="text-white-50 stroke-white-50" />
        </span>
        <LinkText
          testId={`details-page-link-${rowIndex}`}
          href={detailsPageLink}
        >
          {type === "blocks" ? (
            <NumericFormat
              thousandSeparator
              value={transactionId}
              decimalScale={0}
              prefix="#"
            />
          ) : (
            truncateTextFromMiddle(transactionId, 5)
          )}
        </LinkText>
      </div>
      <div className="w-2/4 inline-flex items-center justify-end text-white-700 text-right align-top md:order-last md:grow md:-mt-6 lg:mt-0 lg:w-20 xl:w-32 lg:pl-5 xl:pl-0">
        {getDuration(time)} ago
      </div>
      <div className="md:w-4/12 md:pl-5 ml-8 md:ml-0 lg:flex lg:w-96 lg:pl-12">
        {type === "blocks" ? (
          <BlockInfoDisplay
            block={transactionId}
            blockInfo={txnOrBlockInfo as BlockInfo}
          />
        ) : (
          <TxnWalletInfoDisplay txnInfo={txnOrBlockInfo as TxnWalletInfo} />
        )}
      </div>
      <div
        data-testid={`${type}-amount-${rowIndex}`}
        className="pt-2 pr-1 md:grow md:text-right md:p-0 ml-8 md:ml-0 lg:grow xl:w-2/5"
      >
        {amountLabel && (
          <span className="text-white-700 mr-1">{amountLabel}</span>
        )}
        <NumericFormat
          thousandSeparator
          value={new BigNumber(tokenAmount).toFixed(8)}
          decimalScale={8}
          suffix={` ${DMX_TOKEN_SYMBOL}`}
        />
      </div>
    </div>
  );
}

function BlockInfoDisplay({
  block,
  blockInfo,
}: {
  block: string;
  blockInfo: BlockInfo;
}): JSX.Element {
  return (
    <>
      <div className="flex pt-5 md:pt-0">
        <LinkText
          testId={`block-details-link-${block}`}
          href={`/txs?block=${block}`}
        >
          <NumericFormat
            thousandSeparator
            value={blockInfo.transactionsPerBlock}
            decimalScale={0}
            suffix=" transactions"
          />
        </LinkText>
      </div>
      <div className="flex pt-1.5 md:pt-2.5 lg:pt-0 lg:ml-1">
        {`in ${blockInfo.blockTimeInSec} sec`}
      </div>
    </>
  );
}

function TxnWalletInfoDisplay({
  txnInfo,
}: {
  txnInfo: TxnWalletInfo;
}): JSX.Element {
  return (
    <>
      <div className="flex pt-5 md:pt-0 lg:w-48">
        <span className="mr-1">From</span>
        <div className="w-4/5 lg:w-36">
          <LinkText
            testId={`from-address-link-${txnInfo.from}`}
            href={`/address/${txnInfo.from}`}
            label={truncateTextFromMiddle(txnInfo.from)}
          />
        </div>
      </div>
      {txnInfo.to && (
        <div className="flex pt-1.5 md:pt-2.5 lg:pt-0 lg:w-48  xl:ml-11">
          <span className="mr-1">To</span>
          <div className="w-4/5 lg:w-36">
            <LinkText
              testId={`to-address-link-${txnInfo.to}`}
              href={`/address/${txnInfo.to}`}
              label={truncateTextFromMiddle(txnInfo.to)}
            />
          </div>
        </div>
      )}
    </>
  );
}
