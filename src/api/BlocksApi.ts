import { NetworkConnection } from "@contexts/Environment";
import {
  filterParams,
  getBaseUrl,
  MAIN_BLOCKS_URL,
  wrapResponse,
} from "./index";
import { BlockProps } from "./types";

export default {
  getBlocks: async (
    network: NetworkConnection,
    blockNumber?: string,
    itemsCount?: string
  ): Promise<any> => {
    const baseUrl = getBaseUrl(network);
    const params = filterParams([
      { key: "block_number", value: blockNumber },
      { key: "items_count", value: itemsCount },
      { key: "type", value: "block" },
    ]);
    const res = await fetch(`${baseUrl}/${MAIN_BLOCKS_URL}${params}`);

    return wrapResponse<BlockProps[]>(res);
  },
  getBlock: async (
    network: NetworkConnection,
    blockId: string
  ): Promise<any> => {
    const baseUrl = getBaseUrl(network);
    const res = await fetch(`${baseUrl}/${MAIN_BLOCKS_URL}/${blockId}`);

    return wrapResponse<BlockProps>(res);
  },
};
export interface BlockNextPageParamsProps {
  block_number: string;
  items_count: string;
}

export interface BlockQueryParamsProps extends BlockNextPageParamsProps {
  type: "block";
  page_number?: string;
}
