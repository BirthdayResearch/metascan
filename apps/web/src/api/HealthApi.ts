import { NetworkConnection } from "@contexts/Environment";
import { HEALTH_URL, getBaseUrl, wrapResponse } from "./index";

export default {
  getHealth: async (network: NetworkConnection): Promise<HealthI> => {
    const baseUrl = getBaseUrl(network);
    const res = await fetch(`${baseUrl}/${HEALTH_URL}`);
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
