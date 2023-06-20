import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl, SMART_CONTRACT_URL } from "@api/index";
import { NetworkConnection } from "@contexts/Environment";
import { SmartContractMethod } from "@api/types";

export const contractMethodsApi = createApi({
  reducerPath: "contractMethods",
  baseQuery: fetchBaseQuery({
    baseUrl: "/", // This will be overridden by query url below, need to dynamically get the base url based on network
  }),
  endpoints: (builder) => ({
    getContractMethods: builder.query<
      SmartContractMethod[],
      {
        network: NetworkConnection;
        smartContractId: string;
        method: "read" | "write";
      }
    >({
      query: ({ network, smartContractId, method }) => ({
        url: `${getBaseUrl(
          network
        )}/${SMART_CONTRACT_URL}/${smartContractId}/methods-${method}?is_custom_abi=false`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetContractMethodsQuery } = contractMethodsApi;
