import clsx from "clsx";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import WalletAddressApi from "@api/WalletAddressApi";
import { NetworkConnection } from "@contexts/Environment";
import { useNetwork } from "@contexts/NetworkContext";
import { TokenItemI, TokensListPageParamsProps } from "@api/types";
import PaginationLoader from "@components/skeletonLoaders/PaginationLoader";
import Pagination from "@components/commons/Pagination";
import {
  SkeletonLoader,
  SkeletonLoaderScreen,
} from "@components/skeletonLoaders/SkeletonLoader";
import { AddressContractTabsTitle } from "../../../enum/tabsTitle";
import DetailRowTitle from "./DetailRowTitle";
import ContractTokenRow, { TokenTableFixedTitle } from "./ContractTokenRow";

interface TokenDetailsProps {
  addressHash: string;
}

export default function ContractTokensList({ addressHash }: TokenDetailsProps) {
  const { connection } = useNetwork();
  const [tokens, setTokens] = useState<TokenItemI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPage, setNextPage] = useState<TokensListPageParamsProps>();
  const router = useRouter();

  const params = router.query;
  const fetchTokens = async () => {
    setIsLoading(true);
    const tokenList = await WalletAddressApi.getTokens(
      connection as NetworkConnection,
      addressHash,
      params
    );
    setTokens(tokenList.items);
    setNextPage(tokenList.next_page_params as TokensListPageParamsProps);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTokens();
  }, [params.page_number]);

  if (!isLoading && tokens.length === 0) {
    return <div className="text-white-50 mt-6">No contract tokens</div>;
  }

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
          addressHash={addressHash}
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
