import clsx from "clsx";
import { useRouter } from "next/router";
import { useNetwork } from "@contexts/NetworkContext";
import { TokenItemI, TokensListPageParamsProps } from "@api/types";
import PaginationLoader from "@components/skeletonLoaders/PaginationLoader";
import Pagination from "@components/commons/Pagination";
import {
  SkeletonLoader,
  SkeletonLoaderScreen,
} from "@components/skeletonLoaders/SkeletonLoader";
import { useGetContractTokensMutation } from "@store/token";
import useFetchListData from "@hooks/useFetchListData";
import DetailRowTitle from "./DetailRowTitle";
import ContractTokenRow, { TokenTableFixedTitle } from "./ContractTokenRow";

interface TokenDetailsProps {
  addressHash: string;
}

export default function ContractTokensList({ addressHash }: TokenDetailsProps) {
  const { connection } = useNetwork();
  const [trigger] = useGetContractTokensMutation();
  const router = useRouter();
  const params = router.query;

  const fetchedData = useFetchListData<TokenItemI, TokensListPageParamsProps>({
    addressHash,
    triggerApiCall: () =>
      trigger({
        network: connection,
        addressHash,
        queryParams: params,
      }),
  });
  const { data: tokens, isLoading, nextPage } = fetchedData;

  if (!isLoading && tokens.length === 0) {
    return <div className="text-white-50">No contract tokens</div>;
  }

  return (
    <div>
      <TokensListPagination
        addressHash={addressHash}
        nextPageParams={nextPage}
        isLoading={isLoading}
        containerClass="justify-end mt-5 md:mt-0"
        loaderClass="right-1 top-0"
      />
      \
      <div className="hidden lg:block">
        <div className="grid grid-cols-7 mb-5">
          <div data-testid="contract-tokens-asset-title">
            <DetailRowTitle title={TokenTableFixedTitle.asset} />
          </div>
          <div data-testid="contract-tokens-type-title">
            <DetailRowTitle title={TokenTableFixedTitle.type} />
          </div>
          <div data-testid="contract-tokens-symbol-title">
            <DetailRowTitle title={TokenTableFixedTitle.symbol} />
          </div>
          <div
            className="col-span-2 text-right"
            data-testid="contract-tokens-amount-title items-end"
          >
            <DetailRowTitle
              title={TokenTableFixedTitle.quantity}
              containerClass="justify-end"
            />
          </div>
          <div
            className="col-span-2 text-right"
            data-testid="contract-tokens-contract-address-title"
          >
            <DetailRowTitle
              title="Contract Address"
              containerClass="justify-end"
            />
          </div>
        </div>
        <div className="brand-gradient-1 h-[1px]" />
      </div>
      {isLoading ? (
        <SkeletonLoader rows={22} screen={SkeletonLoaderScreen.AddressTokens} />
      ) : (
        <>
          {tokens.map((item) => (
            <ContractTokenRow key={item.token.address} data={item} />
          ))}
        </>
      )}
      <TokensListPagination
        addressHash={addressHash}
        nextPageParams={nextPage}
        isLoading={isLoading}
        containerClass="flex w-full md:justify-end mt-12 md:mt-10"
        loaderClass="left-1 md:left-auto md:right-1 top-4"
      />
    </div>
  );
}

function TokensListPagination({
  addressHash,
  nextPageParams,
  isLoading,
  containerClass = "",
  loaderClass = "",
}: {
  addressHash: string;
  isLoading: boolean;
  nextPageParams?: TokensListPageParamsProps;
  containerClass?: string;
  loaderClass?: string;
}) {
  return (
    <div className={clsx("relative", containerClass)}>
      {isLoading && <PaginationLoader customStyle={loaderClass} />}
      <Pagination<TokensListPageParamsProps>
        pathname={`/address/${addressHash}`}
        nextPageParams={nextPageParams}
        shallow
      />
    </div>
  );
}
