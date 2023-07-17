import { WALLET_ADDRESS_URL, getBaseUrl, wrapResponse } from "@api/index";
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
    aid: string
  ): Promise<WalletAddressInfoI> => {
    const baseUrl = getBaseUrl(network);
    const res = await fetch(`${baseUrl}/${WALLET_ADDRESS_URL}/${aid}`);
    return wrapResponse<WalletAddressInfoI>(res);
  },
  getCounters: async (
    network: NetworkConnection,
    aid: string
  ): Promise<WalletAddressCounterI> => {
    const baseUrl = getBaseUrl(network);
    const res = await fetch(`${baseUrl}/${WALLET_ADDRESS_URL}/${aid}/counters`);
    return wrapResponse<WalletAddressCounterI>(res);
  },
  getAllTokens: async (
    network: NetworkConnection,
    aid: string
  ): Promise<TokenItemI[]> => {
    const baseUrl = getBaseUrl(network);
    const res = await fetch(
      `${baseUrl}/${WALLET_ADDRESS_URL}/${aid}/token-balances`
    );
    return wrapResponse<TokenItemI[]>(res);
  },
  getAllAddressTokens: async (
    network: NetworkConnection,
    aid: string
  ): Promise<WalletAddressTokenBalanceI[]> => {
    const baseUrl = getBaseUrl(network);
    const res = await fetch(
      `${baseUrl}/${WALLET_ADDRESS_URL}/${aid}/token-balances`
    );
    return wrapResponse<WalletAddressTokenBalanceI[]>(res);
  },
};
