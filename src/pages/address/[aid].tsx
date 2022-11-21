import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { FiCopy, FiChevronUp, FiChevronDown, FiSearch } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineQrCode } from "react-icons/md";
import { truncateTextFromMiddle } from "shared/textHelper";
import { tokens, tokenPages, Token } from "mockdata/TokenData";
import { walletAddressData } from "mockdata/WalletAddressData";
import QRCode from "react-qr-code";
import clsx from "clsx";
import DropDownTokenRow from "./components/DropDownTokenRow";
import AddressTokenTableTitle from "./components/AddressTokenTableTitle";
import TokenRow from "./components/TokenRow";

function Address() {
  const [isQrCodeClicked, setIsQrCodeClicked] = useState(false);
  return (
    <div>
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer className="relative z-10">
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
          address={walletAddressData.walletAddress}
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
  return (
    <div>
      {isWalletAddressCopied ? (
        <div className="flex flex-row gap-x-2.5 items-center">
          <LinkText
            testId="wallet-address-copied"
            label={fixedTitle.copied}
            href={`/address/${walletAddressData.walletAddress}`}
            customStyle="tracking-[0.01em]"
          />
          <GreenTickIcon data-testid="wallet-address-copied-green-tick-icon" />
          <MdOutlineQrCode className="text-white-50" />
        </div>
      ) : (
        <div className="flex flex-row gap-x-2.5 items-center">
          <LinkText
            testId="wallet-address"
            label={truncateTextFromMiddle(walletAddressData.walletAddress, 11)}
            href={`/address/${walletAddressData.walletAddress}`}
            customStyle="tracking-[0.01em]"
          />
          <FiCopy
            role="button"
            data-testid="wallet-address-copy-icon"
            onClick={() =>
              onCopyAddressIconClick(
                setIsWalletAddressCopied,
                walletAddressData.walletAddress
              )
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
  const [isTokenIconClicked, setIsTokenIconClicked] = useState(false);
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
          <div className="group relative">
            <div
              role="button"
              tabIndex={0}
              onKeyDown={() =>
                onTokenIconClick(setIsTokenIconClicked, isTokenIconClicked)
              }
              onClick={() =>
                onTokenIconClick(setIsTokenIconClicked, isTokenIconClicked)
              }
              className="flex flex-row items-center"
            >
              <div className="text-white-50 tracking-[0.01em] mr-[10px]">
                {walletAddressData.tokens.allTokens.length} {fixedTitle.tokens}
              </div>
              <div>
                {isTokenIconClicked ? (
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
            {isTokenIconClicked && (
              <TokenDropDown
                data-testid="wallet-token-search-dropdown"
                setIsTokenIconClick={setIsTokenIconClicked}
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
            <div
              className="text-white-50 font-medium"
              data-testid="wallet-transactions-options-clicked-title"
              role="button"
              tabIndex={0}
              onKeyDown={() =>
                onOptionsClick(setIsTransactionClicked, fixedTitle.transactions)
              }
              onClick={() =>
                onOptionsClick(setIsTransactionClicked, fixedTitle.transactions)
              }
            >
              {fixedTitle.transactions}
            </div>
            <div className="brand-gradient-1 h-1 mt-[19.33px]" />
          </div>
          <div className="flex flex-col">
            <div
              className="text-white-700 font-medium"
              data-testid="wallet-tokens-options-title"
              role="button"
              tabIndex={0}
              onKeyDown={() =>
                onOptionsClick(setIsTransactionClicked, fixedTitle.tokens)
              }
              onClick={() =>
                onOptionsClick(setIsTransactionClicked, fixedTitle.tokens)
              }
            >
              {fixedTitle.tokens}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-x-6">
          <div className="flex flex-col">
            <div
              className="text-white-700 font-medium"
              data-testid="wallet-transactions-options-title"
              role="button"
              tabIndex={0}
              onKeyDown={() =>
                onOptionsClick(setIsTransactionClicked, fixedTitle.transactions)
              }
              onClick={() =>
                onOptionsClick(setIsTransactionClicked, fixedTitle.transactions)
              }
            >
              {fixedTitle.transactions}
            </div>
          </div>
          <div className="flex flex-col">
            <div
              className="text-white-50 font-medium"
              data-testid="wallet-token-options-clicked-title"
              role="button"
              tabIndex={0}
              onKeyDown={() =>
                onOptionsClick(setIsTransactionClicked, fixedTitle.tokens)
              }
              onClick={() =>
                onOptionsClick(setIsTransactionClicked, fixedTitle.tokens)
              }
            >
              {fixedTitle.tokens}
            </div>
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
        <div className="group relative">
          <div
            role="button"
            tabIndex={0}
            onKeyDown={() =>
              onTokenIconClick(setIsTokenIconClicked, isTokenIconClicked)
            }
            onClick={() =>
              onTokenIconClick(setIsTokenIconClicked, isTokenIconClicked)
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
            <TokenDropDown
              data-testid="wallet-other-tokens-dropdown"
              setIsTokenIconClick={setIsTokenIconClicked}
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

const onTokenIconClick = (
  setIsTokenIconClicked: Dispatch<SetStateAction<boolean>>,
  isTokenIconClicked: boolean
) => {
  if (isTokenIconClicked) {
    setIsTokenIconClicked(false);
  } else {
    setIsTokenIconClicked(true);
  }
};

interface TokenDropDownProps {
  addressTokens: AddressToken[];
  setIsTokenIconClick: Dispatch<SetStateAction<boolean>>;
}

interface AddressToken {
  value: number;
  symbol: string;
}

function TokenDropDown({
  addressTokens,
  setIsTokenIconClick,
}: TokenDropDownProps) {
  const [searchString, setSearchString] = useState("");
  const [searchedList, setSearchedList] = useState(addressTokens);

  useEffect(() => {
    const displayTokens: AddressToken[] = [];
    if (searchString !== "") {
      for (let i = 0; i < addressTokens.length; i += 1) {
        if (addressTokens[i].symbol.toLowerCase().includes(searchString)) {
          displayTokens.push(addressTokens[i]);
        }
      }
      setSearchedList(displayTokens);
    } else {
      setSearchedList(addressTokens);
    }
  }, [searchString]);

  return (
    <GradientCardContainer className="absolute whitespace-nowrap translate-x-[-10px] translate-y-[13px] lg:w-[314px] lg:h-[284px] md:w-[314px] md:h-[284px] w-[296px] h-[300px]">
      <div
        className={clsx(
          "p-5 w-full h-full overflow-y-hidden hover:overflow-y-auto",
          { "hover:overflow-y-hidden": searchedList.length <= 3 }
        )}
        onBlur={() => setIsTokenIconClick(false)}
        onFocus={() => setIsTokenIconClick(true)}
      >
        <div className="flex flex-row items-center rounded-lg bg-black-900 black-gradient-1 gap-x-[13px] pt-[17px] pb-[19px] focus-within:border-lightBlue border-[0.5px] border-black-500 mb-5">
          <FiSearch className="ml-[23px] text-white-50" size={24} />
          <input
            className="w-full h-full focus:outline-none bg-black-900 black-gradient-1 border-none black-gradient-1-shadow text-white-700 text-xl focus:caret-lightBlue"
            onChange={(v) => setSearchString(v.target.value)}
            placeholder="Search..."
          />
        </div>

        {searchedList.map((item) => (
          <DropDownTokenRow
            key={item.symbol}
            symbol={item.symbol}
            value={item.value}
          />
        ))}
      </div>
    </GradientCardContainer>
  );
}

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

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

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

interface QrCodeProps {
  address: string;
  onCloseClick: Dispatch<SetStateAction<boolean>>;
}

function QrCode({ address, onCloseClick }: QrCodeProps) {
  const [isWalletAddressCopied, setIsWalletAddressCopied] = useState(false);
  return (
    <div className="fixed backdrop-blur z-20 inset-0 pt-[104px] w-screen h-screen flex flex-col gap-y-[10px] items-center">
      <IoCloseOutline
        data-testid="wallet-qr-close-button"
        role="button"
        onClick={() => {
          onCloseClick(false);
        }}
        size={24}
        className="fixed md:top-[46px] md:right-[46px] top-[38px] right-[38px] text-white-50"
      />
      <GradientCardContainer className="w-[245px] h-[38px]">
        {isWalletAddressCopied ? (
          <div className="flex flex-row gap-x-2.5 items-center py-2 px-[21.5px]">
            <LinkText
              testId="wallet-id-copied"
              label={fixedTitle.copied}
              href={`/address/${walletAddressData.walletAddress}`}
              customStyle="tracking-[0.01em]"
            />
            <GreenTickIcon data-testid="qr-code-address-copied-green-tick-icon" />
          </div>
        ) : (
          <div className="flex flex-row gap-x-2.5 items-center py-2 px-[21.5px]">
            <LinkText
              testId="wallet-id"
              label={truncateTextFromMiddle(walletAddressData.walletAddress, 8)}
              href={`https://defimetascan.netlify.app/address/${walletAddressData.walletAddress}`}
              customStyle="tracking-[0.01em]"
            />
            <FiCopy
              data-testid="qr-code-copy-icon"
              onClick={() =>
                onCopyAddressIconClick(
                  setIsWalletAddressCopied,
                  walletAddressData.walletAddress
                )
              }
              className="text-white-50"
            />
          </div>
        )}
      </GradientCardContainer>
      <QRCode
        data-testid="wallet-qr-code-image"
        size={245}
        value={`/address/${address}`}
        viewBox="0 0 245 245"
      />
    </div>
  );
}

export default Address;
