import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getRpcUrl } from "@api/index";
import { NetworkConnection } from "@contexts/Environment";

export enum SearchResultType {
  Address = "address",
  Contract = "contract",
  Block = "block",
  Transaction = "transaction",
  Token = "token",
}

export interface ResultAddressContract {
  type: string;
  name: string;
  address: string;
  url: string;
}

export interface ResultBlock {
  type: string;
  block_number: number;
  block_hash: string;
  url: string;
}

export interface ResultTransaction {
  type: string;
  tx_hash: string;
  url: string;
}

export interface NextPageParams {
  items_count: number;
}

export interface SearchResults {
  items: (ResultAddressContract | ResultBlock | ResultTransaction)[];
  next_page_params?: NextPageParams | null;
}

export const searchApi = createApi({
  reducerPath: "search",
  baseQuery: fetchBaseQuery({
    baseUrl: "/", // This will be overridden by query url below, need to dynamically get the base url based on network
  }),
  endpoints: (builder) => ({
    searchResult: builder.mutation<
      SearchResults,
      { network: NetworkConnection; queryString: string }
    >({
      query: ({ network, queryString }) => ({
        url: `${getRpcUrl(network)}/api/v2/search?q=${queryString}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSearchResultMutation } = searchApi;
