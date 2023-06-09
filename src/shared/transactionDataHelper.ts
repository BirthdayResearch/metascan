import { utils } from "ethers";
import {
  RawTransactionI,
  RawTransactionType,
  TransactionI,
  TransactionStatus,
  TransactionType,
} from "@api/types";
import { BURN_ADDRESS_HASH, DFI_TOKEN_SYMBOL } from "./constants";
import { getTimeAgo } from "./durationHelper";

/**
 * This function is called from component, to directly transform data in the UI and prevent multiple loop thru the list
 * @param tx raw tx data from the api
 * @returns formatted tx data
 */
export const transformTransactionData = (tx: RawTransactionI): TransactionI => {
  // TODO: Revisit the amount/value format once actual tx data is available
  const amountIndex = tx.decoded_input?.parameters?.findIndex(
    (p) => p.name === "amount"
  );
  let dfiAmount = "0";
  if (amountIndex && amountIndex > -1) {
    dfiAmount = utils.formatEther(
      tx.decoded_input?.parameters[amountIndex].value as string
    );
  }

  const fromHash = tx.from.hash ?? BURN_ADDRESS_HASH;
  const toHash = tx.to?.hash ?? BURN_ADDRESS_HASH;
  const transactionType = getTransactionType({
    txTypes: tx.tx_types,
    fromHash,
    toHash,
  });

  return {
    transactionType,
    type: tx.type,
    hash: tx.hash,
    amount: dfiAmount,
    symbol: DFI_TOKEN_SYMBOL, // TODO: Revisit tx symbol
    from: fromHash,
    to: toHash,
    status:
      tx.status === "ok"
        ? TransactionStatus.Confirmed
        : TransactionStatus.Reverted,
    timeInSec: getTimeAgo(tx.timestamp),
    timestamp: tx.timestamp,
    nonce: tx.nonce,
    blockNumber: tx.block,
    value: utils.formatEther(tx.value),
    fee: utils.formatEther(tx.fee.value),
    gasUsed: tx.gas_used,
    gasLimit: tx.gas_limit,
    gasPrice: utils.formatUnits(tx.gas_price, "gwei").toString(),
    position: tx.position,
    maxFeePerGas: tx.max_fee_per_gas,
    maxPriorityFeePerGas: tx.max_priority_fee_per_gas,
    rawInput: tx.raw_input,
    decodedInput: tx.decoded_input,
    revertReason: tx.revert_reason,
    method: tx.method,
    confirmations: tx.confirmations,
  };
};

export const getTransactionType = ({
  txTypes,
  fromHash,
  toHash,
}: {
  txTypes: string[];
  fromHash: string | null;
  toHash: string | null;
}) => {
  let transactionType = TransactionType.Transaction;
  // Use the last index of tx_types as the type
  const type = txTypes?.length > 0 ? txTypes[txTypes.length - 1] : null;

  if (
    type === RawTransactionType.TokenTransfer &&
    fromHash === BURN_ADDRESS_HASH &&
    toHash !== BURN_ADDRESS_HASH
  ) {
    transactionType = TransactionType.TokenBurning;
  } else if (
    type === RawTransactionType.TokenTransfer &&
    fromHash !== BURN_ADDRESS_HASH &&
    toHash === BURN_ADDRESS_HASH
  ) {
    transactionType = TransactionType.TokenMinting;
  } else if (
    type === RawTransactionType.TokenTransfer &&
    fromHash !== BURN_ADDRESS_HASH &&
    toHash !== BURN_ADDRESS_HASH
  ) {
    transactionType = TransactionType.TokenTransfer;
  } else if (
    type === RawTransactionType.TokenTransfer &&
    fromHash === BURN_ADDRESS_HASH &&
    toHash === BURN_ADDRESS_HASH
  ) {
    transactionType = TransactionType.TokenCreate;
  } else if (type === RawTransactionType.ContractCall) {
    transactionType = TransactionType.ContractCall;
  } else if (type === RawTransactionType.TokenTransfer) {
    transactionType = TransactionType.TokenTransfer;
  } else if (type === RawTransactionType.Tokenized) {
    transactionType = TransactionType.Tokenized;
  } else if (type === RawTransactionType.CoinTransfer) {
    transactionType = TransactionType.Transaction; // TODO: Revisit to check difference of coin transfer and transaction
  } else if (type === RawTransactionType.ContractCreation) {
    transactionType = TransactionType.ContractCreation;
  } else {
    transactionType = TransactionType.Transaction;
  }

  return transactionType;
};
