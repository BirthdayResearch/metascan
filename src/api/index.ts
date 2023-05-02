export const BLOCKSCOUT_ENDPOINT = "https://eth-goerli.blockscout.com/";
// const BLOCKSCOUT_ENDPOINT = "https://base-goerli.blockscout.com/";

export const MAIN_LATEST_TRANSACTION_URL = `${BLOCKSCOUT_ENDPOINT}api/v2/main-page/transactions`;
export const MAIN_LATEST_BLOCK_URL = `${BLOCKSCOUT_ENDPOINT}api/v2/main-page/blocks`;

export const WALLET_ADDRESS_URL = `${BLOCKSCOUT_ENDPOINT}api/v2/addresses`;

export function wrapResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status}`);
  }

  return res.json();
}
