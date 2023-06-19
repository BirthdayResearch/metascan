import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { filterParams, getBaseUrl, MAIN_BLOCKS_URL } from "@api/index";
import { NetworkConnection } from "@contexts/Environment";
import { BlockProps, BlockWithPaginationProps } from "@api/types";

export const blocksApi = createApi({
  reducerPath: "blocks",
  baseQuery: fetchBaseQuery({
    baseUrl: "/", // This will be overridden by query url below, need to dynamically get the base url based on network
  }),
  endpoints: (builder) => ({
    blocksResult: builder.mutation<
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
    blockResult: builder.mutation<
      BlockProps,
      { network: NetworkConnection; blockId: string }
    >({
      query: ({ network, blockId }) => {
        const baseUrl = getBaseUrl(network);
        return {
          url: `${baseUrl}/${MAIN_BLOCKS_URL}/${blockId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useBlocksResultMutation, useBlockResultMutation } = blocksApi;
