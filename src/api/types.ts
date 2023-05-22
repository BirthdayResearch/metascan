export enum TransactionStatus {
  Confirmed = "Confirmed",
  Reverted = "Reverted",
}

export enum TransactionType {
  ContractCall = "Contract call",
  Transaction = "Transaction",
  Tokenized = "Tokenized",
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
