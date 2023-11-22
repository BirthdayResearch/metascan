import Container from "@components/commons/Container";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import Pagination from "@components/commons/Pagination";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import { isNumeric } from "shared/textHelper";
import { NetworkConnection } from "@contexts/Environment";
import BlocksApi, {
  BlockNextPageParamsProps,
  BlockQueryParamsProps,
} from "@api/BlocksApi";
import { BlockProps } from "@api/types";
import PaginationLoader from "@components/skeletonLoaders/PaginationLoader";
import {
  SkeletonLoader,
  SkeletonLoaderScreen,
} from "@components/skeletonLoaders/SkeletonLoader";
import BlockRow from "./_components/BlockRow";

interface PageProps {
  blocks: BlockProps[];
  next_page_params: BlockNextPageParamsProps;
}

function BlockPagination({
  nextPageParams,
}: {
  nextPageParams: BlockNextPageParamsProps;
}) {
  return (
    <Pagination<BlockQueryParamsProps>
      nextPageParams={
        nextPageParams
          ? {
              block_number: nextPageParams.block_number,
              items_count: nextPageParams.items_count,
              type: "block",
            }
          : undefined
      }
    />
  );
}

export default function Blocks({
  data,
  isLoading,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Container className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer>
        <div data-testid="blocks-list" className="p-5 md:p-10">
          <div className="flex flex-col md:flex-row py-6 md:py-4 mb-6 justify-between md:items-center relative">
            <h1 className="font-bold text-2xl text-white-50">Blocks</h1>
            {isLoading && (
              <PaginationLoader customStyle="right-0 top-[72px] md:top-8" />
            )}
            <BlockPagination nextPageParams={data.next_page_params} />
          </div>

          {isLoading ? (
            <SkeletonLoader rows={22} screen={SkeletonLoaderScreen.Block} />
          ) : (
            data.blocks.map((item) => (
              <BlockRow key={item.height} data={item} />
            ))
          )}
          <div className="relative h-10 md:h-6 lg:pt-1.5">
            {isLoading && (
              <PaginationLoader customStyle="top-0 lg:top-auto right-0 bottom-0 lg:-bottom-[22px]" />
            )}
            <BlockPagination nextPageParams={data.next_page_params} />
          </div>
        </div>
      </GradientCardContainer>
    </Container>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ data: PageProps; isLoading?: boolean }>> {
  const { network, ...params } = context.query;
  // Avoid fetching if some params are not valid
  const hasInvalidParams =
    !isNumeric(params?.block_number as string) ||
    !isNumeric(params?.items_count as string) ||
    !isNumeric(params?.page_number as string);

  try {
    // Fetch data from external API
    const blocks = hasInvalidParams
      ? await BlocksApi.getBlocks(network as NetworkConnection)
      : await BlocksApi.getBlocks(
          network as NetworkConnection,
          params?.block_number as string,
          params?.items_count as string,
        );

    const data = {
      blocks: blocks.items as BlockProps[],
      next_page_params: blocks.next_page_params as BlockNextPageParamsProps,
    };

    // Pass data to the page via props
    return { props: { data } };
  } catch (e) {
    console.log({ e })
    return { notFound: true };
  }
}
