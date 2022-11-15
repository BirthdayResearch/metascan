import Container from "@components/commons/Container";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import LinkText from "@components/commons/LinkText";
import NumericFormat from "@components/commons/NumericFormat";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import { useRouter } from "next/router";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { DMX_TOKEN_SYMBOL } from "shared/contants";
import { secondsToDhmsDisplay } from "shared/durationHelper";
import { truncateTextFromMiddle } from "shared/textHelper";

export default function Blocks({ data }) {
  const router = useRouter();
  const blockHeight = router.query.id;

  return (
    <Container className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer>
        <div className="px-5 py-8 md:p-10">
          <div className="mb-6">
            <h2 className="font-bold text-xl text-white-50">Block details</h2>
          </div>

          {/* Prev/Next buttons */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FiArrowLeft
                size={24}
                className="text-lightBlue mr-2 self-center"
              />
              <LinkText href="#" label="Previous block" customStyle="text-xs" />
            </div>
            <div className="flex items-center">
              <LinkText href="#" label="Next block" customStyle="text-xs" />
              <FiArrowRight
                size={24}
                className="text-lightBlue ml-2 self-center"
              />
            </div>
          </div>

          {/* Block number, timestamp */}
          <div className="pt-6 pb-8 flex flex-col md:flex-row justify-between items-start">
            <div className="text-white-50 font-bold text-[32px]">
              #{blockHeight}
            </div>
            <div className="flex flex-col items-start md:items-end pt-6 md:pt-0">
              <div className="text-white-50 font-bold">
                {data.transactionsPerBlock} Transactions
              </div>
              <div className="text-white-700 mt-1 flex flex-col md:flex-row">
                <span className="order-last md:order-first pt-1 md:pt-0">
                  {secondsToDhmsDisplay(data.time)} ago
                </span>
                <span className="hidden md:inline">&nbsp;-&nbsp;</span>
                <span>{data.datetime}</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="border-t border-black-600 pt-8 text-white-50 flex flex-col md:flex-row md:gap-5">
            {/* Left side */}
            <div className="w-full md:w-1/2">
              <FeeRecipientRow
                label="Fee recipient"
                feeRecipient={data.feeRecipient}
              />
              <DetailRow
                label="Reward"
                value={new BigNumber(data.rewardAmount).toFixed(8)}
              />
              <GasUsedRow
                label="Gas used"
                gasUsed={data.gasUsed}
                gasPercentage={data.gasPercentage}
              />
              <DetailRow
                label="Gas limit"
                value={data.gasLimit}
                decimalScale={0}
              />
            </div>
            {/* Right side */}
            <div className="w-full md:w-1/2">
              <DetailRow
                label="Base fee"
                value={new BigNumber(data.baseFee).toFixed(8)}
              />
              <DetailRow
                label="Burnt fee"
                value={new BigNumber(data.burntFee).toFixed(8)}
              />
            </div>
          </div>
        </div>
      </GradientCardContainer>
    </Container>
  );
}

const style = {
  container: "flex gap-5 py-3 md:gap-0",
  labelWidth: "w-1/2 md:1/4 lg:w-1/3",
  valueWidth: "flex-1 text-right md:flex-0 md:text-left",
};

function DetailRow({
  label,
  value,
  decimalScale = 8,
}: {
  label: string;
  value: string;
  decimalScale?: number;
}): JSX.Element {
  return (
    <div className={clsx(style.container)}>
      <div className={clsx("text-white-700", style.labelWidth)}>{label}</div>
      <div className={clsx("text-white-50", style.valueWidth)}>
        <NumericFormat
          thousandSeparator
          value={value}
          decimalScale={decimalScale}
          suffix={` ${DMX_TOKEN_SYMBOL}`}
        />
      </div>
    </div>
  );
}

function FeeRecipientRow({
  label,
  feeRecipient,
}: {
  label: string;
  feeRecipient: string;
}): JSX.Element {
  return (
    <div className={clsx(style.container)}>
      <div className={clsx("text-white-700", style.labelWidth)}>{label}</div>
      <span className={clsx("inline-block md:hidden", style.valueWidth)}>
        {truncateTextFromMiddle(feeRecipient, 4)}
      </span>
      <span
        className={clsx("hidden md:inline-block xl:hidden", style.valueWidth)}
      >
        {truncateTextFromMiddle(feeRecipient, 5)}
      </span>
      <span className={clsx("hidden xl:inline-block", style.valueWidth)}>
        {truncateTextFromMiddle(feeRecipient, 13)}
      </span>
      {/* TODO: Add copy icon and function */}
    </div>
  );
}

function GasUsedRow({
  label,
  gasUsed,
  gasPercentage,
}: {
  label: string;
  gasUsed: number;
  gasPercentage: number;
}): JSX.Element {
  return (
    <div className={clsx(style.container)}>
      <div className={clsx("text-white-700", style.labelWidth)}>{label}</div>
      <div className={clsx(style.valueWidth)}>
        <div className="text-white-50">
          <NumericFormat
            thousandSeparator
            value={new BigNumber(gasUsed).toFixed(0)}
            decimalScale={0}
          />
        </div>
        <div className="text-white-700 text-xs pt-1">{gasPercentage}%</div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // TODO: Fetch data from external API
  const data = {
    blockHeight: 21002,
    transactionsPerBlock: 34,
    feeRecipient: "0xaab27b150451726ecsds38aa1d0a94505c8729bd1",
    time: 2040,
    datetime: "09/12/2023 12:45:23 PM + 7 UTC",
    rewardAmount: "120.324003",
    gasUsed: 12234,
    gasPercentage: 0.5,
    gasLimit: "40000000",
    baseFee: "0.00004242",
    burntFee: "0.13818798",
  };

  // Pass data to the page via props
  return { props: { data } };
}
