import {
  SMART_CONTRACT_URL,
  filterParams,
  getBaseUrl,
  wrapResponse,
} from "@api/index";
import {
  SmartContractPageParamsProps,
  SmartContractWithPaginationProps,
} from "@api/types";
import { NetworkConnection } from "@contexts/Environment";

export default {
  getSmartContracts: async (
    network: NetworkConnection,
    smartContractId?: string,
    itemsCount?: string
  ): Promise<SmartContractWithPaginationProps> => {
    const baseUrl = getBaseUrl(network);
    const params = filterParams([
      { key: "smart_contract_id", value: smartContractId },
      { key: "items_count", value: itemsCount },
    ]);
    const res = await fetch(`${baseUrl}/${SMART_CONTRACT_URL}${params}`);
    return wrapResponse<SmartContractWithPaginationProps>(res);
  },
};

export interface SmartContractQueryParamsProps
  extends SmartContractPageParamsProps {
  type: "smartcontracts";
  page_number?: string;
}
