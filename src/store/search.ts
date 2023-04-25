import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BLOCKSCOUT_ENDPOINT } from "@api/index";

export enum SearchResultType {
  Address = "address",
  Contract = "contract",
  Block = "block",
  Transaction = "transaction",
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
    baseUrl: BLOCKSCOUT_ENDPOINT,
  }),
  endpoints: (builder) => ({
    searchResult: builder.mutation<SearchResults, any>({
      query: ({ queryString }) => ({
        url: `api/v2/search?q=${queryString}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSearchResultMutation } = searchApi;
