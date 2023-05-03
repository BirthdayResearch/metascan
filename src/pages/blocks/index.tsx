import Container from "@components/commons/Container";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import LatestDataApi from "@api/LatestDataApi";
import { Pagination } from "@components/commons/Pagination";
import { GetServerSidePropsContext } from "next";
import { isNumeric } from "shared/textHelper";
import BlockRow from "./_components/BlockRow";

export default function Blocks({ data }) {
  return (
    <Container className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer>
        <div className="p-5 md:p-10">
          <div className="flex flex-col md:flex-row py-6 md:py-4 mb-6 justify-between md:items-center">
            <span className="font-bold text-2xl text-white-50">Blocks</span>
            <Pagination
              pages={[
                {
                  n: 1,
                  path: "./",
                },
                {
                  n: 2,
                  path: "./",
                },
              ]}
              nextPageParams={{
                blockNumber: data.next_page_params.block_number,
                itemsCount: data.next_page_params.items_count,
              }}
            />
            {/* <CursorPagination
              pages={data.pages}
              path="/blocks"
              className="justify-end mt-5 md:mt-0"
            /> */}
          </div>
          {data.blocks.map((item) => (
            <BlockRow key={item.height} data={item} />
          ))}
          {/* <CursorPagination
            pages={data.pages}
            path="/blocks"
            className="flex w-full md:justify-end mt-12 md:mt-10"
          /> */}
        </div>
      </GradientCardContainer>
    </Container>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Get pagination details
  const params = context.query;

  // Avoid fetching if params are not available
  if (
    !isNumeric(params?.block_number as string) ||
    !isNumeric(params?.block_number as string)
  ) {
    return { notFound: true };
  }

  // Fetch data from external API
  const blocks = await LatestDataApi.getBlocks(
    params?.block_number as string,
    params?.items_count as string
  );

  const data = {
    blocks: blocks.items,
    next_page_params: blocks.next_page_params,
  };

  // Pass data to the page via props
  return { props: { data } };
}
