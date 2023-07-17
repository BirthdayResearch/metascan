import { useEffect, useState } from "react";
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

export default function TokenTransfersList({
  addressHash,
}: {
  addressHash: string;
}) {
  const { connection } = useNetwork();
  const [transfers, setTransfers] = useState<TokenTransferProps[]>([]);
  const [nextPage, setNextPage] = useState<TokenTransferPageParamsProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [trigger] = useGetTokenTransfersMutation();
  const router = useRouter();

  const params = router.query;
  const fetchTokenTransfers = async () => {
    setIsLoading(true);
    const data = await trigger({
      network: connection,
      tokenId: addressHash,
      blockNumber: params.block_number as string,
      index: params.index as string,
    }).unwrap();
    setTransfers(data.items);
    setNextPage(data.next_page_params);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTokenTransfers();
  }, [params.page_number]);

  if (!isLoading && transfers.length === 0) {
    return <div className="text-white-50 mt-6">No token transfers</div>;
  }

  return (
    <div>
      <TransfersPagination
        addressHash={addressHash}
        nextPageParams={nextPage}
        isLoading={isLoading}
        containerClass="relative pb-4"
        loaderClass="right-1 top-0 md:top-0"
      />
      {isLoading ? (
        <SkeletonLoader rows={7} screen={SkeletonLoaderScreen.Tx} />
      ) : (
        transfers.map((item) => (
          <TransactionRow
            key={item.tx_hash}
            rawData={
              {
                ...item,
                hash: item.tx_hash,
                tx_types: [item.type],
                token_transfers: [item],
              } as any
            }
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
