import {
  CursorPage,
  CursorPagination,
} from "@components/commons/CursorPagination";
import NumericFormat from "@components/commons/NumericFormat";
import TokenSearchDropDown from "@components/commons/TokenSearchDropDown";
import { Token } from "mockdata/TokenData";
import { useRouter } from "next/router";
import TokenRow from "pages/address/_components/TokenRow";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import DetailRowTitle from "pages/address/_components/shared/DetailRowTitle";
import { AddressContractTabsTitle } from "../../../enum/tabsTitle";

interface TokenDetailsProps {
  contractTokenList: Token[];
  contractTokenListPage: CursorPage[];
  networth: number;
  balance: {
    dollarValue: number;
    value: number;
  };
  otherTokens: {
    value: number;
    allTokens: ContractToken[];
  };
}

interface ContractToken {
  value: number;
  symbol: string;
}

export default function TokenDetails({
  contractTokenList,
  contractTokenListPage,
  networth,
  balance,
  otherTokens,
}: TokenDetailsProps) {
  const router = useRouter();
  const id = router.query.cid;
  const [isTokenIconClicked, setIsTokenIconClicked] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setIsTokenIconClicked);

  return (
    <div>
      <div className="flex flex-col lg:flex-row md:flex-row gap-y-6 lg:gap-x-[109px] md:gap-x-[76px] mb-[51.5px] md:mt-11 mt-[52px]">
        <div className="flex flex-col gap-y-2">
          <div
            data-testid="contract-networth-title"
            className="text-white-700 tracking-[0.005em] text-sm"
          >
            Net worth
          </div>
          <NumericFormat
            data-testid="contract-networth"
            className="text-white-50 text-2xl font-bold"
            value={networth}
            thousandSeparator
            decimalScale={2}
            prefix="$"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <div
            data-testid="contract-dmctx-balance-title"
            className="text-white-700 tracking-[0.005em] text-sm"
          >
            DMCTx Balance
          </div>
          <NumericFormat
            data-testid="contract-dmctx-balance-dollar-value"
            className="text-white-50 text-2xl font-bold"
            thousandSeparator
            value={balance.dollarValue}
            decimalScale={2}
            prefix="$"
          />
          <NumericFormat
            data-testid="contract-dmctx-balance-value"
            className="text-white-700 tracking-[0.05em]"
            thousandSeparator
            value={balance.value}
            decimalScale={8}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <div
            data-testid="contract-other-tokens-title"
            className="text-white-700 text-sm tracking-[0.005em]"
          >
            Other tokens
          </div>
          <NumericFormat
            data-testid="contract-other-tokens-dollar-value"
            className="text-white-50 text-2xl font-bold"
            thousandSeparator
            value={otherTokens.value.toString()}
            decimalScale={2}
            prefix="$"
          />
          <div ref={wrapperRef} className="relative">
            <div
              role="button"
              tabIndex={0}
              onKeyDown={() =>
                onTokenDropDownIconClick(
                  setIsTokenIconClicked,
                  isTokenIconClicked
                )
              }
              onClick={() =>
                onTokenDropDownIconClick(
                  setIsTokenIconClicked,
                  isTokenIconClicked
                )
              }
              className="flex flex-row items-center gap-x-[10.29px]"
            >
              <div
                data-testid="contract-other-tokens"
                className="text-white-700 tracking-[0.005em]"
              >
                {otherTokens.allTokens.length} Tokens
              </div>
              {isTokenIconClicked ? (
                <FiChevronDown
                  data-testid="contract-other-tokens-dropdown-icon"
                  size={24}
                  className="text-white-700"
                />
              ) : (
                <FiChevronUp
                  data-testid="contract-other-tokens-up-icon"
                  size={24}
                  className="text-white-700"
                />
              )}
            </div>
            {isTokenIconClicked && (
              <TokenSearchDropDown
                data-testid="contract-other-tokens-dropdown"
                addressTokens={otherTokens.allTokens}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row mb-9 justify-between md:items-center">
        <h2
          data-testid="contract-address-token-list-title"
          className="font-bold text-xl text-white-50"
        >
          {AddressContractTabsTitle.Tokens}
        </h2>
        <CursorPagination
          pages={contractTokenListPage}
          path={`/contract/${id}`}
          className="justify-end mt-5 md:mt-0"
        />
      </div>
      <div className="hidden lg:block">
        <div className="grid grid-cols-9 mb-5">
          <div data-testid="contract-tokens-asset-title">
            <DetailRowTitle title="Asset" />
          </div>
          <div data-testid="contract-tokens-type-title">
            <DetailRowTitle title="Type" />
          </div>
          <div data-testid="contract-tokens-symbol-title">
            <DetailRowTitle title="Symbol" />
          </div>
          <div
            className="col-span-2 text-right pr-10"
            data-testid="contract-tokens-amount-title"
          >
            <DetailRowTitle title="Amount" />
          </div>
          <div
            className="text-right pr-5"
            data-testid="contract-tokens-price-title"
          >
            <DetailRowTitle title="Price" />
          </div>
          <div className="text-right" data-testid="contract-tokens-value-title">
            <DetailRowTitle title="Value" />
          </div>
          <div
            className="col-span-2 text-right"
            data-testid="contract-tokens-contract-address-title"
          >
            <DetailRowTitle title="Contract Address" />
          </div>
        </div>
        <div className="brand-gradient-1 h-[1px]" />
      </div>
      {contractTokenList.map((item) => (
        <TokenRow key={item.contractAddress} data={item} />
      ))}
      <CursorPagination
        pages={contractTokenListPage}
        path={`/contract/${id}`}
        className="flex w-full md:justify-end mt-12 md:mt-10"
      />
    </div>
  );
}

function useOutsideAlerter(
  ref: MutableRefObject<HTMLDivElement | null>,
  setIsTokenClicked: Dispatch<SetStateAction<boolean>>
) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsTokenClicked(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const onTokenDropDownIconClick = (
  setIsTokenIconClicked: Dispatch<SetStateAction<boolean>>,
  isTokenIconClicked: boolean
) => {
  if (isTokenIconClicked) {
    setIsTokenIconClicked(false);
  } else {
    setIsTokenIconClicked(true);
  }
};
