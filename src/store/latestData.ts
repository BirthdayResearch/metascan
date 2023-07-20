import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  getBaseUrl,
  MAIN_LATEST_BLOCK_URL,
  MAIN_LATEST_TRANSACTION_URL,
} from "@api/index";
import { NetworkConnection } from "@contexts/Environment";

export const latestDataApi = createApi({
  reducerPath: "latest",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getLatestBlocks: builder.mutation<any, { network: NetworkConnection }>({
      query: ({ network }) => {
        const baseUrl = getBaseUrl(network);
        return {
          url: `${baseUrl}/${MAIN_LATEST_BLOCK_URL}`,
          method: "GET",
        };
      },
    }),
    getLatestTransactions: builder.mutation<
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

export const { useGetLatestBlocksMutation, useGetLatestTransactionsMutation } =
  latestDataApi;
