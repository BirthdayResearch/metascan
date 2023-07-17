import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NetworkConnection } from "@contexts/Environment";
import { TOKENS_URL, filterParams, getBaseUrl } from "@api/index";
import { TokenProps } from "@api/TokenApi";
import { AddressProps } from "@api/types";

// Token Holders
export interface TokenHolderProps {
  address: AddressProps;
  token: TokenProps;
  token_id: string | null;
  value: string;
}
export interface TokenHolderPageParamsProps {
  items_count: string;
  value: string;
}
export interface TokenHolderWithPaginationProps {
  items: TokenHolderProps[];
  next_page_params: TokenHolderPageParamsProps;
}

// Token Transfers
export interface TokenTransferProps {
  tx_hash: string;
  block_hash: string;
  type: string;
  from: AddressProps;
  to: AddressProps;
  token: TokenProps;
  total: {
    decimals: string;
    value: string;
  };
  log_index: string;
  method: string;
  timestamp: string;
}
export interface TokenTransferWithPaginationProps {
  items: TokenTransferProps[];
  next_page_params: TokenTransferPageParamsProps;
}
export interface TokenTransferPageParamsProps {
  block_number: string;
  index: string;
}

export const tokenApi = createApi({
  reducerPath: "token",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (builder) => ({
    getTokenHolders: builder.mutation<
      TokenHolderWithPaginationProps,
      {
        network: NetworkConnection;
        tokenId: string;
        itemsCount?: string;
        value?: string;
      }
    >({
      query: ({ network, tokenId, itemsCount, value }) => {
        const params = filterParams([
          { key: "items_count", value: itemsCount },
          { key: "value", value },
        ]);
        return {
          url: `${getBaseUrl(
            network
          )}/${TOKENS_URL}/${tokenId}/holders${params}`,
          method: "GET",
        };
      },
    }),
    getTokenTransfers: builder.mutation<
      TokenTransferWithPaginationProps,
      {
        network: NetworkConnection;
        tokenId: string;
        blockNumber?: string;
        index?: string;
      }
    >({
      query: ({ network, tokenId, blockNumber, index }) => {
        const params = filterParams([
          { key: "block_number", value: blockNumber },
          { key: "index", value: index },
        ]);
        return {
          url: `${getBaseUrl(
            network
          )}/${TOKENS_URL}/${tokenId}/transfers${params}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetTokenHoldersMutation, useGetTokenTransfersMutation } =
  tokenApi;
