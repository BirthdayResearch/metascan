import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NetworkConnection } from "@contexts/Environment";
import {
  TOKENS_URL,
  WALLET_ADDRESS_URL,
  filterParams,
  getBaseUrl,
} from "@api/index";
import { TokenProps } from "@api/TokenApi";
import {
  AddressProps,
  RawTokensWithPaginationProps,
  TokensListPageParamsProps,
} from "@api/types";
import { RawTokenWithPaginationProps } from "@api/TokensApi";

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
    getTokens: builder.mutation<
      RawTokenWithPaginationProps,
      {
        network: NetworkConnection;
        contractAddressHash?: string;
        holderCount?: string;
        isNameNull?: string;
        itemsCount?: string;
        marketCap?: string;
        name?: string;
      }
    >({
      query: ({
        network,
        contractAddressHash,
        holderCount,
        isNameNull,
        itemsCount,
        marketCap,
        name,
      }) => {
        const baseUrl = getBaseUrl(network);
        const params = filterParams([
          { key: "contract_address_hash", value: contractAddressHash },
          { key: "holder_count", value: holderCount },
          { key: "is_name_null", value: isNameNull },
          { key: "items_count", value: itemsCount },
          { key: "market_cap", value: marketCap },
          { key: "name", value: name },
        ]);
        return {
          url: `${baseUrl}/${TOKENS_URL}${params}`,
          method: "GET",
        };
      },
    }),
    getContractTokens: builder.mutation<
      RawTokensWithPaginationProps,
      {
        network: NetworkConnection;
        addressHash: string;
        queryParams: TokensListPageParamsProps;
      }
    >({
      query: ({ network, addressHash, queryParams }) => {
        const params = queryParams
          ? filterParams([
              {
                key: "fiat_value",
                value:
                  queryParams?.fiat_value || queryParams?.fiat_value === ""
                    ? "null"
                    : queryParams?.fiat_value,
              },
              { key: "items_count", value: queryParams?.items_count },
              { key: "value", value: queryParams?.value },
              { key: "id", value: queryParams?.id },
            ])
          : "";
        return {
          url: `${getBaseUrl(
            network
          )}/${WALLET_ADDRESS_URL}/${addressHash}/tokens${params}`,
          method: "GET",
        };
      },
    }),
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

export const {
  useGetTokensMutation,
  useGetContractTokensMutation,
  useGetTokenHoldersMutation,
  useGetTokenTransfersMutation,
} = tokenApi;
