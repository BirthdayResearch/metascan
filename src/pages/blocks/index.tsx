import Container from "@components/commons/Container";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import LatestDataApi from "@api/LatestDataApi";
// import { Pagination } from "@components/commons/Pagination";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Pagination from "@components/commons/Pagination";
import BlockRow from "./_components/BlockRow";

interface QueryParamsProps {
  block_number: string;
  items_count: string;
  type: "block";
  page_number: string;
}

export default function Blocks({ data }) {
  const router = useRouter();
  return (
    <Container className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer>
        <div className="p-5 md:p-10">
          <div className="flex flex-col md:flex-row py-6 md:py-4 mb-6 justify-between md:items-center">
            <span className="font-bold text-2xl text-white-50">Blocks</span>
            <Pagination<QueryParamsProps>
              nextPageParams={
                data.next_page_params ?? {
                  block_number: data.next_page_params.block_number,
                  items_count: data.next_page_params.items_count,
                  type: "block",
                  page_number: (
                    Number((router.query.page_number as string) ?? "1") + 1
                  ).toString(),
                }
              }
            />
          </div>
          {data.blocks.map((item) => (
            <BlockRow key={item.height} data={item} />
          ))}
        </div>
      </GradientCardContainer>
    </Container>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Get pagination details
  const params = context.query;

  // // Avoid fetching if params are not available
  // if (
  //   !isNumeric(params?.block_number as string) ||
  //   !isNumeric(params?.items_count as string)
  // ) {
  //   return { notFound: true };
  // }

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
