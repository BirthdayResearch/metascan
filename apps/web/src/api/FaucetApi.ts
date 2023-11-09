import { NetworkConnection } from "@contexts/Environment";
import { getBaseUrl } from "@api/index";
import {  filterParams, wrapResponse } from "./index";

export interface RawTokenWithPaginationProps {
    items: any[];
}

export default {
    sendFundsToUser: async (
        network: NetworkConnection,
        contractAddressHash?: string,
    ): Promise<RawTokenWithPaginationProps> => {
        const baseUrl = getBaseUrl();

        const params = filterParams([
            { key: "network", value: network },
        ]);
        const res =  await fetch (`${baseUrl}faucet/${contractAddressHash}?network=${network}`);
        const json = await res.json()
        return wrapResponse<RawTokenWithPaginationProps>(res);
    },
};

export interface TokenNextPageParamsProps {
    contract_address_hash?: string;
    holder_count?: string;
    is_name_null?: string;
    items_count: string;
    market_cap?: string;
    name?: string;
}

export interface TokenQueryParamsProps extends TokenNextPageParamsProps {
    page_number?: string;
}
