import { TransactionType } from "@api/types";

export enum AddressType {
  "Contract" = "Contract",
  "Token" = "Token",
  "TokenContract" = "TokenContract",
  "Wallet" = "Wallet",
}

export interface TxnWalletInfo {
  from: string;
  to: string | null;
  transactionType: TransactionType;
}

export interface BlockInfo {
  transactionsPerBlock: string;
  blockTimeInSec: string | null;
}

export interface RowData {
  transactionId: string;
  tokenAmount: string;
  txnOrBlockInfo: TxnWalletInfo | BlockInfo;
  time: number;
}
