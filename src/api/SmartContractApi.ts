import {
  SMART_CONTRACT_URL,
  SOLIDITY_VERSIONS_URL,
  VYPER_VERSIONS_URL,
  filterParams,
  getBaseUrl,
  wrapResponse,
} from "@api/index";
import {
  SmartContractPageParamsProps,
  SmartContractWithPaginationProps,
  SCVersionsResponseProps,
  CompilerType,
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
  getSolidityVersions: async (): Promise<SCVersionsResponseProps> => {
    const res = await fetch(SOLIDITY_VERSIONS_URL);
    return wrapResponse<SCVersionsResponseProps>(res);
  },
  getVyperVersions: async (): Promise<SCVersionsResponseProps> => {
    const res = await fetch(VYPER_VERSIONS_URL);
    return wrapResponse<SCVersionsResponseProps>(res);
  },
  verifySmartContract: async (
    network: NetworkConnection,
    data,
    type: CompilerType
  ): Promise<any> => {
    const baseUrl = getBaseUrl(network);
    const action =
      type === CompilerType.Vyper ? "verify_vyper_contract" : "verify";
    const res = await fetch(`${baseUrl}/api?module=contract&action=${action}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return wrapResponse(res);
  },
  verifySmartContractUsingJSONInput: async (
    network: NetworkConnection,
    data
  ): Promise<any> => {
    const baseUrl = getBaseUrl(network);
    const res = await fetch(
      `${baseUrl}/api?module=contract&action=verifysourcecode`,
      {
        method: "POST",
        body: data,
      }
    );
    return wrapResponse(res);
  },
  checkVerifyStatus: async (network: NetworkConnection, guid): Promise<any> => {
    const baseUrl = getBaseUrl(network);
    const res = await fetch(
      `${baseUrl}/api?module=contract&action=checkverifystatus&guid=${guid}`,
      {
        method: "GET",
      }
    );
    return wrapResponse(res);
  },
};

export interface SmartContractQueryParamsProps
  extends SmartContractPageParamsProps {
  type: "smartcontracts";
  page_number?: string;
}
