import { useRouter } from "next/router";
import { Token } from "mockdata/TokenData";
import {
  CursorPage,
  CursorPagination,
} from "@components/commons/CursorPagination";
import AddressTokenTableTitle from "./AddressTokenTableTitle";
import TokenRow from "./TokenRow";

interface TokenDetailsProps {
  tokenList: Token[];
  tokenListPage: CursorPage[];
}

export function TokenDetails({ tokenList, tokenListPage }: TokenDetailsProps) {
  const router = useRouter();
  const id = router.query.aid;

  return (
    <div>
      <div className="flex flex-col md:flex-row mb-9 justify-between md:items-center">
        <h2
          data-testid="address-token-list-title"
          className="font-bold text-xl text-white-50"
        >
          Tokens
        </h2>
        <CursorPagination
          pages={tokenListPage}
          path={`/address/${id}`}
          className="justify-end mt-5 md:mt-0"
        />
      </div>
      <div className="hidden lg:block">
        <div className="grid grid-cols-9 mb-5">
          <div data-testid="wallet-tokens-asset-title">
            <AddressTokenTableTitle title="Asset" />
          </div>
          <div data-testid="wallet-tokens-type-title">
            <AddressTokenTableTitle title="Type" />
          </div>
          <div data-testid="wallet-tokens-symbol-title">
            <AddressTokenTableTitle title="Symbol" />
          </div>
          <div
            className="col-span-2 text-right pr-10"
            data-testid="wallet-tokens-amount-title"
          >
            <AddressTokenTableTitle title="Amount" />
          </div>
          <div
            className="text-right pr-5"
            data-testid="wallet-tokens-price-title"
          >
            <AddressTokenTableTitle title="Price" />
          </div>
          <div className="text-right" data-testid="wallet-tokens-value-title">
            <AddressTokenTableTitle title="Value" />
          </div>
          <div
            className="col-span-2 text-right"
            data-testid="wallet-tokens-contract-address-title"
          >
            <AddressTokenTableTitle title="Contract Address" />
          </div>
        </div>
        <div className="brand-gradient-1 h-[1px]" />
      </div>
      {tokenList.map((item) => (
        <TokenRow key={item.contractAddress} data={item} />
      ))}
      <CursorPagination
        pages={tokenListPage}
        path={`/address/${id}`}
        className="flex w-full md:justify-end mt-12 md:mt-10"
      />
    </div>
  );
}
