import { NetworkConnection } from "@contexts/Environment";
import {
  filterParams,
  getBaseUrl,
  MAIN_BLOCKS_URL,
  wrapResponse,
} from "./index";
import { BlockProps, RawTxnWithPaginationProps } from "./types";

export default {
  getBlocks: async (
    network: NetworkConnection,
    blockNumber?: string,
    itemsCount?: string
  ): Promise<BlockWithPaginationProps> => {
    const baseUrl = getBaseUrl(network);
    const params = filterParams([
      { key: "block_number", value: blockNumber },
      { key: "items_count", value: itemsCount },
      { key: "type", value: "block" },
    ]);
    const res = await fetch(`${baseUrl}/${MAIN_BLOCKS_URL}${params}`);

    return wrapResponse<BlockWithPaginationProps>(res);
  },
  getBlock: async (
    network: NetworkConnection,
    blockId: string
  ): Promise<BlockProps> => {
    const baseUrl = getBaseUrl(network);
    const res = await fetch(`${baseUrl}/${MAIN_BLOCKS_URL}/${blockId}`);
    const block = (await await res.json()) as BlockProps;
    if (!res.ok && !block.hash) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }
    return block;
  },
  getBlockTransactions: async (
    network: NetworkConnection,
    blockId: string,
    blockNumber?: string,
    itemsCount?: string,
    index?: string
  ): Promise<RawTxnWithPaginationProps> => {
    const baseUrl = getBaseUrl(network);
    const params = filterParams([
      { key: "block_number", value: blockNumber },
      { key: "items_count", value: itemsCount },
      { key: "index", value: index },
    ]);
    const res = await fetch(
      `${baseUrl}/${MAIN_BLOCKS_URL}/${blockId}/transactions${params}`
    );
    return wrapResponse<RawTxnWithPaginationProps>(res);
  },
};

interface BlockWithPaginationProps {
  items: BlockProps[];
  next_page_params?: {
    block_number?: string;
    items_count?: string;
    index?: string;
  };
}

export interface BlockNextPageParamsProps {
  block_number: string;
  items_count: string;
}

export interface BlockQueryParamsProps extends BlockNextPageParamsProps {
  type: "block";
  page_number?: string;
}
