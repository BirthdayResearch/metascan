import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useNetwork } from "@contexts/NetworkContext";
import {
  TokenHolderPageParamsProps,
  TokenHolderProps,
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
import { sleep } from "shared/sleep";

export default function TokenHoldersList({
  addressHash,
}: {
  addressHash: string;
}) {
  const { connection } = useNetwork();
  const [holders, setHolders] = useState<TokenHolderProps[]>([]);
  const [nextPage, setNextPage] = useState<TokenHolderPageParamsProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [trigger] = useGetTokenHoldersMutation();
  const router = useRouter();

  const params = router.query;
  const fetchTokenHolders = async () => {
    const data = await trigger({
      network: connection,
      tokenId: addressHash,
      itemsCount: params.items_count as string,
      value: params.value ? BigInt(Number(params.value)).toString() : "",
    }).unwrap();
    setHolders(data.items);
    setNextPage(data.next_page_params);
    await sleep(150);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTokenHolders();
  }, [params.page_number, addressHash]);

  if (!isLoading && holders.length === 0) {
    return <div className="text-white-50">No token holders</div>;
  }

  const numberOfItems = 50;
  const pageNumber = Number(params.page_number ?? 1);
  const currentItemsCount =
    pageNumber > 1 ? (pageNumber - 1) * numberOfItems : 0;

  return (
    <div>
      <HoldersPagination
        addressHash={addressHash}
        nextPageParams={nextPage}
        isLoading={isLoading}
        containerClass="relative"
        loaderClass="right-1 top-0"
      />
      {isLoading ? (
        <SkeletonLoader rows={7} screen={SkeletonLoaderScreen.TokenHolders} />
      ) : (
        holders.map((item, index) => (
          <TokenHolderRow
            key={item.address.hash}
            num={currentItemsCount + index + 1}
            data={item}
          />
        ))
      )}
      <HoldersPagination
        addressHash={addressHash}
        nextPageParams={nextPage}
        isLoading={isLoading}
        containerClass="relative h-10 md:h-6 lg:pt-1.5"
        loaderClass="top-0 lg:top-auto right-0 bottom-0 lg:-bottom-[22px]"
      />
    </div>
  );
}

function HoldersPagination({
  addressHash,
  nextPageParams,
  isLoading,
  containerClass = "",
  loaderClass = "",
}: {
  addressHash: string;
  isLoading: boolean;
  nextPageParams?: TokenHolderPageParamsProps;
  containerClass?: string;
  loaderClass?: string;
}) {
  return (
    <div className={containerClass}>
      {isLoading && <PaginationLoader customStyle={loaderClass} />}
      <Pagination<TokenHolderPageParamsProps & { page_number?: string }>
        pathname={`/token/${addressHash}`}
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
    </div>
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
          href={`/address/${data.address.hash}`}
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
