import BigNumber from "bignumber.js";
import { formatEther, formatUnits } from "viem";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import LinkTextWithIcon from "@components/commons/LinktextWithIcon";
import NumericFormat from "@components/commons/NumericFormat";
import TransactionDetails from "@components/TransactionDetails";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import {
  formatDateToUTC,
  getDuration,
  getTimeAgo,
} from "shared/durationHelper";
import { isNumeric } from "shared/textHelper";
import { getRewards } from "shared/getRewards";
import { NetworkConnection } from "@contexts/Environment";
import BlocksApi from "@api/BlocksApi";
import {
  BlockProps,
  RawTransactionI,
  TxnNextPageParamsProps,
} from "@api/types";
import { GWEI_DECIMAL } from "shared/constants";
import AddressRow from "./_components/AddressRow";
import DetailRow from "./_components/DetailRow";
import GasUsedRow from "./_components/GasUsedRow";

interface PageProps {
  block: BlockProps;
  blockTransactions: {
    transactions: RawTransactionI[];
    nextPageParams: TxnNextPageParamsProps;
  };
}

export default function Block({
  data: { block, blockTransactions },
  isLoading,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const blockNumber = new BigNumber(block.height);
  const prevBlockNumber = blockNumber.minus(1);
  const nextBlockNumber = blockNumber.plus(1);
  const timeago = getTimeAgo(block.timestamp);
  const timeDuration = getDuration(Number(timeago));
  const timeInUTC = formatDateToUTC(block.timestamp);

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
              <NumericFormat value={blockNumber} decimalScale={0} prefix="#" />
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
                  {`${timeDuration} ago (${timeInUTC} +UTC)`}
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="border-t border-black-600 pt-8 text-white-50 flex flex-col md:flex-row md:gap-5">
            <div className="w-full md:w-1/2">
              <AddressRow
                testId="block-hash"
                label="Hash"
                address={block.hash}
                disableLink
              />
              <AddressRow
                testId="fee-recipient"
                label="Fee recipient"
                address={block.miner.hash}
              />
              <AddressRow
                testId="parent-hash"
                label="Parent Hash"
                address={block.parent_hash}
              />
              <DetailRow
                testId="block-size"
                label="Size"
                value={`${block.size}`}
                decimalScale={0}
                suffix=" bytes"
              />
              <DetailRow
                testId="block-reward-amount"
                label="Reward"
                value={getRewards(block.rewards)}
                suffix=" DFI"
              />
            </div>
            <div className="w-full md:w-1/2">
              <DetailRow
                testId="base-fee"
                label="Base fee"
                value={formatUnits(
                  BigInt(block.base_fee_per_gas ?? "0"),
                  GWEI_DECIMAL
                ).toString()}
                decimalScale={9}
                suffix=" Gwei" // TODO: Confirm if this is Gwei, DFI or ETH
              />
              <DetailRow
                testId="burnt-fee"
                label="Burnt fee"
                value={formatEther(BigInt(block.burnt_fees ?? "0"))}
                decimalScale={10}
                suffix=" DFI" // TODO: Confirm if this is DFI or ETH
              />
              <DetailRow
                testId="gas-limit"
                label="Gas limit"
                value={block.gas_limit}
                decimalScale={0}
              />
              <GasUsedRow
                label="Gas used"
                gasUsed={block.gas_used}
                gasPercentage={new BigNumber(block.gas_used_percentage).toFixed(
                  2
                )}
              />
            </div>
          </div>
        </div>
      </GradientCardContainer>

      {/* Block transaction list */}
      <div data-testid="block-transaction-list" className="mt-6">
        <GradientCardContainer className="relative">
          <div className="md:p-10 p-5">
            <div className="flex flex-col md:pt-[3.67px] pt-[23.67px]">
              <TransactionDetails
                data={{
                  transactions: blockTransactions.transactions,
                  nextPageParams: blockTransactions.nextPageParams,
                }}
                pathname={`/block/${blockNumber}`}
                type="block"
                isLoading={isLoading}
              />
            </div>
          </div>
        </GradientCardContainer>
      </div>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ data: PageProps; isLoading?: boolean }>> {
  const { network, ...params } = context.query;

  if (context.params?.id === undefined) {
    return { notFound: true };
  }

  const blockId = context.params?.id?.toString().trim() as string;

  try {
    const block = await BlocksApi.getBlock(
      network as NetworkConnection,
      blockId
    );

    // Handle block that has lost consensus (reorg)
    if ((block.height === undefined || block.height === null) && block.hash) {
      return {
        redirect: {
          permanent: false,
          destination: `/block/${block.hash}`,
        },
      };
    }

    const hasInvalidParams =
      !isNumeric(params?.block_number as string) ||
      !isNumeric(params?.items_count as string) ||
      !isNumeric(params?.page_number as string) ||
      !isNumeric(params?.index as string);

    const blockTransactions = hasInvalidParams
      ? await BlocksApi.getBlockTransactions(
          network as NetworkConnection,
          blockId
        )
      : await BlocksApi.getBlockTransactions(
          network as NetworkConnection,
          blockId,
          params?.block_number as string,
          params?.items_count as string,
          params?.index as string
        );

    return {
      props: {
        data: {
          block,
          blockTransactions: {
            transactions: blockTransactions.items,
            nextPageParams:
              blockTransactions.next_page_params as TxnNextPageParamsProps,
          },
        },
      },
    };
  } catch (e) {
    return { notFound: true };
  }
}
