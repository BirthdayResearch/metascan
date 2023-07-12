import { CursorPagination } from "@components/commons/CursorPagination";
import { useRouter } from "next/router";
import TokenRow, {
  TokenTableFixedTitle,
} from "pages/address/_components/TokenRow";
import { useEffect, useState } from "react";
import WalletAddressApi from "@api/WalletAddressApi";
import { NetworkConnection } from "@contexts/Environment";
import { useNetwork } from "@contexts/NetworkContext";
import { TokenItemI } from "@api/types";
import VerifiedContractSubtitle from "./VerifiedContractSubtitle";
import { ContractTabsTitle } from "../../../enum/contractTabsTitle";

interface TokenDetailsProps {
  address: string;
}

export default function ContractTokensList({ address }: TokenDetailsProps) {
  const router = useRouter();
  const { connection } = useNetwork();

  const id = router.query.cid;
  const [tokens, setTokens] = useState<TokenItemI[]>([]);
  // const [nextPage, setNextPage] = useState({})

  const getTokens = async () => {
    const tokenList = await WalletAddressApi.getTokens(
      connection as NetworkConnection,
      address
    );
    setTokens(tokenList.items);
    // setNextPage(tokenList.next_page_params)
  };

  useEffect(() => {
    getTokens();
  }, []);

  return (
    <div>
      <div className="flex flex-col md:flex-row mb-9 justify-between md:items-center">
        <h2
          data-testid="contract-address-token-list-title"
          className="font-bold text-xl text-white-50"
        >
          {ContractTabsTitle.Tokens}
        </h2>
        {/* <CursorPagination
          pages={contractTokenListPage}
          path={`/contract/${id}`}
          className="justify-end mt-5 md:mt-0"
        /> */}
      </div>
      <div className="hidden lg:block">
        <div className="grid grid-cols-7 mb-5">
          <div data-testid="contract-tokens-asset-title">
            <VerifiedContractSubtitle title={TokenTableFixedTitle.asset} />
          </div>
          <div data-testid="contract-tokens-type-title">
            <VerifiedContractSubtitle title={TokenTableFixedTitle.type} />
          </div>
          <div data-testid="contract-tokens-symbol-title">
            <VerifiedContractSubtitle title={TokenTableFixedTitle.symbol} />
          </div>
          <div
            className="col-span-2 text-right pr-10"
            data-testid="contract-tokens-amount-title items-end"
          >
            <VerifiedContractSubtitle title={TokenTableFixedTitle.quantity} />
          </div>
          <div
            className="col-span-2 text-right"
            data-testid="contract-tokens-contract-address-title"
          >
            <VerifiedContractSubtitle title="Contract Address" />
          </div>
        </div>
        <div className="brand-gradient-1 h-[1px]" />
      </div>
      {tokens.map((item) => (
        <TokenRow key={item.token.address} data={item} />
      ))}
      <CursorPagination
        pages={contractTokenListPage}
        path={`/contract/${id}`}
        className="flex w-full md:justify-end mt-12 md:mt-10"
      />
    </div>
  );
}
