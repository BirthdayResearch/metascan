import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { filterParams, getBaseUrl, TRANSACTIONS_URL } from "@api/index";
import { NetworkConnection } from "@contexts/Environment";
import { RawTransactionI, RawTxnWithPaginationProps } from "@api/types";

export const transactionsApi = createApi({
  reducerPath: "transactions",
  baseQuery: fetchBaseQuery({
    baseUrl: "/", // This will be overridden by query url below, need to dynamically get the base url based on network
  }),
  endpoints: (builder) => ({
    transactionsResult: builder.mutation<
      RawTxnWithPaginationProps,
      {
        network: NetworkConnection;
        blockNumber?: string;
        itemsCount?: string;
        index?: string;
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
    transactionResult: builder.mutation<
      RawTransactionI,
      { network: NetworkConnection; txnHash: string }
    >({
      query: ({ network, txnHash }) => {
        const baseUrl = getBaseUrl(network);
        return {
          url: `${baseUrl}/${TRANSACTIONS_URL}/${txnHash}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useTransactionsResultMutation, useTransactionResultMutation } =
  transactionsApi;
