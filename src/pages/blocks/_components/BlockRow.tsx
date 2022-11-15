import { FiBox } from "react-icons/fi";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import { truncateTextFromMiddle } from "shared/textHelper";
import LinkText from "@components/commons/LinkText";
import NumericFormat from "@components/commons/NumericFormat";
import { TimeComponent } from "@components/commons/TimeComponent";
import { BlocksI } from "../../../mockdata/BlockData";

export default function BlockRow({ data }: { data: BlocksI }) {
  return (
    <div>
      {/* for desktop and tablet */}
      <div className="hidden md:block">
        <div className="grid grid-cols-8 lg:grid-cols-12 gap-5 py-4">
          <div className="col-start-1 col-end-3">
            <BlockNumberComponent number={data.number} />
          </div>
          <div className="col-start-3 col-end-7 lg:col-start-3 lg:col-end-9 text-white-50">
            <div className="flex md:flex-col lg:flex-row">
              <RewardComponent
                amount={data.extraData?.reward ?? "0"}
                symbol={data.extraData?.symbol ?? ""}
                containerClass="lg:w-1/2"
              />
              <RecipientComponent
                value={data.miner}
                containerClass="ml-0 md:mt-4 lg:ml-2.5 lg:mt-0"
              />
            </div>
          </div>
          <div className="col-start-7 col-end-9 lg:col-start-9 lg:col-end-13 text-white-50">
            <div className="flex flex-col lg:flex-row justify-between">
              <TxnCountComponent
                count={data.transactions.length}
                containerClass="w-full text-start md:text-right lg:text-start lg:w-1/2"
              />
              <TimeComponent
                time={data.timestamp}
                containerClass="text-right md:mt-4 lg:mt-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* For mobile */}
      <div className="md:hidden py-6 z-10 mt-2">
        <BlockNumberComponent number={data.number} />
        <div className="ml-8">
          <RewardComponent
            amount={data.extraData?.reward ?? "0"}
            symbol={data.extraData?.symbol ?? ""}
            containerClass="mt-2"
          />
          <RecipientComponent value={data.miner} containerClass="mt-4" />
          <TxnCountComponent
            count={data.transactions.length}
            containerClass="mt-4"
          />
          <TimeComponent time={data.timestamp} containerClass="mt-4" />
        </div>
      </div>
      <div className="border-b border-black-600 ml-8 lg:ml-10" />
    </div>
  );
}

function BlockNumberComponent({ number }: { number: string }): JSX.Element {
  return (
    <div className="flex flex-row">
      <FiBox size={24} className="text-white-50 stroke-white-50" />
      <LinkText
        testId={`block-number-${number}`}
        href={`/blocks/${number}`}
        customStyle="ml-2 lg:ml-4"
      >
        <NumericFormat
          thousandSeparator
          value={number}
          decimalScale={0}
          prefix="#"
        />
      </LinkText>
    </div>
  );
}

function RewardComponent({
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
      <span className="text-white-700 text-base mr-1">Reward</span>
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

function RecipientComponent({
  value,
  containerClass,
}: {
  value: string;
  containerClass?: string;
}): JSX.Element {
  return (
    <div className={containerClass}>
      <span className="text-white-700 text-base mr-1">Fee recipient</span>
      <LinkText
        testId={`from-address-link-${value}`}
        href={`/address/${value}`}
        label={truncateTextFromMiddle(value)}
      />
    </div>
  );
}

function TxnCountComponent({
  count,
  containerClass,
}: {
  count: number;
  containerClass?: string;
}): JSX.Element {
  return (
    <div className={containerClass}>
      <NumericFormat
        className="text-white-700 text-base"
        thousandSeparator
        value={count.toString()}
        decimalScale={0}
        suffix=" transactions"
      />
    </div>
  );
}
