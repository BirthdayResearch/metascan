import BigNumber from "bignumber.js";

// TODO(pierregee): Dependent to how DMC rewards pass the data
export const getRewards = (rewards): BigNumber =>
  new BigNumber(
    rewards !== undefined && rewards.length > 0 ? rewards[0].reward : 0
  );
