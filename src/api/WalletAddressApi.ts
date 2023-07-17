import {
  WALLET_ADDRESS_URL,
  filterParams,
  getBaseUrl,
  wrapResponse,
} from "@api/index";
import {
  RawTokensWithPaginationProps,
  TokenItemI,
  TokensListPageParamsProps,
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
  getTokens: async (
    network: NetworkConnection,
    aid: string,
    queryParams: TokensListPageParamsProps
  ): Promise<RawTokensWithPaginationProps> => {
    const baseUrl = getBaseUrl(network);
    const params = queryParams
      ? filterParams([
          {
            key: "fiat_value",
            value:
              queryParams?.fiat_value || queryParams?.fiat_value === ""
                ? "null"
                : queryParams?.fiat_value,
          },
          { key: "items_count", value: queryParams?.items_count },
          { key: "value", value: queryParams?.value },
          { key: "id", value: queryParams?.id },
        ])
      : "";
    const res = await fetch(
      `${baseUrl}/${WALLET_ADDRESS_URL}/${aid}/tokens${params}`
    );
    return wrapResponse<RawTokensWithPaginationProps>(res);
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
