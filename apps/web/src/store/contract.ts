import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SMART_CONTRACT_URL, getRpcUrl } from "@api/index";
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
  additional_sources?: {
    file_path?: string;
    source_code: string;
  }[];
}

interface ContractVerificationConfig {
  verification_options: string[];
  solidity_compiler_versions: string[];
  solidity_evm_versions: string[];
  vyper_compiler_versions: string[];
  vyper_evm_versions: string[];
  is_rust_verifier_microservice_enabled: boolean;
}

export const contractApi = createApi({
  reducerPath: "contract",
  baseQuery: fetchBaseQuery({
    baseUrl: "/", // This will be overridden by query url below, need to dynamically get the base url based on network
  }),
  endpoints: (builder) => ({
    getContract: builder.query<
      RawContractProps,
      { network: NetworkConnection; addressHash: string }
    >({
      query: ({ network, addressHash }) => ({
        url: `${getRpcUrl(network)}/${SMART_CONTRACT_URL}/${addressHash}`,
        method: "GET",
      }),
    }),
  }),
});

export const contractMethodsApi = createApi({
  reducerPath: "contractMethods",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getContractMethods: builder.mutation<
      SmartContractMethod[],
      {
        network: NetworkConnection;
        addressHash: string;
        type: ContractMethodType;
      }
    >({
      query: ({ network, addressHash, type }) => ({
        url: `${getRpcUrl(
          network,
        )}/${SMART_CONTRACT_URL}/${addressHash}/methods-${type}?is_custom_abi=false`,
        method: "GET",
      }),
    }),
  }),
});

export const contractVerificationApi = createApi({
  reducerPath: "contractVerification",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getVerificationConfig: builder.query<
      ContractVerificationConfig,
      { network: NetworkConnection }
    >({
      query: ({ network }) => ({
        url: `${getRpcUrl(network)}/${SMART_CONTRACT_URL}/verification/config`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetContractQuery } = contractApi;
export const { useGetContractMethodsMutation } = contractMethodsApi;
export const { useGetVerificationConfigQuery } = contractVerificationApi;
