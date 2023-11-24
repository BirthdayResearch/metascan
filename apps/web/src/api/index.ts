import { getEnvironment, NetworkConnection } from "@contexts/Environment";

export function wrapResponse<T>(res: Response): Promise<T> {
  if (!res?.ok) {
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
export const VERIFY_SMART_CONTRACT_URL =
  "verify_smart_contract/contract_verifications";
export const TOKENS_URL = "api/v2/tokens";
export const HEALTH_URL = "api/v1/health";
export const V1_TRANSACTION_URL =
  "api?module=transaction&action=gettxinfo&txhash=";

export const getRpcUrl = (network: NetworkConnection) => {
  const defaultEnv = getEnvironment().networks[0];
  const currentNetwork = network ?? defaultEnv;
  if (currentNetwork === NetworkConnection.MainNet) {
    return process.env.NEXT_PUBLIC_RPC_URL_MAINNET;
  }
  if (currentNetwork === NetworkConnection.TestNet) {
    return process.env.NEXT_PUBLIC_RPC_URL_TESTNET;
  }

  return process.env.NEXT_PUBLIC_RPC_URL_CHANGI;
};

export const getBaseUrl = () => process.env.NEXT_PUBLIC_SERVER_URL;

export function filterParams(params: { key: string; value }[]): string {
  let queryParams = "";

  params.forEach((p) => {
    if (p.value && p.value.trim() !== "") {
      queryParams += `${p.key}=${p.value}&`;
    }
  });

  return queryParams?.trim() !== "" ? `?${queryParams}` : queryParams;
}
