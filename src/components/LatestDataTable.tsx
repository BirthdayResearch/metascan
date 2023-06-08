import BigNumber from "bignumber.js";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import { iconMapping as txnIconMapping } from "@components/commons/TransactionRow";
import { FiBox } from "react-icons/fi";
import { DMX_TOKEN_SYMBOL } from "shared/constants";
import { getDuration } from "shared/durationHelper";
import { truncateTextFromMiddle } from "shared/textHelper";
import { TransactionType } from "@api/types";
import Button from "./commons/Button";
import GradientCardContainer from "./commons/GradientCardContainer";
import LinkText from "./commons/LinkText";
import NumericFormat from "./commons/NumericFormat";
import {
  SkeletonLoader,
  SkeletonLoaderScreen,
} from "./skeletonLoaders/SkeletonLoader";

type DataType = "blocks" | "transactions";

export interface TxnWalletInfo {
  from: string;
  to: string | null;
  transactionType: TransactionType;
}

export interface BlockInfo {
  transactionsPerBlock: string;
  blockTimeInSec: string | null;
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
  isLoading?: boolean;
}

export default function LatestDataTable({
  type,
  title,
  data,
  listPageUrl,
  detailsPageBaseUrl,
  isLoading,
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
              {isLoading ? (
                <SkeletonLoader
                  screen={SkeletonLoaderScreen.MainTable}
                  rows={5}
                />
              ) : (
                <>
                  {data.map((row, index) => (
                    <div key={row.transactionId}>
                      {type === "blocks" ? (
                        <BlockRowItem
                          rowIndex={index}
                          rowData={row}
                          detailsPageBaseUrl={detailsPageBaseUrl}
                        />
                      ) : (
                        <RowItem
                          rowIndex={index}
                          rowData={row}
                          detailsPageBaseUrl={detailsPageBaseUrl}
                        />
                      )}

                      <div
                        className={clsx(
                          "w-[calc(100% - 16px)] h-7 md:h-5 border-b border-black-600",
                          { hidden: data.length === index + 1 }
                        )}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="pt-[45px] md:pt-0 md:col-span-3 md:col-end-auto">
              <div className="md:flex md:justify-end md:text-right">
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
  rowData,
  detailsPageBaseUrl,
  rowIndex,
}: {
  rowData: RowData;
  detailsPageBaseUrl: string;
  rowIndex: number;
}): JSX.Element {
  const { transactionId, tokenAmount, time, txnOrBlockInfo } = rowData;
  const txnInfo = txnOrBlockInfo as TxnWalletInfo;
  const iconType = (txnOrBlockInfo as TxnWalletInfo).transactionType;
  const Icon = txnIconMapping[iconType];
  return (
    <div
      data-testid={`latest-txns-row-${rowIndex}`}
      className="text-white-50 pt-5 md:flex md:flex-wrap md:items-start lg:flex-nowrap xl:gap-5"
    >
      <div
        data-testid={`txn-hash-${rowIndex}`}
        className="w-2/4 inline-flex items-center md:w-32 lg:w-36"
      >
        <span className="mr-2">
          <Icon size={24} className="text-white-50 stroke-white-50" />
        </span>
        <LinkText
          testId={`details-page-link-${rowIndex}`}
          href={`${detailsPageBaseUrl}/${transactionId}`}
        >
          {truncateTextFromMiddle(transactionId, 5)}
        </LinkText>
      </div>
      <div className="w-2/4 inline-flex items-center justify-end text-white-700 text-right align-top md:order-last md:grow md:-mt-6 lg:mt-0 lg:w-20 xl:w-32 lg:pl-5 xl:pl-0">
        {getDuration(time)} ago
      </div>
      <div className="md:w-4/12 md:pl-5 ml-8 md:ml-0 lg:flex lg:w-96 lg:pl-12">
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
      </div>
      <div
        data-testid={`txn-amount-${rowIndex}`}
        className={clsx(
          "flex justify-between gap-2 pt-2 pr-1 md:grow md:text-right md:p-0 ml-8 md:ml-0 lg:grow xl:w-2/5",
          "md:flex-col md:justify-end",
          "lg:flex-row"
        )}
      >
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

function BlockRowItem({
  rowData,
  detailsPageBaseUrl,
  rowIndex,
}: {
  rowData: RowData;
  detailsPageBaseUrl: string;
  rowIndex: number;
}): JSX.Element {
  const { transactionId, tokenAmount, time, txnOrBlockInfo } = rowData;
  const timeAgo = `${getDuration(time)} ago`;
  return (
    <div
      data-testid={`latest-blocks-row-${rowIndex}`}
      className={clsx(
        "grid grid-cols-1 gap-4 text-white-50 pt-7 ",
        "md:grid-cols-3 md:gap-2 md:pt-5",
        "xl:grid-cols-4 xs:flex xs:flex-col"
      )}
    >
      <div
        data-testid={`block-${rowIndex}`}
        className="inline-flex items-center flex-wrap xs:flex-nowrap gap-2 md:gap-4 xl:gap-2"
      >
        <span className="xs:hidden">
          <FiBox size={24} className="text-white-50 stroke-white-50" />
        </span>
        <div className="flex md:flex-col gap-2 grow justify-between items-start">
          <LinkText
            testId={`details-page-link-${rowIndex}`}
            href={`${detailsPageBaseUrl}/${transactionId}`}
          >
            <NumericFormat value={transactionId} decimalScale={0} prefix="#" />
          </LinkText>
          {/* Time ago on mobile/table */}
          <div className="text-white-700 text-end xl:hidden">{timeAgo}</div>
        </div>
      </div>
      <WithLabel testId={`block-txns-${rowIndex}`} label="Transactions">
        <LinkText
          testId={`block-details-link-${transactionId}`}
          href={`/block/${transactionId}`}
        >
          <NumericFormat
            thousandSeparator
            value={(txnOrBlockInfo as BlockInfo).transactionsPerBlock}
            decimalScale={0}
            suffix=" txns"
          />
        </LinkText>
      </WithLabel>
      <div className="md:text-end">
        <WithLabel testId={`block-reward-${rowIndex}`} label="Reward">
          <NumericFormat
            thousandSeparator
            value={new BigNumber(tokenAmount).toFixed(8)}
            decimalScale={8}
            suffix={` ${DMX_TOKEN_SYMBOL}`}
          />
        </WithLabel>
      </div>
      {/* Time ago for desktop */}
      <div className="text-white-700 text-end hidden xl:block">{timeAgo}</div>
    </div>
  );
}

function WithLabel({
  label,
  testId,
  children,
}: PropsWithChildren<{ label: string; testId: string }>) {
  return (
    <div
      data-testid={testId}
      className={clsx(
        "flex justify-between gap-2 flex-wrap",
        "md:flex-col md:justify-start md:pt-0",
        "xl:flex-row xs:flex-col"
      )}
    >
      <div className="inline-block text-white-700">
        <span>{label}</span>
        <span className="hidden xl:inline">:</span>
      </div>
      {children}
    </div>
  );
}
