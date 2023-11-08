import { useRouter } from "next/router";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import { NetworkConnection } from "@contexts/Environment";
import Pagination from "@components/commons/Pagination";
import { isAlphanumeric, isNumeric } from "shared/textHelper";
import {
  SkeletonLoader,
  SkeletonLoaderScreen,
} from "@components/skeletonLoaders/SkeletonLoader";
import PaginationLoader from "@components/skeletonLoaders/PaginationLoader";
import TokensApi, {
  TokenNextPageParamsProps,
  TokenQueryParamsProps,
} from "@api/TokensApi";
import { RawTokenI } from "@api/types";
import TokenRow from "./_components/TokenRow";

interface PageProps {
  tokens: RawTokenI[];
  next_page_params: TokenNextPageParamsProps;
}

function TokenPagination({
  nextPageParams,
}: {
  nextPageParams?: TokenNextPageParamsProps;
}) {
  return (
    <Pagination<TokenQueryParamsProps>
      pathname="/tokens"
      nextPageParams={
        nextPageParams
          ? {
              items_count: nextPageParams.items_count,
              contract_address_hash: nextPageParams.contract_address_hash,
              holder_count: nextPageParams.holder_count,
              is_name_null: nextPageParams.is_name_null,
              market_cap: nextPageParams.market_cap ?? "null",
              name: nextPageParams.name,
            }
          : undefined
      }
    />
  );
}

export default function Tokens({
  data,
  isLoading,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const pageNumber = Number(router.query.page_number ?? 0);
  const numberOfItems = 50;
  // Page number > 1, then add numberOfItems * pageNumber
  const currentItemsCount =
    pageNumber > 1 ? (pageNumber - 1) * numberOfItems : 0;

  return (
    <div className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer>
        <div className="p-5 md:p-10">
          <div className="flex flex-col md:flex-row py-6 md:py-4 lg:mb-6 justify-between md:items-center relative">
            <span className="font-bold text-2xl text-white-50">Tokens</span>
            {isLoading && (
              <PaginationLoader customStyle="right-0 top-[72px] md:top-8" />
            )}
            <TokenPagination nextPageParams={data.next_page_params} />
          </div>
          {isLoading ? (
            <SkeletonLoader rows={7} screen={SkeletonLoaderScreen.Tx} />
          ) : (
            data.tokens.map((token, index) => (
              <TokenRow
                key={token.address}
                rawData={token}
                index={index + currentItemsCount}
              />
            ))
          )}

          <div className="relative h-10 md:h-6 lg:pt-1.5">
            {isLoading && (
              <PaginationLoader customStyle="top-0 lg:top-auto right-0 bottom-0 lg:-bottom-[22px]" />
            )}
            <TokenPagination nextPageParams={data.next_page_params} />
          </div>
        </div>
      </GradientCardContainer>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ data: PageProps; isLoading?: boolean }>> {
  const { network, ...params } = context.query;
  // Avoid fetching if some params are not valid
  const hasInvalidParams =
    !isAlphanumeric(params?.contract_address_hash as string) ||
    !isNumeric(params?.holder_count as string) ||
    !isAlphanumeric(params?.is_name_null as string) ||
    !isNumeric(params?.items_count as string) ||
    !isAlphanumeric(params?.market_cap as string);

  try {
    // Fetch data from external API
    const txs = hasInvalidParams
      ? await TokensApi.getTokens(network as NetworkConnection)
      : await TokensApi.getTokens(
          network as NetworkConnection,
          params?.contract_address_hash as string,
          params?.holder_count as string,
          params?.is_name_null as string,
          params?.items_count as string,
          params?.market_cap as string,
          params?.name as string,
        );
    const data = {
      tokens: txs.items,
      next_page_params: txs.next_page_params as TokenNextPageParamsProps,
    };

    // Pass data to the page via props
    return { props: { data } };
  } catch (e) {
    return { notFound: true };
  }
}
