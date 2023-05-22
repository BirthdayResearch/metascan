import { utils } from "ethers";
import {
  RawTransactionI,
  TransactionI,
  TransactionStatus,
  TransactionType,
} from "@api/types";
import { DFI_TOKEN_SYMBOL } from "./constants";
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

  //  TODO: Revisit tx types mapping
  const type = tx.tx_types?.length > 0 ? tx.tx_types[0] : null;
  let transactionType = TransactionType.Transaction;
  if (type?.includes("contract")) {
    transactionType = TransactionType.ContractCall;
  } else if (type?.includes("token")) {
    transactionType = TransactionType.Tokenized;
  }

  return {
    transactionType,
    type: tx.type,
    hash: tx.hash,
    amount: dfiAmount,
    symbol: DFI_TOKEN_SYMBOL, // TODO: Revisit tx symbol
    from: tx.from.hash,
    to: tx.to?.hash ?? null,
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
    gasPrice: tx.gas_price,
    maxFeePerGas: tx.max_fee_per_gas,
    maxPriorityFeePerGas: tx.max_priority_fee_per_gas,
    rawInput: tx.raw_input,
    decodedInput: tx.decoded_input,
    revertReason: tx.revert_reason,
    method: tx.method,
    confirmations: tx.confirmations,
  };
};
