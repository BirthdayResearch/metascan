import BigNumber from "bignumber.js";
import clsx from "clsx";
import { DMX_TOKEN_SYMBOL } from "shared/constants";
import { getDuration } from "shared/durationHelper";
import { truncateTextFromMiddle } from "shared/textHelper";
import { iconMapping } from "@components/commons/TransactionRow";
import { RowData, TxnWalletInfo } from "@components/types";
import LinkText from "@components/commons/LinkText";
import NumericFormat from "@components/commons/NumericFormat";

export default function TransactionRowItem({
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
  const Icon = iconMapping[iconType];
  const timeAgo = `${getDuration(time)} ago`;
  return (
    <div
      data-testid={`latest-txns-row-${rowIndex}`}
      className={clsx(
        "grid grid-cols-1 gap-2 text-white-50 pt-7 ",
        "md:grid-cols-4 md:gap-5 md:pt-5",
        "xl:grid-cols-6 xl:gap-x-9",
        "2.5xl:gap-x-12",
      )}
    >
      <div
        data-testid={`txn-hash-${rowIndex}`}
        className="inline-flex xl:items-center"
      >
        <span className="mr-2 xs:hidden">
          <Icon size={24} className="text-white-50 stroke-white-50" />
        </span>
        <div className="flex gap-2 grow justify-between items-start">
          <LinkText
            testId={`details-page-link-${rowIndex}`}
            href={`${detailsPageBaseUrl}/${transactionId}`}
          >
            {truncateTextFromMiddle(transactionId, 5)}
          </LinkText>
          {/* Txs time ago for mobile */}
          <div className={clsx("text-white-700 md:hidden md:text-right")}>
            {timeAgo}
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "flex flex-col flex-wrap gap-2 ml-8 mt-[14px]",
          "md:flex-row md:items-center md:ml-0 md:mt-0",
          "xl:col-span-3 xl:grid xl:grid-cols-2 xs:ml-0",
        )}
      >
        <div className="inline-flex gap-1 md:justify-center">
          <span>From</span>
          <LinkText
            testId={`from-address-link-${txnInfo.from}`}
            href={`/address/${txnInfo.from}`}
            label={truncateTextFromMiddle(txnInfo.from)}
          />
        </div>
        {txnInfo.to && (
          <div className="inline-flex gap-1">
            <span>To</span>
            <div>
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
          "flex flex-col justify-between ml-8",
          "md:col-span-2 md:text-right md:ml-0",
          "xl:grid xl:grid-cols-2 xl:gap-2 xs:ml-0",
        )}
      >
        <NumericFormat
          thousandSeparator
          value={new BigNumber(tokenAmount).toFixed(8)}
          decimalScale={8}
          suffix={` ${DMX_TOKEN_SYMBOL}`}
        />
        {/* Txs time ago for tablet and desktop */}
        <div className={clsx("text-white-700 hidden md:block md:text-right")}>
          {timeAgo}
        </div>
      </div>
    </div>
  );
}
