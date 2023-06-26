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
}

export interface WalletAddressCounterI {
  transactions_count: string;
  token_transfers_count: string;
  gas_usage_count: string;
  validations_count: string;
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
export interface RawTxnWithPaginationProps {
  items: RawTransactionI[];
  next_page_params?: {
    block_number?: string;
    items_count?: string;
    index?: string;
  };
}

export interface RawTransactionI {
  tx_types: string[];
  type: number;
  hash: string;
  value: string;
  from: { hash: string; is_contract: boolean };
  to: { hash: string; is_contract: boolean } | null;
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
}

export interface TokenTransferProps {
  from: {
    hash: string;
    isContract: boolean;
    isVerified: boolean;
  };
  to: {
    hash: string;
    isContract: boolean;
    isVerified: boolean;
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
  tokenTransfers?: TokenTransferProps[];
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

interface RawTokenTransferDirectionProps {
  hash: string;
  implementation_name?: string;
  is_contract: boolean;
  is_verified: boolean;
  name?: string;
  private_tags: [];
  public_tags: [];
  watchlist_names: [];
}
export interface RawTxTokenTransfersProps {
  block_hash;
  from: RawTokenTransferDirectionProps;
  to: RawTokenTransferDirectionProps;
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

export interface SmartContractListItemProps {
  address: {
    hash: string;
    implementation_name: string | null;
    is_contract: boolean;
    is_verified: boolean | null;
    name: string;
    private_tags: string[];
    public_tags: string[];
    watchlist_names: string[];
  };
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
