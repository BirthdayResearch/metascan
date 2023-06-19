import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  getBaseUrl,
  MAIN_LATEST_BLOCK_URL,
  MAIN_LATEST_TRANSACTION_URL,
} from "@api/index";
import { NetworkConnection } from "@contexts/Environment";

export const latestDataApi = createApi({
  reducerPath: "latest",
  baseQuery: fetchBaseQuery({
    baseUrl: "/", // This will be overridden by query url below, need to dynamically get the base url based on network
  }),
  endpoints: (builder) => ({
    latestBlocksResult: builder.mutation<any, { network: NetworkConnection }>({
      query: ({ network }) => {
        const baseUrl = getBaseUrl(network);
        return {
          url: `${baseUrl}/${MAIN_LATEST_BLOCK_URL}`,
          method: "GET",
        };
      },
    }),
    latestTransactionsResult: builder.mutation<
      any,
      { network: NetworkConnection }
    >({
      query: ({ network }) => {
        const baseUrl = getBaseUrl(network);
        return {
          url: `${baseUrl}/${MAIN_LATEST_TRANSACTION_URL}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useLatestBlocksResultMutation,
  useLatestTransactionsResultMutation,
} = latestDataApi;
