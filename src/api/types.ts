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
  Confirmed = "Confirmed",
  Reverted = "Reverted",
}

export enum RawTransactionType {
  Transaction = "Transaction",
  Tokenized = "Tokenized",
  ContractCreation = "contract_creation",
  ContractCall = "contract_call",
  CoinTransfer = "coin_transfer",
  TokenTransfer = "token_transfer",
}

export enum TransactionType {
  TokenMinting = "Minting token",
  TokenBurning = "Burning token",
  TokenTransfer = "Transfer token",
  TokenCreate = "Create token",

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

interface DecodedTxInput {
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
  from: { hash: string };
  to: { hash: string } | null;
  status: string;
  timestamp: string;
  nonce: number;
  block: string;
  fee: { type: string; value: string };
  gas_used: string;
  gas_limit: string;
  gas_price: string;
  max_fee_per_gas: string | null;
  max_priority_fee_per_gas: string | null;
  raw_input: string;
  decoded_input: DecodedTxInput | null;
  revert_reason: string | null;
  method: string | null;
  confirmations: number;
}

export interface TransactionI {
  transactionType: TransactionType;
  type: number;
  hash: string;
  amount: string;
  symbol: string;
  from: string;
  to: string | null;
  status: TransactionStatus;
  timeInSec: number;
  timestamp: string;
  nonce: number;
  blockNumber: string;
  value: string;
  fee: string;
  gasUsed: string;
  gasLimit: string;
  gasPrice: string;
  maxFeePerGas: string | null;
  maxPriorityFeePerGas: string | null;
  rawInput: string;
  decodedInput: DecodedTxInput | null;
  revertReason: string | null;
  method: string | null;
  confirmations: number;
}

export interface BlockProps {
  base_fee_per_gas: string;
  burnt_fees: string;
  gas_limit: string;
  gas_used: string;
  gas_used_percentage: number;
  height: number;
  miner: {
    hash: string;
  };
  rewards: any; // TODO: Dependent to DMC rewards
  timestamp: string;
  tx_count: number;
}
