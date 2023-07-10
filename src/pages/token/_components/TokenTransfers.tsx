import { useRouter } from "next/router";
import { useNetwork } from "@contexts/NetworkContext";
import {
  TokenTransferPageParamsProps,
  useGetTokenTransfersQuery,
} from "@store/token";
import PaginationLoader from "@components/skeletonLoaders/PaginationLoader";
import Pagination from "@components/commons/Pagination";
import {
  SkeletonLoader,
  SkeletonLoaderScreen,
} from "@components/skeletonLoaders/SkeletonLoader";
import TransactionRow from "@components/commons/TransactionRow";

export default function TokenTransfers() {
  const { connection } = useNetwork();
  const router = useRouter();
  const { tokenId, ...params } = router.query;
  const { data, isLoading } = useGetTokenTransfersQuery({
    network: connection,
    tokenId: tokenId as string,
    blockNumber: params.block_number as string,
    index: params.index as string,
  });
  const tokenTransfers = data?.items ?? [];

  return (
    <div>
      <div className="relative">
        {isLoading && <PaginationLoader customStyle="right-1 top-0 md:top-0" />}
        <TransfersPagination
          pathname={`/token/${tokenId}`}
          nextPageParams={data?.next_page_params}
        />
      </div>

      {isLoading ? (
        <SkeletonLoader rows={7} screen={SkeletonLoaderScreen.Tx} />
      ) : (
        tokenTransfers.map((item) => (
          <TransactionRow
            key={item.tx_hash}
            rawData={
              { ...item, hash: item.tx_hash, tx_types: [item.type] } as any
            }
          />
        ))
      )}

      <div className="relative h-10 md:h-6 lg:pt-1.5">
        {isLoading && (
          <PaginationLoader customStyle="top-0 lg:top-auto right-0 bottom-0 lg:-bottom-[22px]" />
        )}
        <TransfersPagination
          pathname={`/token/${tokenId}`}
          nextPageParams={data?.next_page_params}
        />
      </div>
    </div>
  );
}

function TransfersPagination({
  pathname,
  nextPageParams,
}: {
  pathname: string;
  nextPageParams?: TokenTransferPageParamsProps;
}) {
  return (
    <Pagination<TokenTransferPageParamsProps & { page_number?: string }>
      pathname={pathname}
      nextPageParams={
        nextPageParams
          ? {
              block_number: nextPageParams.block_number,
              index: nextPageParams.index,
            }
          : undefined
      }
    />
  );
}
