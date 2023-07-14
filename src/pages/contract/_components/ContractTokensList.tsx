import TokenRow, {
  TokenTableFixedTitle,
} from "pages/address/_components/TokenRow";
import { useEffect, useState } from "react";
import WalletAddressApi from "@api/WalletAddressApi";
import { NetworkConnection } from "@contexts/Environment";
import { useNetwork } from "@contexts/NetworkContext";
import { TokenItemI, TokensListPageParamsProps } from "@api/types";
import PaginationLoader from "@components/skeletonLoaders/PaginationLoader";
import Pagination from "@components/commons/Pagination";
import { useRouter } from "next/router";
import clsx from "clsx";
import {
  SkeletonLoader,
  SkeletonLoaderScreen,
} from "@components/skeletonLoaders/SkeletonLoader";
import DetailRowTitle from "pages/address/_components/shared/DetailRowTitle";
import { AddressContractTabsTitle } from "../../../enum/tabsTitle";

interface TokenDetailsProps {
  address: string;
}

function TokensListPagination({
  pathname,
  nextPageParams,
  isLoading,
  containerClass = "",
  loaderClass = "",
}: {
  pathname: string;
  isLoading: boolean;
  nextPageParams?: TokensListPageParamsProps;
  containerClass?: string;
  loaderClass?: string;
}) {
  return (
    <div className={clsx("relative", containerClass)}>
      {isLoading && <PaginationLoader customStyle={loaderClass} />}
      <Pagination<TokensListPageParamsProps>
        pathname={pathname}
        nextPageParams={nextPageParams}
        shallow
      />
    </div>
  );
}

export default function ContractTokensList({ address }: TokenDetailsProps) {
  const { connection } = useNetwork();
  const [tokens, setTokens] = useState<TokenItemI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState<TokensListPageParamsProps>();
  const router = useRouter();

  const params = router.query;
  const getTokens = async () => {
    setIsLoading(true);
    const tokenList = await WalletAddressApi.getTokens(
      connection as NetworkConnection,
      address,
      params
    );
    setTokens(tokenList.items);
    setNextPage(tokenList.next_page_params as TokensListPageParamsProps);
    setIsLoading(false);
  };

  useEffect(() => {
    getTokens();
  }, [params.page_number]);

  return (
    <div>
      <div className="flex flex-col md:flex-row mb-9 justify-between md:items-center">
        <h2
          data-testid="contract-address-token-list-title"
          className="font-bold text-xl text-white-50"
        >
          {AddressContractTabsTitle.Tokens}
        </h2>
        <TokensListPagination
          pathname={`/contract/${address}`}
          nextPageParams={nextPage}
          isLoading={isLoading}
          containerClass="justify-end mt-5 md:mt-0"
          loaderClass="right-1 md: top-4"
        />
      </div>
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
            <DetailRowTitle title={TokenTableFixedTitle.quantity} />
          </div>
          <div
            className="col-span-2 text-right"
            data-testid="contract-tokens-contract-address-title"
          >
            <DetailRowTitle title="Contract Address" />
          </div>
        </div>
        <div className="brand-gradient-1 h-[1px]" />
      </div>
      {isLoading ? (
        <SkeletonLoader rows={22} screen={SkeletonLoaderScreen.AddressTokens} />
      ) : (
        <>
          {tokens.map((item) => (
            <TokenRow key={item.token.address} data={item} />
          ))}
        </>
      )}
      <TokensListPagination
        pathname={`/contract/${address}`}
        nextPageParams={nextPage}
        isLoading={isLoading}
        containerClass="flex w-full md:justify-end mt-12 md:mt-10"
        loaderClass="left-1 md:left-auto md:right-1 top-4"
      />
    </div>
  );
}
