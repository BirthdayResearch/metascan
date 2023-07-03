import { Chain } from "viem";

export const metachainTestnet = {
  id: 1133,
  name: "MetaChain Testnet",
  network: "metachainTestnet",
  nativeCurrency: {
    decimals: 18,
    name: "MetaChain Testnet",
    symbol: "DFI",
  },
  rpcUrls: {
    // TODO: Replace RPC URLs
    public: { http: ["https://changi.dfi.team"] },
    default: { http: ["https://changi.dfi.team"] },
  },
  blockExplorers: {
    default: { name: "MetaScan", url: "https://meta.defiscan.live" },
  },
} as const satisfies Chain;

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
    public: { http: ["https://changi.dfi.team"] },
    default: { http: ["https://changi.dfi.team"] },
  },
  blockExplorers: {
    default: { name: "MetaScan", url: "https://meta.defiscan.live" },
  },
} as const satisfies Chain;
