import { useEffect, useState } from "react";
import Container from "@components/commons/Container";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import Pagination from "@components/commons/Pagination";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import {
  BlockNextPageParamsProps,
  BlockQueryParamsProps,
} from "@api/BlocksApi";
import { BlockWithPaginationProps } from "@api/types";
import PaginationLoader from "@components/skeletonLoaders/PaginationLoader";
import {
  SkeletonLoader,
  SkeletonLoaderScreen,
} from "@components/skeletonLoaders/SkeletonLoader";
import { useNetwork } from "@contexts/NetworkContext";
import { useBlocksResultMutation } from "@store/blocks";
import BlockRow from "./_components/BlockRow";

function BlockPagination({
  nextPageParams,
}: {
  nextPageParams?: BlockNextPageParamsProps;
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

export default function Blocks() {
  const [data, setData] = useState<BlockWithPaginationProps>();
  const [isLoading, setIsLoading] = useState(true);
  const { connection } = useNetwork();
  const [blocksResultMutation] = useBlocksResultMutation();

  const fetchBlocks = async () => {
    const results = await blocksResultMutation({
      network: connection,
    }).unwrap();
    setData(results);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  return (
    <Container className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer>
        <div className="p-5 md:p-10">
          <div className="flex flex-col md:flex-row py-6 md:py-4 mb-6 justify-between md:items-center relative">
            <span className="font-bold text-2xl text-white-50">Blocks</span>
            {isLoading ? (
              <PaginationLoader customStyle="right-0 top-[72px] md:top-8" />
            ) : (
              <BlockPagination nextPageParams={data?.next_page_params} />
            )}
          </div>

          {isLoading ? (
            <SkeletonLoader rows={22} screen={SkeletonLoaderScreen.Block} />
          ) : (
            data?.items.map((item) => (
              <BlockRow key={item.height} data={item} />
            ))
          )}
          <div className="relative h-10 md:h-6 lg:pt-1.5">
            {isLoading ? (
              <PaginationLoader customStyle="top-0 lg:top-auto right-0 bottom-0 lg:-bottom-[22px]" />
            ) : (
              <BlockPagination nextPageParams={data?.next_page_params} />
            )}
          </div>
        </div>
      </GradientCardContainer>
    </Container>
  );
}
