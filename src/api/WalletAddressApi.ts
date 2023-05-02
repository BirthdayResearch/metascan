import { WALLET_ADDRESS_URL, wrapResponse } from "@api/index";
import { WalletAddressCounterI, WalletAddressInfoI } from "@api/types";

export default {
  getDetail: async (aid: string): Promise<WalletAddressInfoI> => {
    const res = await fetch(`${WALLET_ADDRESS_URL}/${aid}`);
    return wrapResponse<WalletAddressInfoI>(res);
  },
  getCounters: async (aid: string): Promise<WalletAddressCounterI> => {
    const res = await fetch(`${WALLET_ADDRESS_URL}/${aid}/counters`);
    return wrapResponse<WalletAddressCounterI>(res);
  },
};

// `https://base-goerli.blockscout.com/api/v2/addresses/${aid}/transactions`
