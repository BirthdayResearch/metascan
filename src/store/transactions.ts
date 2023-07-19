import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { filterParams, getBaseUrl, TRANSACTIONS_URL } from "@api/index";
import { NetworkConnection } from "@contexts/Environment";
import { RawTxnWithPaginationProps } from "@api/types";

export const transactionsApi = createApi({
  reducerPath: "transactions",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getTransactions: builder.mutation<
      RawTxnWithPaginationProps,
      {
        network: NetworkConnection;
        blockNumber: string;
        itemsCount: string;
        index: string;
      }
    >({
      query: ({ network, blockNumber, itemsCount, index }) => {
        const baseUrl = getBaseUrl(network);
        const params = filterParams([
          { key: "block_number", value: blockNumber },
          { key: "items_count", value: itemsCount },
          { key: "index", value: index },
        ]);
        return {
          url: `${baseUrl}/${TRANSACTIONS_URL}${params}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetTransactionsMutation } = transactionsApi;
