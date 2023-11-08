import { formatEther } from "viem";

export const getRewards = (rewards): string =>
  formatEther(
    rewards !== undefined && rewards.length > 0 ? rewards[0].reward : 0,
  );
