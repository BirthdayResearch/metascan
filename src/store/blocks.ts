import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { filterParams, getBaseUrl, MAIN_BLOCKS_URL } from "@api/index";
import { NetworkConnection } from "@contexts/Environment";
import { BlockWithPaginationProps } from "@api/types";

export const blocksApi = createApi({
  reducerPath: "blocks",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getBlocks: builder.mutation<
      BlockWithPaginationProps,
      {
        network: NetworkConnection;
        blockNumber?: string;
        itemsCount?: string;
      }
    >({
      query: ({ network, blockNumber, itemsCount }) => {
        const baseUrl = getBaseUrl(network);
        const params = filterParams([
          { key: "block_number", value: blockNumber },
          { key: "items_count", value: itemsCount },
          { key: "type", value: "block" },
        ]);
        return {
          url: `${baseUrl}/${MAIN_BLOCKS_URL}${params}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetBlocksMutation } = blocksApi;
