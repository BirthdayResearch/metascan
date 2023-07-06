import { NetworkConnection } from "@contexts/Environment";
import { TOKENS_URL, filterParams, getBaseUrl, wrapResponse } from ".";
import { AddressProps } from "./types";

export default {
  getToken: async (
    network: NetworkConnection,
    tokenId: string
  ): Promise<any> => {
    const baseUrl = getBaseUrl(network);
    const res = await fetch(`${baseUrl}/${TOKENS_URL}/${tokenId}`);
    return wrapResponse<TokenProps>(res);
  },
  getTokenTransfers: async (
    network: NetworkConnection,
    tokenId: string,
    blockNumber?: string,
    index?: string
  ): Promise<TokenTransferWithPaginationProps> => {
    const baseUrl = getBaseUrl(network);
    const params = filterParams([
      { key: "block_number", value: blockNumber },
      { key: "index", value: index },
    ]);
    const res = await fetch(
      `${baseUrl}/${TOKENS_URL}/${tokenId}/transfers${params}`
    );
    return wrapResponse<TokenTransferWithPaginationProps>(res);
  },
  getTokenHolders: async (
    network: NetworkConnection,
    tokenId: string,
    itemsCount?: string,
    value?: string
  ): Promise<TokenHolderWithPaginationProps> => {
    const baseUrl = getBaseUrl(network);
    const params = filterParams([
      { key: "items_count", value: itemsCount },
      { key: "value", value },
    ]);
    const res = await fetch(
      `${baseUrl}/${TOKENS_URL}/${tokenId}/holders${params}`
    );
    return wrapResponse<TokenHolderWithPaginationProps>(res);
  },
};

export interface TokenProps {
  address: string;
  circulating_market_cap: string | null;
  decimals: string;
  exchange_rate: string | null;
  holders: string;
  icon_url: string | null;
  name: string;
  symbol: string;
  total_supply: string;
  type: string;
}

export interface TokenTransferProps {
  tx_hash: string;
  block_hash: string;
  type: string;
  from: AddressProps;
  to: AddressProps;
  token: TokenProps;
  total: {
    decimals: string;
    value: string;
  };
  log_index: string;
  method: string;
  timestamp: string;
}
export interface TokenTransferPageParamsProps {
  block_number: string;
  index: string;
}
export interface TokenTransferWithPaginationProps {
  items: TokenTransferProps[];
  next_page_params: TokenTransferPageParamsProps;
}

export interface TokenHolderProps {
  address: AddressProps;
  token: TokenProps;
  token_id: string | null;
  value: string;
}
export interface TokenHolderPageParamsProps {
  items_count: string;
  value: string;
}
export interface TokenHolderWithPaginationProps {
  items: TokenHolderProps[];
  next_page_params: TokenHolderPageParamsProps;
}
