import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  CursorPage,
  CursorPagination,
} from "@components/commons/CursorPagination";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import LinkText from "@components/commons/LinkText";
import NumericFormat from "@components/commons/NumericFormat";
import { GreenTickIcon } from "@components/icons/GreenTickIcon";
import { useUnitSuffix } from "hooks/useUnitSuffix";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import { pages, TransactionI, transactions } from "mockdata/TransactionData";
import { useRouter } from "next/router";
import TransactionRow from "pages/txs/_components/TransactionRow";
import { FiCopy, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { MdOutlineQrCode } from "react-icons/md";
import { truncateTextFromMiddle } from "shared/textHelper";
import { tokens, tokenPages, Token } from "mockdata/TokenData";
import { walletAddressData } from "mockdata/WalletAddressData";
import TokenSearchDropDown from "@components/commons/TokenSearchDropDown";
import { sleep } from "shared/sleep";
import AddressTokenTableTitle from "./_components/AddressTokenTableTitle";
import TokenRow from "./_components/TokenRow";
import QrCode from "../../components/commons/QrCode";

function Address() {
  const [isQrCodeClicked, setIsQrCodeClicked] = useState(false);
  const router = useRouter();
  const aid = router.query.aid?.toString()!;
  return (
    <div className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer className="relative z-[1]">
        <div className="lg:p-10 md:p-10 px-5 py-6">
          <div
            className="flex flex-row pb-[9px]"
            data-testid="address-details-title"
          >
            <span className="font-bold text-xl text-white-50">
              {fixedTitle.walletAddress}
            </span>
          </div>
          <WalletSegmentOne setIsQrCodeClicked={setIsQrCodeClicked} />
        </div>
      </GradientCardContainer>
      <div className="mt-6" />
      <GradientCardContainer className="relative">
        <div className="md:p-10 p-5">
          <WalletSegmentTwo />
        </div>
      </GradientCardContainer>
      {isQrCodeClicked && (
        <QrCode
          data-testid="qr-code"
          address={aid}
          href={`/address/${aid}`}
          onCloseClick={setIsQrCodeClicked}
        />
      )}
    </div>
  );
}

interface QrClickProps {
  setIsQrCodeClicked: Dispatch<SetStateAction<boolean>>;
}

function WalletSegmentOne({ setIsQrCodeClicked }: QrClickProps) {
  return (
    <div className="flex flex-col gap-y-[33px]">
      <WalletAddressDetails setIsQrCodeClicked={setIsQrCodeClicked} />
      <WalletDetails />
    </div>
  );
}

function WalletAddressDetails({ setIsQrCodeClicked }: QrClickProps) {
  const [isWalletAddressCopied, setIsWalletAddressCopied] = useState(false);
  const router = useRouter();
  const aid = router.query.aid?.toString()!;
  return (
    <div>
      {isWalletAddressCopied ? (
        <div className="flex flex-row gap-x-2.5 items-center">
          <LinkText
            testId="wallet-address-copied"
            label={fixedTitle.copied}
            href={`/address/${aid}`}
            customStyle="tracking-[0.01em]"
          />
          <GreenTickIcon data-testid="wallet-address-copied-green-tick-icon" />
          <MdOutlineQrCode
            role="button"
            onClick={() => onQrCodeClick(setIsQrCodeClicked)}
            className="text-white-50"
          />
        </div>
      ) : (
        <div className="flex flex-row gap-x-2.5 items-center">
          <LinkText
            testId="wallet-address"
            label={truncateTextFromMiddle(aid, 11)}
            href={`/address/${aid}`}
            customStyle="tracking-[0.01em]"
          />
          <FiCopy
            role="button"
            data-testid="wallet-address-copy-icon"
            onClick={() =>
              onCopyAddressIconClick(setIsWalletAddressCopied, aid)
            }
            className="text-white-50"
          />
          <MdOutlineQrCode
            data-testid="wallet-address-qr-icon"
            role="button"
            onClick={() => onQrCodeClick(setIsQrCodeClicked)}
            className="text-white-50"
          />
        </div>
      )}
    </div>
  );
}

function WalletDetails() {
  const [isTokenDropDownIconClicked, setIsTokenDropDownIconClicked] =
    useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setIsTokenDropDownIconClicked);

  return (
    <div className="flex lg:flex-row md:flex-col flex-col gap-y-4 lg:gap-x-5">
      <div className="flex flex-col lg:flex-row md:flex-row gap-y-4 lg:gap-x-5">
        <div className="flex flex-col gap-y-1 lg:w-[265px] md:w-[294px]">
          <div
            data-testid="wallet-balance-title"
            className="text-white-700 tracking-[0.01em]"
          >
            {fixedTitle.balance}
          </div>
          <NumericFormat
            className="text-white-50 tracking-[0.01em]"
            thousandSeparator
            value={walletAddressData.balance.value.toString()}
            decimalScale={8}
            suffix={` ${walletAddressData.balance.symbol}`}
            data-testid="wallet-balance-value"
          />
        </div>
        <div className="flex flex-col gap-y-1 lg:w-[265px] md:w-[294px]">
          <div
            data-testid="wallet-tokens-title"
            className="text-white-700 tracking-[0.01em]"
          >
            {fixedTitle.tokens}
          </div>
          <div ref={wrapperRef} className="relative">
            <div
              role="button"
              tabIndex={0}
              onKeyDown={() =>
                onTokenDropDownIconClick(
                  setIsTokenDropDownIconClicked,
                  isTokenDropDownIconClicked
                )
              }
              onClick={() =>
                onTokenDropDownIconClick(
                  setIsTokenDropDownIconClicked,
                  isTokenDropDownIconClicked
                )
              }
              className="flex flex-row items-center"
            >
              <div className="text-white-50 tracking-[0.01em] mr-[10px]">
                {walletAddressData.tokens.allTokens.length} {fixedTitle.tokens}
              </div>
              <div>
                {isTokenDropDownIconClicked ? (
                  <FiChevronDown
                    data-testid="wallet-tokens-dropdown-icon"
                    size={24}
                    className="text-white-700"
                  />
                ) : (
                  <FiChevronUp
                    data-testid="wallet-tokens-up-icon"
                    size={24}
                    className="text-white-700"
                  />
                )}
              </div>
              <div>
                <NumericFormat
                  className="text-white-700 ml-[14px] tracking-[0.01em]"
                  value={walletAddressData.tokens.value.toString()}
                  thousandSeparator
                  decimalScale={2}
                  suffix=")"
                  prefix="($"
                  data-testid="wallet-tokens-value"
                />
              </div>
            </div>
            {isTokenDropDownIconClicked && (
              <TokenSearchDropDown
                data-testid="wallet-token-search-dropdown"
                addressTokens={walletAddressData.tokens.allTokens}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-1 lg:w-[265px] md:w-[294px]">
        <div
          data-testid="wallet-transactions-title"
          className="text-white-700 tracking-[0.01em]"
        >
          {fixedTitle.transactions}
        </div>
        <div
          data-testid="wallet-transactions-value"
          className="text-white-50 tracking-[0.01em]"
        >
          {useUnitSuffix(walletAddressData.transaction.toString())}
        </div>
      </div>
    </div>
  );
}

function WalletSegmentTwo() {
  const [isTransactionClicked, setIsTransactionClicked] = useState(true);

  return (
    <div className="flex flex-col md:pt-[3.67px] pt-[23.67px]">
      {isTransactionClicked ? (
        <div className="flex flex-row gap-x-6">
          <div className="flex flex-col">
            <button
              type="button"
              className="text-white-50 font-medium"
              data-testid="wallet-transactions-options-clicked-title"
              onClick={() =>
                onOptionsClick(setIsTransactionClicked, fixedTitle.transactions)
              }
            >
              {fixedTitle.transactions}
            </button>
            <div className="brand-gradient-1 h-1 mt-[19.33px]" />
          </div>
          <div className="flex flex-col">
            <button
              type="button"
              className="text-white-700 font-medium"
              data-testid="wallet-tokens-options-title"
              onClick={() =>
                onOptionsClick(setIsTransactionClicked, fixedTitle.tokens)
              }
            >
              {fixedTitle.tokens}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-x-6">
          <div className="flex flex-col">
            <button
              type="button"
              className="text-white-700 font-medium"
              data-testid="wallet-transactions-options-title"
              onClick={() =>
                onOptionsClick(setIsTransactionClicked, fixedTitle.transactions)
              }
            >
              {fixedTitle.transactions}
            </button>
          </div>
          <div className="flex flex-col">
            <button
              type="button"
              className="text-white-50 font-medium"
              data-testid="wallet-token-options-clicked-title"
              onClick={() =>
                onOptionsClick(setIsTransactionClicked, fixedTitle.tokens)
              }
            >
              {fixedTitle.tokens}
            </button>
            <div className="brand-gradient-1 h-1 mt-[19.33px]" />
          </div>
        </div>
      )}
      {isTransactionClicked ? (
        <div className="lg:mt-5 lg:mb-[22.5px] md:mt-5 md:mb-5 mt-5 mb-7" />
      ) : (
        <BalanceDetails />
      )}
      {isTransactionClicked ? (
        <TransactionDetails
          addressTransactions={transactions}
          transactionPages={pages}
        />
      ) : (
        <div>
          <TokenDetails tokenList={tokens} tokenListPage={tokenPages} />
        </div>
      )}
    </div>
  );
}

function BalanceDetails() {
  const [isTokenIconClicked, setIsTokenIconClicked] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setIsTokenIconClicked);

  return (
    <div className="flex flex-col lg:flex-row md:flex-row gap-y-6 lg:gap-x-[109px] md:gap-x-[76px] mt-11 mb-[53px]">
      <div className="flex flex-col gap-y-2">
        <div
          data-testid="wallet-networth-title"
          className="text-white-700 tracking-[0.005em] text-sm"
        >
          {fixedTitle.networth}
        </div>
        <NumericFormat
          data-testid="wallet-networth"
          className="text-white-50 text-2xl font-bold"
          value={walletAddressData.networth.toString()}
          thousandSeparator
          decimalScale={2}
          prefix="$"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <div
          data-testid="wallet-dmctx-balance-title"
          className="text-white-700 tracking-[0.005em] text-sm"
        >
          {fixedTitle.dmctxBalance}
        </div>
        <NumericFormat
          data-testid="wallet-dmctx-balance-dollar-value"
          className="text-white-50 text-2xl font-bold"
          thousandSeparator
          value={walletAddressData.dmctxBalance.dollarValue.toString()}
          decimalScale={2}
          prefix="$"
        />
        <NumericFormat
          data-testid="wallet-dmctx-balance-value"
          className="text-white-700 tracking-[0.05em]"
          thousandSeparator
          value={walletAddressData.dmctxBalance.value.toString()}
          decimalScale={8}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <div
          data-testid="wallet-other-tokens-title"
          className="text-white-700 text-sm tracking-[0.005em]"
        >
          {fixedTitle.otherTokens}
        </div>
        <NumericFormat
          data-testid="wallet-other-tokens-dollar-value"
          className="text-white-50 text-2xl font-bold"
          thousandSeparator
          value={walletAddressData.otherTokens.value.toString()}
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
              data-testid="wallet-other-tokens"
              className="text-white-700 tracking-[0.005em]"
            >
              {walletAddressData.otherTokens.allTokens.length} Tokens
            </div>
            {isTokenIconClicked ? (
              <FiChevronDown
                data-testid="wallet-other-tokens-dropdown-icon"
                size={24}
                className="text-white-700"
              />
            ) : (
              <FiChevronUp
                data-testid="wallet-other-tokens-up-icon"
                size={24}
                className="text-white-700"
              />
            )}
          </div>
          {isTokenIconClicked && (
            <TokenSearchDropDown
              data-testid="wallet-other-tokens-dropdown"
              addressTokens={walletAddressData.otherTokens.allTokens}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface TransactionDetailsProps {
  addressTransactions: TransactionI[];
  transactionPages: CursorPage[];
}

function TransactionDetails({
  addressTransactions,
  transactionPages,
}: TransactionDetailsProps) {
  const router = useRouter();
  const id = router.query.aid;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
        <h2
          data-testid="address-txn-list-title"
          className="font-bold text-xl text-white-50"
        >
          {fixedTitle.transactions}
        </h2>
        <CursorPagination
          pages={transactionPages}
          path={`/address/${id}`}
          className="justify-end mt-5 md:mt-0"
        />
      </div>
      {addressTransactions.map((item) => (
        <TransactionRow key={item.hash} data={item} />
      ))}
      <CursorPagination
        pages={transactionPages}
        path={`/address/${id}`}
        className="flex w-full md:justify-end mt-12 md:mt-10"
      />
    </div>
  );
}

interface TokenDetailsProps {
  tokenList: Token[];
  tokenListPage: CursorPage[];
}

function TokenDetails({ tokenList, tokenListPage }: TokenDetailsProps) {
  const router = useRouter();
  const id = router.query.aid;

  return (
    <div>
      <div className="flex flex-col md:flex-row mb-9 justify-between md:items-center">
        <h2
          data-testid="address-token-list-title"
          className="font-bold text-xl text-white-50"
        >
          {fixedTitle.tokens}
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
            <AddressTokenTableTitle title={fixedTitle.asset} />
          </div>
          <div data-testid="wallet-tokens-type-title">
            <AddressTokenTableTitle title={fixedTitle.type} />
          </div>
          <div data-testid="wallet-tokens-symbol-title">
            <AddressTokenTableTitle title={fixedTitle.symbol} />
          </div>
          <div
            className="col-span-2 text-right pr-10"
            data-testid="wallet-tokens-amount-title"
          >
            <AddressTokenTableTitle title={fixedTitle.amount} />
          </div>
          <div
            className="text-right pr-5"
            data-testid="wallet-tokens-price-title"
          >
            <AddressTokenTableTitle title={fixedTitle.price} />
          </div>
          <div className="text-right" data-testid="wallet-tokens-value-title">
            <AddressTokenTableTitle title={fixedTitle.value} />
          </div>
          <div
            className="col-span-2 text-right"
            data-testid="wallet-tokens-contract-address-title"
          >
            <AddressTokenTableTitle title={fixedTitle.contractAddress} />
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

const onOptionsClick = (
  setIsTransactionClicked: Dispatch<SetStateAction<boolean>>,
  itemClicked: string
) => {
  if (itemClicked === fixedTitle.tokens) {
    setIsTransactionClicked(false);
  } else {
    setIsTransactionClicked(true);
  }
};

const fixedTitle = {
  walletAddress: "Wallet address",
  balance: "Balance",
  tokens: "Tokens",
  transactions: "Transactions",
  networth: "Net worth",
  dmctxBalance: "DMCTx Balance",
  otherTokens: "Other tokens",
  copied: "Copied!",
  asset: "Asset",
  type: "Type",
  symbol: "Symbol",
  amount: "Amount",
  price: "Price",
  value: "Value",
  contractAddress: "Contract Address",
};

const onCopyAddressIconClick = async (
  onTextClick: Dispatch<SetStateAction<boolean>>,
  address: string
) => {
  onTextClick(true);
  navigator.clipboard.writeText(address);
  await sleep(2000);
  onTextClick(false);
};

const onQrCodeClick = (
  setIsQrCodeClicked: Dispatch<SetStateAction<boolean>>
) => {
  setIsQrCodeClicked(true);
};

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

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Address;
