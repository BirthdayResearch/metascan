import { FiBox } from "react-icons/fi";
import clsx from "clsx";
import { truncateTextFromMiddle } from "shared/textHelper";
import LinkText from "@components/commons/LinkText";
import NumericFormat from "@components/commons/NumericFormat";
import { TimeComponent } from "@components/commons/TimeComponent";
import { getTimeAgo } from "shared/durationHelper";

// Used the data returned from API as is (snake_case) to reduce the number of loops,
export default function BlockRow({ data }: { data: any }) {
  const timestamp = getTimeAgo(data.timestamp);
  return (
    <div>
      {/* for desktop and tablet */}
      <div className="hidden md:block">
        <div className="grid grid-cols-8 lg:grid-cols-12 gap-5 py-4">
          <div className="col-start-1 col-end-3">
            <BlockHeightComponent blockHeight={data.height} />
          </div>
          <div className="col-start-3 col-end-7 lg:col-start-3 lg:col-end-9">
            <div className="flex md:flex-col lg:flex-row">
              <RewardComponent
                // TODO(Pierre): Dependent to how DMC would return the rewards
                amount={data.rewards[0] ?? "0"}
                symbol="DFI"
                containerClass="lg:w-1/2"
              />
              <RecipientComponent
                value={data.miner.hash}
                containerClass="ml-0 md:mt-4 lg:ml-2.5 lg:mt-0"
              />
            </div>
          </div>
          <div className="col-start-7 col-end-9 lg:col-start-9 lg:col-end-13">
            <div className="flex flex-col lg:flex-row justify-between">
              <TxnCountComponent
                count={data.tx_count}
                containerClass="w-full text-start md:text-right lg:text-start lg:w-1/2"
              />
              <TimeComponent
                time={timestamp}
                containerClass="text-right md:mt-4 lg:mt-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* For mobile */}
      <div className="md:hidden py-6">
        <BlockHeightComponent blockHeight={data.height} />
        <div className="ml-8">
          <RewardComponent
            amount={data.rewards[0] ?? "0"}
            symbol="DFI"
            containerClass="mt-2"
          />
          <RecipientComponent value={data.miner.hash} containerClass="mt-4" />
          <TxnCountComponent count={data.tx_count} containerClass="mt-4" />
          <TimeComponent time={timestamp} containerClass="mt-4" />
        </div>
      </div>
      <div className="border-b border-black-600 ml-8 lg:ml-10" />
    </div>
  );
}

function BlockHeightComponent({
  blockHeight,
}: {
  blockHeight: string;
}): JSX.Element {
  return (
    <div className="flex flex-row">
      <FiBox size={24} className="text-white-50 stroke-white-50" />
      <LinkText
        testId={`block-number-${blockHeight}`}
        href={`/block/${blockHeight}`}
        customStyle="ml-2 lg:ml-4"
      >
        <NumericFormat
          thousandSeparator
          value={blockHeight}
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
        className="text-white-50 text-base"
        thousandSeparator
        value={amount}
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
        label={truncateTextFromMiddle(value, 4)}
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
        value={count}
        decimalScale={0}
        suffix=" transactions"
      />
    </div>
  );
}
