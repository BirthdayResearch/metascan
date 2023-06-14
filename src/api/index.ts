import { NetworkConnection } from "@contexts/Environment";

export function wrapResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status}`);
  }

  return res.json();
}

export const MAIN_LATEST_TRANSACTION_URL = "api/v2/main-page/transactions";
export const MAIN_LATEST_BLOCK_URL = "api/v2/main-page/blocks";
export const MAIN_BLOCKS_URL = "api/v2/blocks";
export const TRANSACTIONS_URL = "api/v2/transactions";
export const WALLET_ADDRESS_URL = "api/v2/addresses";
export const V1_TRANSACTION_URL =
  "api?module=transaction&action=gettxinfo&txhash=";

export const getBaseUrl = (network: NetworkConnection) => {
  if (network === NetworkConnection.TestNet) {
    return process.env.NEXT_PUBLIC_RPC_URL_TESTNET;
  }
  return process.env.NEXT_PUBLIC_RPC_URL_TESTNET; // TODO: Replace with NEXT_PUBLIC_RPC_URL_MAINNET when MainNet is enabled
};

export function filterParams(params: { key: string; value }[]): string {
  let queryParams = "";

  params.forEach((p) => {
    if (p.value && p.value.trim() !== "") {
      queryParams += `${p.key}=${p.value}&`;
    }
  });

  return queryParams?.trim() !== "" ? `?${queryParams}` : queryParams;
}
