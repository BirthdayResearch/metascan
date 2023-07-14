import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useNetwork } from "@contexts/NetworkContext";
import {
  TokenHolderPageParamsProps,
  TokenHolderProps,
  TokenHolderWithPaginationProps,
  useGetTokenHoldersMutation,
} from "@store/token";
import {
  SkeletonLoader,
  SkeletonLoaderScreen,
} from "@components/skeletonLoaders/SkeletonLoader";
import PaginationLoader from "@components/skeletonLoaders/PaginationLoader";
import Pagination from "@components/commons/Pagination";
import LinkText from "@components/commons/LinkText";
import { truncateTextFromMiddle } from "shared/textHelper";
import NumericFormat from "@components/commons/NumericFormat";

export default function TokenHolders() {
  const { connection } = useNetwork();
  const router = useRouter();
  const { tokenId, ...params } = router.query;

  const [data, setData] = useState<TokenHolderWithPaginationProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [trigger] = useGetTokenHoldersMutation();

  const fetchTokenHolders = async () => {
    setIsLoading(true);
    const holdersData = await trigger({
      network: connection,
      tokenId: tokenId as string,
      itemsCount: params.items_count as string,
      value: params.value as string,
    }).unwrap();
    setData(holdersData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTokenHolders();
  }, [router.query.page_number]);

  const tokenHolders = data?.items ?? [];
  if (!isLoading && tokenHolders.length === 0) {
    return <div className="text-white-50 mt-6">No token holders</div>;
  }

  const numberOfItems = 50;
  const pageNumber = Number(router.query.page_number) ?? 0;
  const currentItemsCount =
    pageNumber > 1 ? (pageNumber - 1) * numberOfItems : 0;

  return (
    <div>
      <div className="relative">
        {isLoading && <PaginationLoader customStyle="right-1 top-0 md:top-0" />}
        <HoldersPagination
          pathname={`/token/${tokenId}`}
          nextPageParams={data?.next_page_params}
        />
      </div>

      {isLoading ? (
        <SkeletonLoader rows={7} screen={SkeletonLoaderScreen.TokenHolders} />
      ) : (
        tokenHolders.map((item, index) => (
          <TokenHolderRow
            key={item.address.hash}
            num={currentItemsCount + index + 1}
            data={item}
          />
        ))
      )}

      <div className="relative h-10 md:h-6 lg:pt-1.5">
        {isLoading && (
          <PaginationLoader customStyle="top-0 lg:top-auto right-0 bottom-0 lg:-bottom-[22px]" />
        )}
        <HoldersPagination
          pathname={`/token/${tokenId}`}
          nextPageParams={data?.next_page_params}
        />
      </div>
    </div>
  );
}

function HoldersPagination({
  pathname,
  nextPageParams,
}: {
  pathname: string;
  nextPageParams?: TokenHolderPageParamsProps;
}) {
  return (
    <Pagination<TokenHolderPageParamsProps & { page_number?: string }>
      pathname={pathname}
      nextPageParams={
        nextPageParams
          ? {
              items_count: nextPageParams.items_count,
              value: nextPageParams.value,
            }
          : undefined
      }
      shallow
    />
  );
}

function TokenHolderRow({
  num,
  data,
}: {
  num: number;
  data: TokenHolderProps;
}) {
  const percentage = BigNumber(data.value ?? "0")
    .dividedBy(BigNumber(data.token.total_supply ?? "1"))
    .multipliedBy(100);
  return (
    <div className="flex gap-1 md:gap-3 lg:gap-6 md:items-center py-[18px] border-b-[0.5px] border-dark-200">
      <div className="w-8 lg:w-10 text-white-700">{num}</div>
      <div className="flex flex-col gap-1">
        <LinkText
          href={`/address/${data.address}`}
          label={truncateTextFromMiddle(data.address.hash, 8)}
        />
        <div>
          {data.value && (
            <NumericFormat
              thousandSeparator
              value={data.value}
              className="text-white-50 break-all"
              suffix={data.token.symbol ? ` ${data.token.symbol}` : ""}
              decimalScale={2}
            />
          )}
          <NumericFormat
            thousandSeparator
            value={data.token.total_supply ? percentage : 0}
            className="text-white-700 break-all ml-2"
            suffix="%"
            decimalScale={2}
          />
        </div>
      </div>
    </div>
  );
}
