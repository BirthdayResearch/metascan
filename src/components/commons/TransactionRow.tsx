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
  const fromPathname = `/address/${data.from}`;
  const toPathName = `/address/${data.to}`;

  return (
    <div>
      {/* for desktop and tablet */}
      <div className="hidden md:block">
        <div className="grid grid-cols-8 xl:grid-cols-12 gap-x-5 gap-y-3 py-4">
          <div className="col-start-1 col-end-3">
            <div className="flex gap-2 md:gap-4 items-center">
              <div>
                <Icon size={24} className="text-white-50 stroke-white-50" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-col overflow-hidden text-base">
                  <span className="text-white-50">{data.transactionType}</span>
                </div>
                <TransactionLinkRow
                  label="Hash"
                  pathname={`/tx/${data.hash}`}
                  value={data.hash}
                  containerClass="flex gap-1"
                />
              </div>
            </div>
          </div>
          <div
            className={clsx(
              "col-start-1 col-end-7 ml-10 lg:ml-0",
              "lg:col-start-4 lg:col-end-8",
              "xl:col-start-5 xl:col-end-10"
            )}
          >
            <AmountComponent amount={data.amount} symbol={data.symbol} />
            <div className="grid grid-cols-12 gap-1 mt-1">
              <TransactionLinkRow
                label="From"
                pathname={fromPathname}
                value={data.from}
                containerClass="flex gap-1 col-start-1 col-end-6"
              />
              {data.to && (
                <TransactionLinkRow
                  label="To"
                  pathname={toPathName}
                  value={data.to}
                  containerClass="flex gap-1 col-start-6 lg:col-start-7 xl:col-start-6 col-end-12"
                />
              )}
            </div>
          </div>
          <div className="row-start-1 col-start-7 md:col-start-4 lg:col-start-8 col-end-9 xl:col-start-11 xl:col-end-13 justify-self-end">
            <StatusComponent status={data.status} />
            <div className="text-right mt-1">
              <TimeComponent time={data.timeInSec} />
            </div>
          </div>
        </div>
      </div>

      {/* For mobile */}
      <div className="md:hidden pt-4 pb-4">
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
            containerClass="mt-2"
          />
          <TimeComponent time={data.timeInSec} containerClass="mt-1" />
          <TransactionLinkRow
            label="Hash"
            pathname={`/tx/${data.hash}`}
            value={data.hash}
            containerClass="flex flex-row mt-4 w-5/6"
          />
          <TransactionLinkRow
            label="From"
            pathname={fromPathname}
            value={data.from}
            containerClass="flex flex-row mt-2 w-5/6"
          />
          <TransactionLinkRow
            label="To"
            pathname={toPathName}
            value={data.to}
            containerClass="flex flex-row mt-2 w-5/6"
          />
        </div>
      </div>
      <div className="border-b border-black-600" />
    </div>
  );
}

function StatusComponent({
  status,
}: {
  status: TransactionStatus;
}): JSX.Element {
  return (
    <div className="flex flex-row justify-end">
      <span className="text-white-700 text-base hidden md:block md:mr-1">
        Status
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
        className="text-white-50 text-base font-semibold md:font-bold break-all"
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
