import Container from "@components/commons/Container";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import Pagination from "@components/commons/Pagination";
import LatestDataApi from "@api/LatestDataApi";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import { isNumeric } from "shared/textHelper";
import BlockRow from "./_components/BlockRow";

interface NextPageParamsProps {
  block_number: string;
  items_count: string;
}

interface QueryParamsProps extends NextPageParamsProps {
  type: "block";
  page_number?: string;
}

export interface BlockProps {
  base_fee_per_gas: string;
  burnt_fees: string;
  gas_limit: string;
  gas_used: string;
  gas_used_percentage: number;
  height: number;
  miner: {
    hash: string;
  };
  rewards: any; // TODO: Dependent to DMC rewards
  timestamp: string;
  tx_count: number;
}

interface PageProps {
  blocks: BlockProps[];
  next_page_params: NextPageParamsProps;
}

export default function Blocks({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Container className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer>
        <div className="p-5 md:p-10">
          <div className="flex flex-col md:flex-row py-6 md:py-4 mb-6 justify-between md:items-center">
            <span className="font-bold text-2xl text-white-50">Blocks</span>
            <Pagination<QueryParamsProps>
              nextPageParams={
                data.next_page_params
                  ? {
                      block_number: data.next_page_params.block_number,
                      items_count: data.next_page_params.items_count,
                      type: "block",
                    }
                  : undefined
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

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ data: PageProps }>> {
  // Get pagination details
  const params = context.query;
  // Avoid fetching if somes params are not valid
  const hasInvalidParams =
    !isNumeric(params?.block_number as string) ||
    !isNumeric(params?.items_count as string) ||
    !isNumeric(params?.page_number as string);

  // Fetch data from external API
  const blocks = hasInvalidParams
    ? await LatestDataApi.getBlocks()
    : await LatestDataApi.getBlocks(
        params?.block_number as string,
        params?.items_count as string
      );

  const data = {
    blocks: blocks.items as BlockProps[],
    next_page_params: blocks.next_page_params as NextPageParamsProps,
  };

  // Pass data to the page via props
  return { props: { data } };
}
