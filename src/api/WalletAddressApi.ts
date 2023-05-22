import { WALLET_ADDRESS_URL, getBaseUrl, wrapResponse } from "@api/index";
import { WalletAddressCounterI, WalletAddressInfoI } from "@api/types";
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
  getAddressTransactions: async (
    network: NetworkConnection,
    aid: string
  ): Promise<any> => {
    const baseUrl = getBaseUrl(network);
    const res = await fetch(
      `${baseUrl}/${WALLET_ADDRESS_URL}/${aid}/transactions`
    );
    return wrapResponse<WalletAddressCounterI>(res);
  },
};
