import { NetworkConnection } from "@contexts/Environment";
import { getBaseUrl } from "@api/index";

export default {
  sendFundsToUser: async (
    network: NetworkConnection,
    contractAddressHash?: string,
  ): Promise<FaucetTransactionResponse> => {
    const baseUrl = getBaseUrl();
    const res = await fetch(
      `${baseUrl}faucet/${contractAddressHash}?network=${network}`,
    );
    return res.json();
  },
};

export interface FaucetTransactionResponse {
  message?: string;
  blockHash?: string;
  blockNumber?: string;
  chainId?: string;
  data?: string;
  from?: string;
  gasLimit?: string;
  gasPrice?: string;
  hash?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  nonce?: string;
  to?: string;
  type?: string;
  value?: string;
  signature?: {
    networkV?: string;
    r?: string;
    s?: string;
    v?: string;
  };
}
