import { NetworkConnection } from "@contexts/Environment";
import { getBaseUrl, MAIN_BLOCKS_URL } from "./index";

function filterParams(params: { key: string; value }[]): string {
  let queryParams = "?";
  params.forEach((p) => {
    if (p.value !== undefined && p.value.trim() !== "") {
      queryParams += `${p.key}=${p.value}&`;
    }
  });

  return queryParams;
}

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

    const resTxn = await fetch(`${baseUrl}/${MAIN_BLOCKS_URL}${params}`);
    const responseBlockData = await resTxn.json();

    return responseBlockData;
  },
  getBlock: async (
    network: NetworkConnection,
    blockId: string
  ): Promise<any> => {
    const baseUrl = getBaseUrl(network);
    const resTxn = await fetch(`${baseUrl}/${MAIN_BLOCKS_URL}/${blockId}`);
    const responseBlockData = await resTxn.json();

    return responseBlockData;
  },
};
