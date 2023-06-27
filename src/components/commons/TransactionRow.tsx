import BigNumber from "bignumber.js";
import clsx from "clsx";
import { truncateTextFromMiddle } from "shared/textHelper";
import LinkText from "@components/commons/LinkText";
import NumericFormat from "@components/commons/NumericFormat";
import { TimeComponent } from "@components/commons/TimeComponent";
import {
  RawTransactionI,
  TransactionStatus,
  TransactionType,
} from "@api/types";
import { transformTransactionData } from "shared/transactionDataHelper";
import { TokenTransferIcon } from "@components/icons/TokenTransfer";
import {
  FiFileText,
  FiFilePlus,
  FiPlusCircle,
  FiMinusCircle,
} from "react-icons/fi";
import { TransactionsIcon } from "@components/icons/Transactions";
import TransactionRowStatus from "./TransactionRowStatus";

export const iconMapping = {
  [TransactionType.Transaction]: TransactionsIcon,

  // TODO: add correct icon for each tx type
  [TransactionType.TokenMinting]: FiPlusCircle,
  [TransactionType.TokenBurning]: FiMinusCircle,
  [TransactionType.TokenTransfer]: TokenTransferIcon,
  [TransactionType.TokenCreate]: TransactionsIcon,
  [TransactionType.ContractCreation]: FiFilePlus,
  [TransactionType.ContractCall]: FiFileText,
  [TransactionType.Tokenized]: TransactionsIcon,
  [TransactionType.CoinTransfer]: TransactionsIcon,
};

export default function TransactionRow({
  rawData,
}: {
  rawData: RawTransactionI;
}) {
  const data = transformTransactionData(rawData);
  const Icon = iconMapping[data.transactionType];
  return (
    <div>
      {/* for desktop and tablet */}
      <div className="hidden md:block">
        <div className="grid grid-cols-8 xl:grid-cols-12 gap-5 py-4">
          <div className="col-start-1 col-end-3">
            <div className="flex flex-row">
              <Icon size={24} className="text-white-50 stroke-white-50" />
              <div className="flex flex-col overflow-hidden ml-2 xl:ml-4 text-base">
                <span className="text-white-50">{data.transactionType}</span>
              </div>
            </div>
            <TransactionLinkRow
              label="Hash"
              pathname={`/tx/${data.hash}`}
              value={data.hash}
              containerClass="flex flex-col xl:flex-row ml-8 xl:ml-10 mt-2 xl:mt-3"
            />
          </div>
          <div className="col-start-3 col-end-7 xl:col-start-4 xl:col-end-10">
            <AmountComponent amount={data.amount} symbol={data.symbol} />
            <div className="grid grid-cols-4 xl:grid-cols-6 gap-5 mt-2 xl:mt-3">
              <TransactionLinkRow
                label="From"
                pathname={`/address/${data.from}`}
                value={data.from}
                containerClass="flex flex-col xl:flex-row col-start-1 col-end-3"
              />
              {data.to && (
                <TransactionLinkRow
                  label="To"
                  pathname={`/address/${data.to}`}
                  value={data.to}
                  containerClass="flex flex-col xl:flex-row col-start-3 col-end-5"
                />
              )}
            </div>
          </div>
          <div className="col-start-7 col-end-9 xl:col-start-11 xl:col-end-13 justify-self-end">
            <StatusComponent status={data.status} />
            <div className="text-right mt-2 xl:mt-3">
              <TimeComponent time={data.timeInSec} />
            </div>
          </div>
        </div>
      </div>

      {/* For mobile */}
      <div className="md:hidden py-6">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <Icon size={24} className="text-white-50 stroke-white-50" />
            <div className="flex flex-col overflow-hidden ml-2 text-base">
              <span className="text-white-50">{data.transactionType}</span>
            </div>
          </div>
          <div className="text-right">
            <StatusComponent status={data.status} />
          </div>
        </div>
        <div className="ml-8">
          <AmountComponent
            amount={data.amount}
            symbol={data.symbol}
            containerClass="mt-4"
          />
          <TimeComponent time={data.timeInSec} containerClass="mt-4" />
          <TransactionLinkRow
            label="Hash"
            pathname={`/tx/${data.hash}`}
            value={data.hash}
            containerClass="flex flex-row mt-4 w-5/6"
          />
          <TransactionLinkRow
            label="From"
            pathname={`/address/${data.from}`}
            value={data.from}
            containerClass="flex flex-row mt-4 w-5/6"
          />
          <TransactionLinkRow
            label="To"
            pathname={`/address/${data.to}`}
            value={data.to}
            containerClass="flex flex-row mt-4 w-5/6"
          />
        </div>
      </div>
      <div className="border-b border-black-600 ml-8 xl:ml-10" />
    </div>
  );
}

function StatusComponent({
  status,
}: {
  status: TransactionStatus;
}): JSX.Element {
  return (
    <div className="flex flex-row">
      <span className="text-white-700 text-base hidden xl:block xl:mr-1">
        Status:
      </span>
      <TransactionRowStatus status={status} />
    </div>
  );
}

function AmountComponent({
  amount,
  symbol,
  containerClass,
}: {
  amount: string;
  symbol: string;
  containerClass?: string;
}): JSX.Element {
  return (
    <div className={clsx("flex flex-row", containerClass)}>
      <span className="hidden md:block text-white-700 text-base mr-1">
        Amount
      </span>
      <NumericFormat
        className="text-white-50 text-base font-bold"
        thousandSeparator
        value={new BigNumber(amount).toFixed(8)}
        decimalScale={8}
        suffix={` ${symbol}`}
      />
    </div>
  );
}

function TransactionLinkRow({
  pathname,
  value,
  label,
  containerClass,
}: {
  pathname: string;
  value: string;
  label: string;
  containerClass?: string;
}): JSX.Element {
  return (
    <div className={containerClass}>
      <span className="text-white-700 text-base mr-1 md:mr-0 xl:mr-1">
        {label}
      </span>
      <LinkText
        testId={`from-address-link-${value}`}
        href={pathname}
        label={truncateTextFromMiddle(value)}
      />
    </div>
  );
}
