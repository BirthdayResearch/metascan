import {
  TransactionI,
  TransactionStatus,
  TransactionType,
} from "./TransactionData";

export interface BlocksI {
  blockHash: string;
  parentHash: string;
  sha3Uncles: string;
  author: string;
  miner: string;
  stateRoot: string;
  transactionsRoot: string;
  receiptsRoot: string;
  number: string;
  gasUsed: string;
  gasLimit: string;
  extraData?: {
    reward: string;
    symbol: string;
  };
  logsBloom: "0x0000000400000000000000000000000001000000000000000080008000000000040000000000000000000002000000000000000000000000000000000000000000000000008000080000000800000000000180000000000800000008000000000000000002000000000000000000080000000000000000000000001000000040000000000000000000000000000000000000000000008000000000000000000000080000000000000000000000040000000002000000000000100080000000000000000200000000000000002084000000010000000000010000000000002000000000000000000000000000040c000000000000000000000000000000000000";
  timestamp: number;
  difficulty: number;
  totalDifficulty: number;
  sealFields: string[];
  uncles: string[];
  blockSize: string;
  transactions: TransactionI[];
}

export const blocks: BlocksI[] = [
  {
    blockHash:
      "0xeebce709490d623354162127bfebd8112587220b2db8290ec5d11b8605f8c1b4",
    parentHash:
      "0x6c34caf76c58f547089e3ed81022e5edaa3792c70d7ccddb6f38255421acc689",
    sha3Uncles:
      "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    author: "0x0000000000000000000000000000000000000000",
    miner: "0x0000000000000000000000000000000000000000",
    stateRoot:
      "0x553d515846f7fe69efe3458fd927f846e88871f256d00f7dc33e99b4d971928f",
    transactionsRoot:
      "0x6def9a60be1fe584046df477c18a4e725b74349cc5919fb4e8e6c5994d73152e",
    receiptsRoot:
      "0x87e6bb1944dfa9f49c8ab8625adc5936788ed3536f0d86d36b1cbead2cf5be20",
    number: "3",
    gasUsed: "526,669",
    gasLimit: "75,000,000",
    extraData: {
      reward: "0.000000345",
      symbol: "DMTCx",
    },
    logsBloom:
      "0x0000000400000000000000000000000001000000000000000080008000000000040000000000000000000002000000000000000000000000000000000000000000000000008000080000000800000000000180000000000800000008000000000000000002000000000000000000080000000000000000000000001000000040000000000000000000000000000000000000000000008000000000000000000000080000000000000000000000040000000002000000000000100080000000000000000200000000000000002084000000010000000000010000000000002000000000000000000000000000040c000000000000000000000000000000000000",
    timestamp: 100,
    difficulty: 0,
    totalDifficulty: 0,
    sealFields: [],
    uncles: [],
    transactions: [
      {
        transactionType: TransactionType.ContractCall,
        hash: "0xa4a8617cddbd0f9343e9427527601c3f3bffad852ds231f2fc2ef59599ff297",
        amount: "100.00000012345",
        from: "0xaab27b150451726ecsds38aa1d0a94505c8729bd1",
        to: "0xaab27b150451726sdsd738aa1d0a94505c8729bd1",
        status: TransactionStatus.Confirmed,
        symbol: "DMTCx",
        time: 221,
        nonce: 0,
        blockHash: null,
        blockNumber: null,
        transactionIndex: null,
        value: 0,
        gasPrice: null,
        maxFeePerGas: null,
        maxPriorityFeePerGas: null,
        gas: 0,
        input: null,
        creates: null,
        raw: null,
        publicKey: null,
        chainId: null,
        standardV: 0,
        v: 0,
        r: 0,
        s: 0,
        accessList: null,
      },
    ],
    blockSize: "976",
  },
  {
    blockHash:
      "0xeebce709494d6d3354162127bfebd8112587220b2db8290ec5d11b8605f8c1b4",
    parentHash:
      "0x6c34caf76c58f547089e3ed81022e5edaa3792c70d7ccddb6f38255421acc689",
    sha3Uncles:
      "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    author: "0x0000000000000000000000000000000000000000",
    miner: "0x0000000000000000000000000000000000000000",
    stateRoot:
      "0x553d515846f7fe69efe3458fd927f846e88871f256d00f7dc33e99b4d971928f",
    transactionsRoot:
      "0x6def9a60be1fe584046df477c18a4e725b74349cc5919fb4e8e6c5994d73152e",
    receiptsRoot:
      "0x87e6bb1944dfa9f49c8ab8625adc5936788ed3536f0d86d36b1cbead2cf5be20",
    number: "2",
    gasUsed: "526,669",
    gasLimit: "75,000,000",
    extraData: {
      reward: "0.000000345",
      symbol: "DMTCx",
    },
    logsBloom:
      "0x0000000400000000000000000000000001000000000000000080008000000000040000000000000000000002000000000000000000000000000000000000000000000000008000080000000800000000000180000000000800000008000000000000000002000000000000000000080000000000000000000000001000000040000000000000000000000000000000000000000000008000000000000000000000080000000000000000000000040000000002000000000000100080000000000000000200000000000000002084000000010000000000010000000000002000000000000000000000000000040c000000000000000000000000000000000000",
    timestamp: 150,
    difficulty: 0,
    totalDifficulty: 0,
    sealFields: [],
    uncles: [],
    transactions: [
      {
        transactionType: TransactionType.ContractCall,
        hash: "0xa4a8617cddbd0f9343e9427527601c3f3bffad852ds231f2fc2ef59599ff297",
        amount: "100.00000012345",
        from: "0xaab27b150451726ecsds38aa1d0a94505c8729bd1",
        to: "0xaab27b150451726sdsd738aa1d0a94505c8729bd1",
        status: TransactionStatus.Confirmed,
        symbol: "DMTCx",
        time: 221,
        nonce: 0,
        blockHash: null,
        blockNumber: null,
        transactionIndex: null,
        value: 0,
        gasPrice: null,
        maxFeePerGas: null,
        maxPriorityFeePerGas: null,
        gas: 0,
        input: null,
        creates: null,
        raw: null,
        publicKey: null,
        chainId: null,
        standardV: 0,
        v: 0,
        r: 0,
        s: 0,
        accessList: null,
      },
    ],
    blockSize: "976",
  },
  {
    blockHash:
      "0xeebce70949346d3354162127bfebd8112587220b2db8290ec5d11b8605f8c1b4",
    parentHash:
      "0x6c34caf76c58f547089e3ed81022e5edaa3792c70d7ccddb6f38255421acc689",
    sha3Uncles:
      "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    author: "0x0000000000000000000000000000000000000000",
    miner: "0x0000000000000000000000000000000000000000",
    stateRoot:
      "0x553d515846f7fe69efe3458fd927f846e88871f256d00f7dc33e99b4d971928f",
    transactionsRoot:
      "0x6def9a60be1fe584046df477c18a4e725b74349cc5919fb4e8e6c5994d73152e",
    receiptsRoot:
      "0x87e6bb1944dfa9f49c8ab8625adc5936788ed3536f0d86d36b1cbead2cf5be20",
    number: "1",
    gasUsed: "526,669",
    gasLimit: "75,000,000",
    extraData: {
      reward: "0.000000345",
      symbol: "DMTCx",
    },
    logsBloom:
      "0x0000000400000000000000000000000001000000000000000080008000000000040000000000000000000002000000000000000000000000000000000000000000000000008000080000000800000000000180000000000800000008000000000000000002000000000000000000080000000000000000000000001000000040000000000000000000000000000000000000000000008000000000000000000000080000000000000000000000040000000002000000000000100080000000000000000200000000000000002084000000010000000000010000000000002000000000000000000000000000040c000000000000000000000000000000000000",
    timestamp: 180,
    difficulty: 0,
    totalDifficulty: 0,
    sealFields: [],
    uncles: [],
    transactions: [
      {
        transactionType: TransactionType.ContractCall,
        hash: "0xa4a8617cddbd0f9343e9427527601c3f3bffad852ds231f2fc2ef59599ff297",
        amount: "100.00000012345",
        from: "0xaab27b150451726ecsds38aa1d0a94505c8729bd1",
        to: "0xaab27b150451726sdsd738aa1d0a94505c8729bd1",
        status: TransactionStatus.Confirmed,
        symbol: "DMTCx",
        time: 221,
        nonce: 0,
        blockHash: null,
        blockNumber: null,
        transactionIndex: null,
        value: 0,
        gasPrice: null,
        maxFeePerGas: null,
        maxPriorityFeePerGas: null,
        gas: 0,
        input: null,
        creates: null,
        raw: null,
        publicKey: null,
        chainId: null,
        standardV: 0,
        v: 0,
        r: 0,
        s: 0,
        accessList: null,
      },
    ],
    blockSize: "976",
  },
];

export const pages = [
  {
    n: 1,
    active: true,
    cursors: [],
  },
  {
    n: 2,
    active: false,
    cursors: ["1"],
  },
  {
    n: 3,
    active: false,
    cursors: ["1", "2"],
  },
];
