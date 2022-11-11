import MiddleEllipsis from "react-middle-ellipsis";
import Button from "./Button";
import GradientCardContainer from "./GradientCardContainer";
import LinkText from "./LinkText";

type DataType = "blocks" | "transactions";

export interface TxnWalletInfo {
  from: string;
  to: string;
}

export interface BlockInfo {
  transactionsPerBlock: string;
  blockTimeInSec: string;
}

export interface RowData {
  id: string;
  transactionId: string;
  tokenAmount: string;
  txnOrBlockInfo: TxnWalletInfo | BlockInfo;
  datetime: string;
}

interface Props {
  type: DataType;
  title: string;
  data: RowData[];
  containerClass?: string;
  amountPrefix?: string;
}

export default function TransactionTable({
  type,
  title,
  data,
  amountPrefix = "",
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
                <RowItem
                  key={row.id}
                  rowIndex={index}
                  type={type}
                  rowData={row}
                  amountPrefix={amountPrefix}
                />
              ))}
            </div>
            <div className="pt-5 md:pt-0 md:col-span-3 md:col-end-auto">
              <div className="md:flex md:justify-end md:text-rightt">
                <Button
                  testId={`view-${type}`}
                  label={`View all ${type}`}
                  href={`/${type}`}
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

const DmxTokenSymbol = "DMXTc";
function RowItem({
  type,
  rowData,
  amountPrefix,
  rowIndex,
}: {
  type: DataType;
  rowData: RowData;
  amountPrefix: string;
  rowIndex: number;
}): JSX.Element {
  const { transactionId, tokenAmount, datetime, txnOrBlockInfo } = rowData;
  const detailsPageLink = `/${type}/${transactionId}`;
  return (
    <div
      data-testid={`latest-${type}-row-${rowIndex}`}
      className="text-white-50 py-5 border-b border-gray-1000/50 md:flex md:flex-wrap md:items-start lg:flex-nowrap xl:gap-5"
    >
      <div
        data-testid={
          type === "blocks" ? `block-${rowIndex}` : `txn-hash-${rowIndex}`
        }
        className="w-2/4 inline-flex items-center md:w-32 lg:w-36"
      >
        <MiddleEllipsis>
          <LinkText
            testId={`details-page-link-${rowIndex}`}
            href={detailsPageLink}
            label={transactionId}
          />
        </MiddleEllipsis>
      </div>
      <div className="w-2/4 inline-flex items-center justify-end text-white-700 text-right md:order-last md:grow md:-mt-6 lg:mt-0 lg:w-20 xl:w-32 lg:pl-5 xl:pl-0">
        {datetime}
      </div>
      <div className="md:w-4/12 lg:flex lg:w-96 lg:pl-12">
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
        className="pt-5 pr-1 md:grow md:text-right md:p-0 lg:grow xl:w-2/5"
      >
        {amountPrefix && (
          <span className="text-white-700">{amountPrefix}&nbsp;</span>
        )}
        {tokenAmount} {DmxTokenSymbol}
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
          href={`/transactions?block=${block}`}
          label={`${blockInfo.transactionsPerBlock} Transactions`}
        />
      </div>
      <div className="flex pt-1.5 md:pt-2.5 lg:pt-0">
        &nbsp;{`in ${blockInfo.blockTimeInSec} sec`}
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
        <span className="pr-1">From: </span>
        <div className="w-4/5 lg:w-36">
          <MiddleEllipsis>
            <LinkText
              testId={`from-address-link-${txnInfo.from}`}
              href={`/address/${txnInfo.from}`}
              label={txnInfo.from}
            />
          </MiddleEllipsis>
        </div>
      </div>
      <div className="flex pt-1.5 md:pt-2.5 lg:pt-0 lg:w-48  xl:ml-11">
        <span className="pr-1">To: </span>
        <div className="w-4/5 lg:w-36">
          <MiddleEllipsis>
            <LinkText
              testId={`to-address-link-${txnInfo.to}`}
              href={`/address/${txnInfo.to}`}
              label={txnInfo.to}
            />
          </MiddleEllipsis>
        </div>
      </div>
    </>
  );
}
