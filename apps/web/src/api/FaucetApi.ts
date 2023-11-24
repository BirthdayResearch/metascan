import { NetworkConnection } from "@contexts/Environment";
import { getBaseUrl } from "@api/index";
import { TransactionResponse } from "ethers";

export default {
  sendFundsToUser: async (
    network: NetworkConnection,
    recaptchaValue: string,
    contractAddressHash: string,
  ): Promise<FaucetTransactionResponse> => {
    const baseUrl = getBaseUrl();
    const res = await fetch(
      `${baseUrl}faucet/${contractAddressHash}?network=${network}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recaptchaValue,
        }),
      },
    );
    return res.json();
  },
};

export interface FaucetTransactionResponse extends TransactionResponse{
  statusCode?: number
}
