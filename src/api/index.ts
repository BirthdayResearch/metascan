import { NetworkConnection } from "@contexts/Environment";

const BLOCKSCOUT_ENDPOINT_MAINNET = "https://base-goerli.blockscout.com"; // TODO: Replace with MainNet blockscout URL
const BLOCKSCOUT_ENDPOINT_TESTNET = "https://eth-goerli.blockscout.com"; // TODO: Replace with TestNet blockscout URL

export const MAIN_LATEST_TRANSACTION_URL = "api/v2/main-page/transactions";
export const MAIN_LATEST_BLOCK_URL = "api/v2/main-page/blocks";
export const MAIN_BLOCKS_URL = "api/v2/blocks";
export const TRANSACTIONS_URL = "api/v2/transactions";

export const getBaseUrl = (network: NetworkConnection) => {
  if (network === NetworkConnection.TestNet) {
    return BLOCKSCOUT_ENDPOINT_TESTNET;
  }
  return BLOCKSCOUT_ENDPOINT_MAINNET;
};

export function filterParams(params: { key: string; value }[]): string {
  let queryParams = "?";
  params.forEach((p) => {
    if (p.value && p.value.trim() !== "") {
      queryParams += `${p.key}=${p.value}&`;
    }
  });

  return queryParams;
}
