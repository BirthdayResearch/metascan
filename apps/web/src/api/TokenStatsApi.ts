import { useNetwork } from "@contexts/NetworkContext";
import { NetworkConnection } from "@contexts/Environment";
import mockData from "../mockdata/TokenPriceHistory";

export default {
  useTokenStats: () => {
    const { connection } = useNetwork();
    if (connection === NetworkConnection.MainNet) {
      // TODO: This condition is for devs to test negative trend data. Remove once api is ready.
      return {
        ...mockData.tokenStats,
        percentChange: -mockData.tokenStats.percentChange,
      };
    }
    return mockData.tokenStats;
  },
  useTokenPriceHistory: () => {
    const { connection } = useNetwork();
    if (connection === NetworkConnection.MainNet) {
      // TODO: This condition is for devs to test negative trend data. Remove once api is ready.
      return [...mockData.tokenPriceChangeHistory].reverse();
    }
    return mockData.tokenPriceChangeHistory;
  },
};
