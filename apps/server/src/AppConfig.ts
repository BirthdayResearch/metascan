import * as Joi from 'joi';

export const DATABASE_URL = 'DATABASE_URL';

export function appConfig() {
  return {
    faucetAmountPerRequest: process.env.FAUCET_AMOUNT_PER_REQUEST || '0.01',
    throttleTimePerAddress: process.env.THROTTLE_TIME_PER_ADDRESS || '86400', // 24 * 60 * 60 (1 Day)
    privateKey: process.env.PRIVATE_KEY,
    evmRpcUrl: process.env.EVM_RPC_URL,
    network: process.env.NETWORK,
  };
}

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type AppConfig = DeepPartial<ReturnType<typeof appConfig>>;

export const ENV_VALIDATION_SCHEMA = Joi.object({
  PRIVATE_KEY: Joi.string().required(),
  FAUCET_AMOUNT_PER_REQUEST: Joi.string(),
  THROTTLE_TIME_PER_ADDRESS: Joi.string(),
  EVM_RPC_URL: Joi.string(),
  NETWORK: Joi.string(),
});
