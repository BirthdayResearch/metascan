import { NetworkConnection } from "@contexts/Environment";
import { getBaseUrl } from "@api/index";
import { TransactionResponse } from "ethers";
import axios from "axios";

export default {
  sendFundsToUser: async (
    network: NetworkConnection,
    recaptchaValue: string,
    contractAddressHash: string,
  ): Promise<FaucetTransactionResponse> => {
    const baseUrl = getBaseUrl();
    const res = await axios(
      `${baseUrl}/faucet/${contractAddressHash}?network=${network}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          recaptchaValue,
        }),
      },
    );
    return res?.data;
  },
};

export interface FaucetTransactionResponse extends TransactionResponse {
  statusCode?: number;
}
