import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SMART_CONTRACT_URL, getBaseUrl } from "@api/index";
import {
  ContractMethodType,
  SmartContractMethod,
  StateMutability,
} from "@api/types";
import { NetworkConnection } from "@contexts/Environment";

interface DataFlowProps {
  internalType: string;
  name: string;
  type: string;
}

interface ContractAbiProps {
  inputs: DataFlowProps[];
  outputs?: DataFlowProps[];
  name?: string;
  type: string;
  stateMutability?: StateMutability;
  anonymous?: boolean;
}

export interface RawContractProps {
  abi: ContractAbiProps[];
  compiler_settings?: string;
  compiler_version: string;
  constructor_args: string;
  creation_bytecode?: string;
  deployed_bytecode?: string;
  evm_version: string;
  is_changed_bytecode: boolean;
  is_fully_verified: boolean;
  is_partially_verified: boolean;
  is_self_destructed: boolean;
  is_verified: boolean;
  is_verified_via_eth_bytecode_db: boolean;
  is_verified_via_sourcify: boolean;
  is_vyper_contract: boolean;
  name: string;
  optimization_enabled: boolean;
  optimization_runs?: any;
  source_code: string;
  verified_at: string;
  file_path?: string;

  // Contract with multiple files stored here
  additional_sources: {
    file_path?: string;
    source_code: string;
  }[];
}

export const contractApi = createApi({
  reducerPath: "contract",
  baseQuery: fetchBaseQuery({
    baseUrl: "/", // This will be overridden by query url below, need to dynamically get the base url based on network
  }),
  endpoints: (builder) => ({
    getContract: builder.query<
      RawContractProps,
      { network: NetworkConnection; cid: string }
    >({
      query: ({ network, cid }) => ({
        url: `${getBaseUrl(network)}/${SMART_CONTRACT_URL}/${cid}`,
        method: "GET",
      }),
    }),
  }),
});

export const contractMethodsApi = createApi({
  reducerPath: "contractMethods",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getContractMethods: builder.query<
      SmartContractMethod[],
      {
        network: NetworkConnection;
        cid: string;
        type: ContractMethodType;
      }
    >({
      query: ({ network, cid, type }) => ({
        url: `${getBaseUrl(
          network
        )}/${SMART_CONTRACT_URL}/${cid}/methods-${type}?is_custom_abi=false`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetContractQuery } = contractApi;
export const { useGetContractMethodsQuery } = contractMethodsApi;
