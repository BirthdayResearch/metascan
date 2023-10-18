import { Chain } from "viem";

// MainNet
export const metachain = {
  id: 1130,
  name: "MetaChain",
  network: "metachain",
  nativeCurrency: {
    decimals: 18,
    name: "MetaChain",
    symbol: "DFI",
  },
  rpcUrls: {
    // TODO: Replace RPC URLs
    public: { http: ["http://35.187.53.161:20551"] },
    default: { http: ["http://35.187.53.161:20551"] },
  },
  blockExplorers: {
    default: { name: "MetaScan", url: "https://meta.defiscan.live" },
  },
} as const satisfies Chain;

// TestNet
export const metachainTestNet = {
  id: 1131,
  name: "MetaChain TestNet",
  network: "metachainTestNet",
  nativeCurrency: {
    decimals: 18,
    name: "MetaChain Testnet",
    symbol: "DFI",
  },
  rpcUrls: {
    // TODO: Replace RPC URLs
    public: { http: ["http://34.38.30.102:18551"] },
    default: { http: ["http://34.38.30.102:18551"] },
  },
  blockExplorers: {
    default: {
      name: "MetaScan",
      url: "https://meta.defiscan.live?network=TestNet",
    },
  },
} as const satisfies Chain;

// Changi
export const metachainChangi = {
  id: 1133,
  name: "MetaChain Changi",
  network: "metachainChangi",
  nativeCurrency: {
    decimals: 18,
    name: "MetaChain Changi",
    symbol: "DFI",
  },
  rpcUrls: {
    // TODO: Replace RPC URLs
    public: { http: ["http://34.34.156.49:20551"] },
    default: { http: ["http://34.34.156.49:20551"] },
  },
  blockExplorers: {
    default: {
      name: "MetaScan",
      url: "https://meta.defiscan.live?network=Changi",
    },
  },
} as const satisfies Chain;
