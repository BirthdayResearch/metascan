import { FiFileText } from "react-icons/fi";
import { TransactionsIcon } from "@components/icons/Transactions";
import { NumericFormat } from "react-number-format";
import BigNumber from "bignumber.js";
import { ConfirmCheck } from "@components/icons/ConfirmCheck";
import { secondsToDhmsDisplay } from "@components/helpers/DurationHelper";
import { RejectedCross } from "@components/icons/RejectedCross";
import clsx from "clsx";
import { truncateTextFromMiddle } from "shared/textHelper";
import LinkText from "@components/commons/LinkText";
import {
  TransactionI,
  TransactionStatus,
  TransactionType,
} from "../../../mockdata/TransactionData";

const iconMapping = {
  [TransactionType.ContractCall]: FiFileText,
  [TransactionType.Transaction]: TransactionsIcon,
};

export default function TransactionRow({ data }: { data: TransactionI }) {
  const Icon = iconMapping[data.transactionType];
  return (
    <div>
      {/* for desktop and tablet */}
      <div className="hidden md:block">
        <div className="grid grid-cols-8 lg:grid-cols-12 gap-5 py-3.5 lg:py-4">
          <div className="col-start-1 col-end-3">
            <div className="flex flex-row">
              <Icon size={24} className="text-white-50 stroke-white-50" />
              <div className="flex flex-col overflow-hidden ml-2 lg:ml-4 text-base">
                <span className="text-white-50">{data.transactionType}</span>
              </div>
            </div>
            <TransactionLinkRow
              label="Hash:"
              pathname={`/transactions/${data.hash}`}
              value={data.hash}
              containerClass="flex flex-col lg:flex-row ml-8 lg:ml-10 mt-2 lg:mt-3"
            />
          </div>
          <div className="col-start-3 col-end-7 lg:col-start-4 lg:col-end-10 text-white-50">
            <AmountComponent amount={data.amount} symbol={data.symbol} />
            <div className="grid grid-cols-4 lg:grid-cols-6 gap-5 mt-2 lg:mt-3">
              <TransactionLinkRow
                label="From:"
                pathname={`/address/${data.hash}`}
                value={data.from}
                containerClass="flex flex-col lg:flex-row col-start-1 col-end-3"
              />
              <TransactionLinkRow
                label="To:"
                pathname={`/address/${data.hash}`}
                value={data.from}
                containerClass="flex flex-col lg:flex-row col-start-3 col-end-5"
              />
            </div>
          </div>
          <div className="col-start-7 col-end-9 lg:col-start-11 lg:col-end-13 text-white-50 justify-self-end">
            <StatusComponent status={data.status} />
            <div className="text-right mr-8 mt-2 lg:mt-3">
              <TimeComponent time={data.time} />
            </div>
          </div>
        </div>
      </div>

      {/* For mobile */}
      <div className="md:hidden py-6 z-10 mt-2">
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
          <TimeComponent time={data.time} containerClass="mt-4" />
          <TransactionLinkRow
            label="Hash:"
            pathname={`/transactions/${data.hash}`}
            value={data.hash}
            containerClass="flex flex-row mt-4 w-5/6"
          />
          <TransactionLinkRow
            label="From:"
            pathname={`/address/${data.from}`}
            value={data.hash}
            containerClass="flex flex-row mt-4 w-5/6"
          />
          <TransactionLinkRow
            label="To:"
            pathname={`/address/${data.to}`}
            value={data.hash}
            containerClass="flex flex-row mt-4 w-5/6"
          />
        </div>
      </div>
      <div className="border-b border-black-600 ml-8 md:ml-10" />
    </div>
  );
}

function StatusComponent({ status }: { status: string }): JSX.Element {
  const Icon =
    status === TransactionStatus.Confirmed ? ConfirmCheck : RejectedCross;
  return (
    <div className="flex flex-row">
      <span className="text-white-700 text-base hidden lg:block">Status:</span>
      <span
        className={clsx(
          "hidden md:block text-base lg:ml-1 mr-2",
          status === TransactionStatus.Confirmed
            ? "text-green-800"
            : "text-red-800"
        )}
      >
        {status}
      </span>
      <Icon size={24} />
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
        Amount:
      </span>
      <NumericFormat
        displayType="text"
        className="text-white-50 text-base font-bold"
        thousandSeparator
        value={new BigNumber(amount).toFixed(8)}
        decimalScale={8}
        suffix={` ${symbol}`}
      />
    </div>
  );
}

function TimeComponent({
  time,
  containerClass,
}: {
  time: number;
  containerClass?: string;
}): JSX.Element {
  return (
    <div className={containerClass}>
      <span className="text-white-700 text-base">
        {secondsToDhmsDisplay(time)} ago
      </span>
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
      <span className="text-white-700 text-base mr-1 md:mr-0 lg:mr-1">
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
