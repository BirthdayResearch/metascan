import { TokenProps } from "./TokenApi";

export interface WalletAddressToken {
  address: string;
  type: string;
  symbol: string;
  name: string;
  decimals: string;
  holders: string;
  exchange_rate: string;
  total_supply: string;
}

export interface PrivateTag {
  address_hash: string;
  display_name: string;
  label: string;
}

export interface WatchlistName {
  display_name: string;
  label: string;
}

export interface PublicTag {
  address_hash: string;
  display_name: string;
  label: string;
}

export interface WalletAddressInfoI {
  creator_address_hash: string;
  creation_tx_hash: string;
  token: WalletAddressToken;
  coin_balance: string;
  exchange_rate: string;
  implementation_address: string;
  block_number_balance_updated_at: number;
  hash: string;
  implementation_name: string;
  name: string;
  is_contract: boolean;
  private_tags: PrivateTag[];
  watchlist_names: WatchlistName[];
  public_tags: PublicTag[];
  is_verified: boolean;
  has_tokens: boolean;
  has_logs: boolean;
  has_token_transfers: boolean;
}

export interface WalletAddressCounterI {
  transactions_count: string;
  token_transfers_count: string;
  gas_usage_count: string;
  validations_count: string;
}

export interface WalletAddressTokenBalanceI {
  token: TokenProps;
  token_id: string | null;
  token_instance: string | null;
  value: string;
}

export enum TransactionStatus {
  Success = "Success",
  Failed = "Failed",
  Pending = "Pending",
}

export enum RawTransactionType {
  Transaction = "Transaction",
  Tokenized = "Tokenized",
  ContractCreation = "contract_creation",
  ContractCall = "contract_call",
  CoinTransfer = "coin_transfer",

  // Token Transfer Types
  TokenBurning = "token_burning",
  TokenMinting = "token_minting",
  TokenCreation = "token_spawning",
  TokenTransfer = "token_transfer",
}

export enum TransactionType {
  TokenMinting = "Token minting",
  TokenBurning = "Token burning",
  TokenTransfer = "Token transfer",
  TokenCreate = "Token creation",

  ContractCreation = "Contract creation",
  ContractCall = "Contract call",
  Tokenized = "Tokenized", // not in DMC
  CoinTransfer = "Coin transfer",
  Transaction = "Transaction",
}

interface TxParameters {
  name: string;
  type: string;
  value: string;
}

export interface DecodedTxInput {
  method_id: string;
  method_call: string;
  parameters: TxParameters[];
}

export interface TxnNextPageParamsProps {
  block_number: string;
  items_count: string;
  index: string;
}

export interface RawTxnWithPaginationProps {
  items: RawTransactionI[];
  next_page_params?: TxnNextPageParamsProps;
}

export interface RawTransactionI {
  tx_types: string[];
  type: number;
  hash: string;
  value: string;
  from: AddressProps;
  to: AddressProps | null;
  status: string;
  result: string;
  timestamp: string;
  nonce: number;
  block: string;
  fee: { type: string; value: string };
  gas_used: string;
  gas_limit: string;
  gas_price: string;
  position: number;
  max_fee_per_gas: string | null;
  max_priority_fee_per_gas: string | null;
  raw_input: string;
  decoded_input: DecodedTxInput | null;
  revert_reason: string | null;
  method: string | null;
  confirmations: number;
  token_transfers?: any;
  created_contract?: AddressProps;
}

export interface TxTokenTransferProps {
  from: {
    hash: string;
    isContract: boolean;
    isVerified: boolean | null;
  };
  to: {
    hash: string;
    isContract: boolean;
    isVerified: boolean | null;
  };
  type: string;
  forToken: {
    from: string;
    to: string;
    value: string;
    address: string;
    type: string;
    symbol: string;
  };
}
export interface TransactionI {
  transactionType: TransactionType;
  type: number;
  hash: string;
  amount: string;
  symbol: string;
  from: string;
  to: string;
  isFromContract: boolean;
  isToContract: boolean;
  status: TransactionStatus;
  result: string;
  timeInSec: number;
  timestamp: string;
  nonce: number;
  blockNumber: string;
  value: string;
  fee: string;
  gasUsed: string;
  gasLimit: string;
  gasPrice: string;
  position: number;
  maxFeePerGas: string | null;
  maxPriorityFeePerGas: string | null;
  rawInput: string;
  decodedInput: DecodedTxInput | null;
  revertReason: string | null;
  method: string | null;
  confirmations: number;
  tokenTransfers?: TxTokenTransferProps[];
}

export interface BlockProps {
  base_fee_per_gas: string;
  burnt_fees: string;
  gas_limit: string;
  gas_used: string;
  gas_used_percentage: number;
  height: number;
  hash: string;
  miner: {
    hash: string;
  };
  rewards: any; // TODO: Dependent to DMC rewards
  timestamp: string;
  tx_count: number;
  parent_hash: string;
  size: number;
}

export interface RawTxTokenTransfersProps {
  block_hash;
  from: AddressProps;
  to: AddressProps;
  token: {
    address: string;
    decimals?: string | number;
    exhange_rate?: string | number;
    holders: string;
    name?: string;
    symbol?: string;
    total_supply: string;
    type: string;
  };
  type: string;
  total: {
    decimals?: string | number;
    value: string;
  };
}

// V1 API response
export interface RawTransactionV1 {
  message: string;
  result: RawTransactionI | null;
  status: string;
}

export interface AddressProps {
  hash: string;
  implementation_name: string | null;
  is_contract: boolean;
  is_verified: boolean | null;
  name: string;
  private_tags: string[];
  public_tags: string[];
  watchlist_names: string[];
}

export interface SmartContractListItemProps {
  address: AddressProps;
  coin_balance: number;
  compiler_version: string;
  has_constructor_args: boolean;
  language: string;
  market_cap: number | null;
  optimization_enabled: boolean;
  tx_count: number | null;
  verified_at: string;
}

export interface SmartContractPageParamsProps {
  items_count: string;
  smart_contract_id: string;
}

export interface SmartContractWithPaginationProps {
  items: SmartContractListItemProps[];
  next_page_params: SmartContractPageParamsProps;
}

// TODO (Lyka): Check if we can add typings
// type InputOutputType = "address" | "_owner" | "uint256" | "bool";
// type MethodType = "function";
export enum StateMutability {
  "Payable" = "payable",
  "Nonpayable" = "nonpayable",
  "View" = "view",
  "Pure" = "pure",
}

export interface SmartContractInputOutput {
  internalType: string;
  name: string;
  type: string;
}

export interface SmartContractOutputWithValue {
  type: string;
  value: any;
}

export interface SmartContractMethod {
  inputs: SmartContractInputOutput[] | [];
  outputs: SmartContractInputOutput[] | SmartContractOutputWithValue[];
  method_id?: string;
  name: string;
  names?: string[];
  stateMutability: StateMutability;
  type: string;
  description?: string; // TODO: Check if possible to get
  error?: string;
}

export enum ContractMethodType {
  Read = "read",
  Write = "write",
  ReadProxy = "read-proxy",
  WriteProxy = "write-proxy",
}

export interface SCVersionsBuilds {
  build: string;
  longVersion: string;
  sha256: string;
  path: string;
  version: string;
}
export interface SCVersionsResponseProps {
  builds: SCVersionsBuilds[];
}

export enum CompilerType {
  "SoliditySingleFile" = "Solidity (Single file)",
  "SolidityMultiPartFiles" = "Solidity (Multi-Part files)",
  "SolidityStandardJsonInput" = "Solidity (Standard-Json-Input)",
  "Vyper" = "Vyper (Experimental)",
}

export interface RawTokenI {
  address: string;
  circulating_market_cap?: string;
  decimals: string;
  exchange_rate?: string;
  holders: string;
  icon_url?: string;
  name: string;
  symbol: string;
  total_supply: string;
  type: string;
}

export interface TokenItemI {
  token: RawTokenI;
  token_id?: string;
  token_instance?: string;
  value: string;
}

export interface RawTokensWithPaginationProps {
  items: TokenItemI[];
  next_page_params?: {
    block_number?: string;
    items_count?: string;
    index?: string;
  };
}
export interface TokensListPageParamsProps {
  fiat_value?: string | null;
  id?: string;
  items_count?: string;
  value?: string;
}
