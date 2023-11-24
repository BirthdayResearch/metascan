import { WALLET_ADDRESS_URL, getRpcUrl, wrapResponse } from "@api/index";
import {
  TokenItemI,
  WalletAddressCounterI,
  WalletAddressInfoI,
  WalletAddressTokenBalanceI,
} from "@api/types";
import { NetworkConnection } from "@contexts/Environment";

export default {
  getDetail: async (
    network: NetworkConnection,
    aid: string,
  ): Promise<WalletAddressInfoI> => {
    const rpcUrl = getRpcUrl(network);
    const res = await fetch(`${rpcUrl}/${WALLET_ADDRESS_URL}/${aid}`);
    return wrapResponse<WalletAddressInfoI>(res);
  },
  getCounters: async (
    network: NetworkConnection,
    aid: string,
  ): Promise<WalletAddressCounterI> => {
    const rpcUrl = getRpcUrl(network);
    const res = await fetch(`${rpcUrl}/${WALLET_ADDRESS_URL}/${aid}/counters`);
    return wrapResponse<WalletAddressCounterI>(res);
  },
  getAllTokens: async (
    network: NetworkConnection,
    aid: string,
  ): Promise<TokenItemI[]> => {
    const rpcUrl = getRpcUrl(network);
    const res = await fetch(
      `${rpcUrl}/${WALLET_ADDRESS_URL}/${aid}/token-balances`,
    );
    return wrapResponse<TokenItemI[]>(res);
  },
  getAllAddressTokens: async (
    network: NetworkConnection,
    aid: string,
  ): Promise<WalletAddressTokenBalanceI[]> => {
    const rpcUrl = getRpcUrl(network);
    const res = await fetch(
      `${rpcUrl}/${WALLET_ADDRESS_URL}/${aid}/token-balances`,
    );
    return wrapResponse<WalletAddressTokenBalanceI[]>(res);
  },
};
