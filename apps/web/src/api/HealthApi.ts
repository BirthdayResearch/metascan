import { NetworkConnection } from "@contexts/Environment";
import { HEALTH_URL, getRpcUrl, wrapResponse } from "./index";

export default {
  getHealth: async (network: NetworkConnection): Promise<HealthI> => {
    const rpcUrl = getRpcUrl(network);
    const res = await fetch(`${rpcUrl}/${HEALTH_URL}`);
    return wrapResponse<HealthI>(res);
  },
};

export interface HealthI {
  data: {
    cache_latest_block_inserted_at: string;
    cache_latest_block_number: string;
    latest_block_inserted_at: string;
    latest_block_number: string;
  };
  healthy: boolean;
}
