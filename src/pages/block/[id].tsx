import GradientCardContainer from "@components/commons/GradientCardContainer";
import LinkText from "@components/commons/LinkText";
import LinkTextWithIcon from "@components/commons/LinktextWithIcon";
import NumericFormat from "@components/commons/NumericFormat";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import useCopyToClipboard from "hooks/useCopyToClipboard";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiCopy } from "react-icons/fi";
import { MdCheckCircle } from "react-icons/md";
import { getDuration, getTimeAgo } from "shared/durationHelper";
import { truncateTextFromMiddle } from "shared/textHelper";
import { getRewards } from "shared/getRewards";
import { NetworkConnection } from "@contexts/Environment";
import BlocksApi from "@api/BlocksApi";
import { BlockProps } from "@api/types";

// TODO: Replace `any` with proper types
interface Props {
  block: BlockProps;
  // blockTransactions: any;
}

export default function Block({ block }: Props) {
  const router = useRouter();
  const blockNumber = new BigNumber(router.query.id as string);
  const prevBlockNumber = blockNumber.minus(1);
  const nextBlockNumber = blockNumber.plus(1); // TODO: check if nextBlockNumber exists when api is readys
  const timeago = getTimeAgo(block.timestamp);

  return (
    <div
      data-testid={`block-${blockNumber}-details-page`}
      className="px-1 md:px-0 mt-12"
    >
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer>
        <div data-testid="block-details" className="px-5 py-8 md:p-10">
          <div className="mb-6">
            <h2
              data-testid="block-details-title"
              className="font-bold text-xl text-white-50"
            >
              Block details
            </h2>
          </div>

          {/* Previous/Next buttons */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <LinkTextWithIcon
                testId="prev-block-link"
                href={`/block/${prevBlockNumber}`}
                label="Previous block"
                customStyle="text-xs"
                icon={{ Icon: FiArrowLeft, pos: "left", iconStyle: "pr-2" }}
              />
            </div>
            <div className="flex items-center">
              <LinkTextWithIcon
                testId="next-block-link"
                href={`/block/${nextBlockNumber}`}
                label="Next block"
                customStyle="text-xs"
                icon={{ Icon: FiArrowRight, pos: "right", iconStyle: "pl-2" }}
              />
            </div>
          </div>

          {/* Block number, timestamp */}
          <div className="pt-6 pb-8 flex flex-col md:flex-row justify-between items-start">
            <div
              data-testid="block-number"
              className="text-white-50 font-bold text-[32px]"
            >
              <NumericFormat
                thousandSeparator
                value={blockNumber}
                decimalScale={0}
                prefix="#"
              />
            </div>
            <div className="flex flex-col items-start md:items-end pt-6 md:pt-0">
              <div
                data-testid="block-txn-count"
                className="text-white-50 font-bold"
              >
                {block.tx_count} Transactions
              </div>
              <div className="text-white-700 mt-1 flex flex-col md:flex-row">
                <span className="order-last md:order-first pt-1 md:pt-0">
                  {getDuration(timeago)} ago
                </span>
                <span className="hidden md:inline">&nbsp;-&nbsp;</span>
                <span>{block.timestamp}</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="border-t border-black-600 pt-8 text-white-50 flex flex-col md:flex-row md:gap-5">
            <div className="w-full md:w-1/2">
              <FeeRecipientRow
                label="Fee recipient"
                feeRecipient={block.miner.hash}
              />
              <DetailRow
                testId="block-reward-amount"
                label="Reward"
                // TODO(pierregee): Dependent to how DMC rewards pass the data
                value={getRewards(block.rewards[0]).toFixed(8)}
              />
              <GasUsedRow
                label="Gas used"
                gasUsed={block.gas_used}
                gasPercentage={new BigNumber(block.gas_used_percentage).toFixed(
                  2
                )}
              />
              <DetailRow
                testId="gas-limit"
                label="Gas limit"
                value={block.gas_limit}
                decimalScale={0}
              />
            </div>
            <div className="w-full md:w-1/2">
              <DetailRow
                testId="base-fee"
                label="Base fee"
                value={new BigNumber(block.base_fee_per_gas).toFixed(8)}
              />
              <DetailRow
                testId="burnt-fee"
                label="Burnt fee"
                value={new BigNumber(block.burnt_fees).toFixed(8)}
              />
            </div>
          </div>
        </div>
      </GradientCardContainer>

      {/* Block transaction list */}
      {/* <div data-testid="block-transaction-list" className="mt-6">
        <BlockTransactionList
          blockNumber={blockNumber.toFixed(0)}
          blockTransactions={data.blockTransactions}
          pages={data.pages}
        />
      </div> */}
    </div>
  );
}

const style = {
  container: "flex gap-5 py-3 md:gap-0",
  labelWidth: "w-1/2 md:shrink-0 lg:w-1/3",
  valueWidth: "flex-1 text-right md:text-left",
};

function DetailRow({
  testId,
  label,
  value,
  decimalScale = 8,
  suffix = "",
}: {
  testId: string;
  label: string;
  value: string;
  decimalScale?: number;
  suffix?: string;
}): JSX.Element {
  return (
    <div className={clsx(style.container)}>
      <div
        data-testid={`${testId}-label`}
        className={clsx("text-white-700", style.labelWidth)}
      >
        {label}
      </div>
      <div
        data-testid={testId}
        className={clsx("text-white-50", style.valueWidth)}
      >
        <NumericFormat
          thousandSeparator
          value={value}
          decimalScale={decimalScale}
          suffix={suffix}
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
  const { copy } = useCopyToClipboard();
  const [showSuccessCopy, setShowSuccessCopy] = useState(false);

  useEffect(() => {
    if (showSuccessCopy) {
      setTimeout(() => setShowSuccessCopy(false), 3000);
    }
  }, [showSuccessCopy]);

  return (
    <div className={clsx("justify-between md:justify-start", style.container)}>
      <div
        data-testid="fee-recipient-label"
        className={clsx("text-white-700", style.labelWidth)}
      >
        {label}
      </div>
      {showSuccessCopy ? (
        <div data-testid="copy-success-msg" className="flex items-center">
          <span className="text-lightBlue">Copied!</span>
          <MdCheckCircle size={20} className="ml-2 text-green-800" />
        </div>
      ) : (
        <div className="flex">
          <LinkText
            testId="fee-recipient-mobile"
            href={`/address/${feeRecipient}`}
            label={truncateTextFromMiddle(feeRecipient, 4)}
            customStyle={clsx("inline-flex xl:hidden", style.valueWidth)}
          />
          <LinkText
            testId="fee-recipient-desktop"
            href={`/address/${feeRecipient}`}
            label={truncateTextFromMiddle(feeRecipient, 13)}
            customStyle={clsx("hidden xl:inline-flex", style.valueWidth)}
          />
          <FiCopy
            size={20}
            className="ml-2 self-center cursor-pointer"
            onClick={() => {
              copy(feeRecipient);
              setShowSuccessCopy(true);
            }}
          />
        </div>
      )}
    </div>
  );
}

function GasUsedRow({
  label,
  gasUsed,
  gasPercentage,
}: {
  label: string;
  gasUsed: string;
  gasPercentage: string;
}): JSX.Element {
  return (
    <div className={clsx(style.container)}>
      <div
        data-testid="gas-used-label"
        className={clsx("text-white-700", style.labelWidth)}
      >
        {label}
      </div>
      <div className={clsx(style.valueWidth)}>
        <div data-testid="gas-used" className="text-white-50">
          <NumericFormat
            thousandSeparator
            value={new BigNumber(gasUsed)}
            decimalScale={0}
          />
        </div>
        <div data-testid="gas-pct" className="text-white-700 text-xs pt-1">
          {gasPercentage}%
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (context.params?.id === undefined) {
    return null;
  }

  try {
    const block = await BlocksApi.getBlock(
      context.query.network as NetworkConnection,
      context.params.id as string
    );

    return { props: { block } };
  } catch (e) {
    return { notFound: true };
  }
}
