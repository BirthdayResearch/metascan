import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NetworkConnection } from "@contexts/Environment";
import { WALLET_ADDRESS_URL, filterParams, getBaseUrl } from "@api/index";
import { AddressProps } from "@api/types";

export interface Log {
  tx_hash: string;
  address: AddressProps;
  data: string;
  index: number;
  topics: string[];
}

export interface LogsPageParamsProps {
  items_count: string;
  block_number: string;
  index: string;
}

export interface LogsWithPaginationProps {
  items: Log[];
  next_page_params: LogsPageParamsProps;
}

export const addressApi = createApi({
  reducerPath: "address",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  endpoints: (builder) => ({
    getAddressLogs: builder.mutation<
      LogsWithPaginationProps,
      {
        network: NetworkConnection;
        addressHash: string;
        itemsCount: string;
        blockNumber: string;
        index: string;
      }
    >({
      query: ({ network, addressHash, itemsCount, blockNumber, index }) => {
        const params = filterParams([
          { key: "items_count", value: itemsCount },
          { key: "block_number", value: blockNumber },
          { key: "index", value: index },
        ]);
        return {
          url: `${getBaseUrl(
            network
          )}/${WALLET_ADDRESS_URL}/${addressHash}/logs${params}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAddressLogsMutation } = addressApi;
