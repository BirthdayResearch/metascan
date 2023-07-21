import { useRouter } from "next/router";
import { useNetwork } from "@contexts/NetworkContext";
import {
  TokenTransferPageParamsProps,
  TokenTransferProps,
  useGetTokenTransfersMutation,
} from "@store/token";
import PaginationLoader from "@components/skeletonLoaders/PaginationLoader";
import Pagination from "@components/commons/Pagination";
import {
  SkeletonLoader,
  SkeletonLoaderScreen,
} from "@components/skeletonLoaders/SkeletonLoader";
import TransactionRow from "@components/commons/TransactionRow";
import { getTransactionTypeFromTokenTransfers } from "shared/transactionDataHelper";
import { getTimeAgo } from "shared/durationHelper";
import useFetchListData from "@hooks/useFetchListData";

export default function TokenTransfersList({
  addressHash,
}: {
  addressHash: string;
}) {
  const { connection } = useNetwork();
  const [trigger] = useGetTokenTransfersMutation();
  const router = useRouter();
  const params = router.query;

  const {
    data: transfers,
    isLoading,
    nextPage,
  } = useFetchListData<TokenTransferProps, TokenTransferPageParamsProps>({
    addressHash,
    triggerApiCall: () =>
      trigger({
        network: connection,
        tokenId: addressHash,
        blockNumber: params.block_number as string,
        index: params.index as string,
      }),
  });

  if (!isLoading && transfers.length === 0) {
    return <div className="text-white-50">No token transfers</div>;
  }

  return (
    <div>
      <TransfersPagination
        addressHash={addressHash}
        nextPageParams={nextPage}
        isLoading={isLoading}
        containerClass="relative pb-4"
        loaderClass="right-1 top-0"
      />
      {isLoading ? (
        <SkeletonLoader rows={7} screen={SkeletonLoaderScreen.Tx} />
      ) : (
        transfers.map((item) => (
          <TransactionRow
            key={`${item.tx_hash}_${item.log_index}`}
            data={{
              transactionType: getTransactionTypeFromTokenTransfers([
                { type: item.type },
              ]),
              from: item.from.hash,
              to: item.to.hash,
              hash: item.tx_hash,
              amount: item.total.value,
              symbol: item.token.symbol,
              timeInSec: getTimeAgo(item.timestamp),
            }}
          />
        ))
      )}
      <TransfersPagination
        addressHash={addressHash}
        nextPageParams={nextPage}
        isLoading={isLoading}
        containerClass="relative h-10 md:h-6 lg:pt-1.5"
        loaderClass="top-0 lg:top-auto right-0 bottom-0 lg:-bottom-[22px]"
      />
    </div>
  );
}

function TransfersPagination({
  addressHash,
  nextPageParams,
  isLoading,
  containerClass = "",
  loaderClass = "",
}: {
  addressHash: string;
  isLoading: boolean;
  nextPageParams?: TokenTransferPageParamsProps;
  containerClass?: string;
  loaderClass?: string;
}) {
  return (
    <div className={containerClass}>
      {isLoading && <PaginationLoader customStyle={loaderClass} />}
      <Pagination<TokenTransferPageParamsProps & { page_number?: string }>
        pathname={`/token/${addressHash}`}
        nextPageParams={
          nextPageParams
            ? {
                block_number: nextPageParams.block_number,
                index: nextPageParams.index,
              }
            : undefined
        }
        shallow
      />
    </div>
  );
}
