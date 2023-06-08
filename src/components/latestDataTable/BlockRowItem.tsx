import BigNumber from "bignumber.js";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import { FiBox } from "react-icons/fi";
import { getDuration } from "shared/durationHelper";
import { DMX_TOKEN_SYMBOL } from "shared/constants";
import { BlockInfo, RowData } from "@components/types";
import LinkText from "@components/commons/LinkText";
import NumericFormat from "@components/commons/NumericFormat";

export default function BlockRowItem({
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
          {/* Blocks time ago on mobile and desktop */}
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
      {/* Blocks time ago for tablet */}
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
