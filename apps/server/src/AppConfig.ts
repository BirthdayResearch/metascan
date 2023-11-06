import BigNumber from 'bignumber.js';
import * as Joi from 'joi';

export const DATABASE_URL = 'DATABASE_URL';

export function appConfig() {
  return {
    dbUrl: process.env.DATABASE_URL,
    dvmActivationHeight: process.env.DVM_ACTIVATION_HEIGHT,
    evmRpcUrl: process.env.EVM_RPC_URL,
    network: process.env.NETWORK,
    whaleURL: process.env.DEFICHAIN_WHALE_URL,
    slackWebhookUrl: process.env.SLACK_WEBHOOK_URL,
  };
}

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type AppConfig = DeepPartial<ReturnType<typeof appConfig>>;

export const ENV_VALIDATION_SCHEMA = Joi.object({
  DATABASE_URL: Joi.string(),
  DVM_ACTIVATION_HEIGHT: Joi.string(),
  EVM_RPC_URL: Joi.string(),
  NETWORK: Joi.string(),
});

export const DST20ABI = [
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export interface DST20BalanceMovementOnBlockI {
  transferredBalance: BigNumber;
  receivedBalance: BigNumber;
}

export interface BalanceMovementI {
  gasUsed: BigNumber;
  transferredBalance: BigNumber;
  receivedBalance: BigNumber;
}