import { utils } from "ethers";

export const getRewards = (rewards): string =>
  utils.formatEther(
    rewards !== undefined && rewards.length > 0 ? rewards[0].reward : 0
  );
