import {
  SMART_CONTRACT_URL,
  filterParams,
  getBaseUrl,
  wrapResponse,
} from "@api/index";
import {
  SmartContractPageParamsProps,
  SmartContractWithPaginationProps,
  ContractLanguage,
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
  verifySmartContract: async (
    network: NetworkConnection,
    data,
    type: ContractLanguage
  ): Promise<any> => {
    const baseUrl = getBaseUrl(network);
    const action =
      type === ContractLanguage.Solidity ? "verify" : "verify_vyper_contract";
    const res = await fetch(`${baseUrl}/api?module=contract&action=${action}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return wrapResponse(res);
  },
};

export interface SmartContractQueryParamsProps
  extends SmartContractPageParamsProps {
  type: "smartcontracts";
  page_number?: string;
}
