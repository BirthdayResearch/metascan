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
export const SMART_CONTRACT_URL = "api/v2/smart-contracts";

export const getBaseUrl = (network: NetworkConnection) => {
  if (network === NetworkConnection.TestNet) {
    return process.env.RPC_URL_TESTNET;
  }
  return process.env.RPC_URL_MAINNET;
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
