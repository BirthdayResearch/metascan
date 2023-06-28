import { formatEther, formatUnits } from "viem";
import {
  CreatedContractProps,
  RawTransactionI,
  RawTransactionType,
  RawTxTokenTransfersProps,
  TokenTransferProps,
  TransactionI,
  TransactionStatus,
  TransactionType,
} from "@api/types";
import { BURN_ADDRESS_HASH, DFI_TOKEN_SYMBOL, GWEI_DECIMAL } from "./constants";
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
    dfiAmount = formatEther(
      BigInt((tx.decoded_input?.parameters[amountIndex].value as string) ?? "0")
    );
  }

  const fromHash = tx.from.hash ?? BURN_ADDRESS_HASH;
  const toHash = tx.to?.hash ?? tx.created_contract?.hash ?? BURN_ADDRESS_HASH;
  const isFromContract = tx.from.is_contract;
  const isToContract = !!(
    tx.to?.is_contract || tx.created_contract?.hash !== undefined
  );
  const tokenTransfers =
    tx.token_transfers?.length > 0 ? getTokenTransfers(tx.token_transfers) : [];
  const transactionType = getTransactionType({
    toHash,
    tokenTransfers,
    isFromContract,
    isToContract,
    txTypes: tx.tx_types,
    createdContract: tx.created_contract,
  });
  const transactionStatus = getTransactionStatus({
    status: tx.status,
    block: tx.block,
  });

  return {
    transactionType,
    type: tx.type,
    hash: tx.hash,
    amount: dfiAmount,
    symbol: DFI_TOKEN_SYMBOL, // TODO: Revisit tx symbol
    from: fromHash,
    to: toHash,
    isFromContract,
    isToContract,
    status: transactionStatus,
    result: tx.result,
    timeInSec: getTimeAgo(tx.timestamp),
    timestamp: tx.timestamp,
    nonce: tx.nonce,
    blockNumber: tx.block,
    value: formatEther(BigInt(tx.value ?? "0")),
    fee: formatEther(BigInt(tx.fee.value ?? "0")),
    gasUsed: tx.gas_used,
    gasLimit: tx.gas_limit,
    gasPrice: formatUnits(BigInt(tx.gas_price ?? "0"), GWEI_DECIMAL).toString(),
    position: tx.position,
    maxFeePerGas: tx.max_fee_per_gas,
    maxPriorityFeePerGas: tx.max_priority_fee_per_gas,
    rawInput: tx.raw_input,
    decodedInput: tx.decoded_input,
    revertReason: tx.revert_reason,
    method: tx.method,
    confirmations: tx.confirmations,
    tokenTransfers: tx.token_transfers
      ? getTokenTransfers(tx.token_transfers)
      : undefined,
  };
};

// To get Tokens minted
export const getTokenTransfers = (tokenTransfers: RawTxTokenTransfersProps[]) =>
  tokenTransfers.map((tokenTransfer) => ({
    from: {
      hash: tokenTransfer.from.hash,
      isContract: tokenTransfer.from.is_contract,
      isVerified: tokenTransfer.from.is_verified,
    },
    to: {
      hash: tokenTransfer.to.hash,
      isContract: tokenTransfer.to.is_contract,
      isVerified: tokenTransfer.to.is_verified,
    },
    forToken: {
      from: tokenTransfer.to.hash,
      to: tokenTransfer.from.hash,
      value: formatUnits(
        BigInt(tokenTransfer.total.value),
        Number(tokenTransfer.total.decimals ?? GWEI_DECIMAL)
      ),
      address: tokenTransfer.token.address,
      type: tokenTransfer.token.type,
      symbol: tokenTransfer.token.symbol ?? "",
    },
    type: tokenTransfer.type,
  }));

/*
  Equivalent logic of transaction_to_status from blockscout
*/
export const getTransactionStatus = ({
  status,
  block,
}: {
  status: string;
  block: string;
}): TransactionStatus => {
  if (status === null && block === null) {
    return TransactionStatus.Pending;
  }
  if (status === "ok") {
    return TransactionStatus.Success;
  }
  return TransactionStatus.Failed;
};

/*
  Equivalent logic of transaction_display_type from blockscout
*/
export const getTransactionType = ({
  toHash,
  tokenTransfers,
  isFromContract,
  isToContract,
  txTypes,
  createdContract,
}: {
  toHash: string | null;
  tokenTransfers: TokenTransferProps[];
  isFromContract: boolean;
  isToContract: boolean;
  txTypes: string[];
  createdContract?: CreatedContractProps;
}) => {
  let transactionType = TransactionType.Transaction;
  // Note: tokenTransfers is always null in transactions list api
  // To workaround the missing data, tx_types is used to determine if it involvesTokenTransfers
  const involvesTokenTransfers =
    tokenTransfers?.length > 0 ||
    (txTypes.includes(RawTransactionType.TokenTransfer) &&
      !txTypes.includes(RawTransactionType.ContractCreation));
  // const involvesCoinTransfer =
  //   txTypes.includes(RawTransactionType.CoinTransfer) &&
  //   !txTypes.includes(RawTransactionType.ContractCreation);
  const involvesContract =
    isFromContract || isToContract || createdContract !== undefined;

  if (involvesTokenTransfers) {
    transactionType = getTransactionTypeFromTokenTransfers(tokenTransfers);
  } else if (toHash === BURN_ADDRESS_HASH) {
    transactionType = TransactionType.ContractCreation;
  } else if (involvesContract) {
    transactionType = TransactionType.ContractCall;
  }
  // Display Transaction as tx type for CoinTransfer
  // else if (involvesCoinTransfer) {
  //   transactionType = TransactionType.CoinTransfer;
  // }
  else {
    transactionType = TransactionType.Transaction;
  }

  return transactionType;
};

/*
  Equivalent logic of get_transaction_type_from_token_transfers from blockscout
*/
const getTransactionTypeFromTokenTransfers = (
  tokenTransfers: TokenTransferProps[]
) => {
  if (tokenTransfers.length > 0) {
    if (
      tokenTransfers.filter((tt) => tt.type === RawTransactionType.TokenBurning)
        .length === tokenTransfers.length
    ) {
      return TransactionType.TokenBurning;
    }
    if (
      tokenTransfers.filter((tt) => tt.type === RawTransactionType.TokenMinting)
        .length === tokenTransfers.length
    ) {
      return TransactionType.TokenMinting;
    }
    if (
      tokenTransfers.filter(
        (tt) => tt.type === RawTransactionType.TokenCreation
      ).length === tokenTransfers.length
    ) {
      return TransactionType.TokenCreate;
    }
  }

  return TransactionType.TokenTransfer;
};
