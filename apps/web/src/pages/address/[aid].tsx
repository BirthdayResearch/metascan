import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { FiCopy } from "react-icons/fi";
import { MdOutlineQrCode } from "react-icons/md";
import { formatEther, formatUnits } from "viem";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";

import { DFI_TOKEN_SYMBOL, GWEI_DECIMAL } from "shared/constants";
import { sleep } from "shared/sleep";
import { isAlphanumeric, truncateTextFromMiddle } from "shared/textHelper";
import { WalletAddressCounterI, WalletAddressInfoI } from "@api/types";
import WalletAddressApi from "@api/WalletAddressApi";
import { TokenCountersProps } from "@api/TokenApi";
import useWindowDimensions from "@hooks/useWindowDimensions";
import { AddressContractTabsTitle } from "enum/tabsTitle";

import { NetworkConnection } from "@contexts/Environment";
import { AddressType } from "@components/types";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import AddressWithQrCode from "@components/commons/AddressWithQrCode";
import LinkText from "@components/commons/LinkText";
import NumericFormat from "@components/commons/NumericFormat";
import QrCode from "@components/commons/QrCode";
import VerifiedGreenTickIcon from "@components/icons/VerifiedGreenTickIcon";
import { GreenTickIcon } from "@components/icons/GreenTickIcon";
import DetailRowTitle from "./_components/DetailRowTitle";
import ListTabs from "./_components/ListTabs";
import ContractCode from "./_components/ContractCode";
import ContractTokensList from "./_components/ContractTokensList";
import LogsList from "./_components/LogsList";
import TokenTransfersList from "./_components/TokenTransfersList";
import TokenHoldersList from "./_components/TokenHoldersList";
import TransactionsList from "./_components/TransactionsList";

export interface WalletDetailProps {
  walletDetail: WalletAddressInfoI;
  counters: WalletAddressCounterI;
  tokenCounters: TokenCountersProps | null;
  tokensCount: number;
  isTokenPage?: boolean;
}

function getAddressType({
  data,
  isTokenPage,
}: {
  data: WalletAddressInfoI;
  isTokenPage: boolean;
}) {
  switch (true) {
    case isTokenPage:
      return AddressType.Token;
    case data.is_contract && data.token !== null:
      return AddressType.TokenContract;
    case data.is_contract:
      return AddressType.Contract;
    default:
      return AddressType.Wallet;
  }
}

function getHeaderTitle(addressType: AddressType) {
  switch (addressType) {
    case AddressType.Contract:
    case AddressType.TokenContract:
      return "Contract";
    case AddressType.Token:
      return "Token details";
    case AddressType.Wallet:
    default:
      return "Wallet address";
  }
}

export default function Address({
  walletDetail,
  counters,
  tokenCounters,
  tokensCount,
  isTokenPage = false,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const aid = walletDetail.hash;
  const addressType = getAddressType({ data: walletDetail, isTokenPage });

  const tokenCreator = walletDetail.creator_address_hash ?? aid;
  const creatorAddress =
    addressType === AddressType.Token
      ? tokenCreator
      : walletDetail.creator_address_hash;

  const [isAddressCopied, setIsAddressCopied] = useState(false);
  const [isQrCodeClicked, setIsQrCodeClicked] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    AddressContractTabsTitle.Transactions
  );

  useEffect(() => {
    const defaultTab =
      addressType === AddressType.Token
        ? AddressContractTabsTitle.TokenTransfers
        : AddressContractTabsTitle.Transactions;
    setSelectedTab(defaultTab);
  }, [addressType]);

  const onCopyAddressIconClick = async (address: string) => {
    setIsAddressCopied(true);
    navigator.clipboard.writeText(address);
    await sleep(2000);
    setIsAddressCopied(false);
  };

  const windowDimension = useWindowDimensions().width;
  const truncateTextLength = windowDimension <= 1024 ? 8 : 11;
  const detailContainerCss =
    "flex justify-between md:justify-start md:flex-col gap-1";
  const detailValueCss = "text-white-50 break-all text-right md:text-start";

  return (
    <div className="px-1 md:px-0 mt-12 min-h-screen">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer className="relative z-[1]" fullBorder>
        <div className="px-5 py-8 md:p-10">
          <div
            className="flex flex-row lg:pb-[5px] pb-[9px] items-center gap-x-[11px]"
            data-testid="address-title"
          >
            <div className="flex items-center gap-x-2 text-white-50">
              <span className="font-bold text-xl">
                {walletDetail.name ?? getHeaderTitle(addressType)}
              </span>
              {addressType === AddressType.Token && (
                <span className="-tracking-[0.32px] shrink-0">
                  {walletDetail.token.symbol
                    ? `(${walletDetail.token.symbol})`
                    : ""}
                </span>
              )}
              {walletDetail.is_verified &&
                addressType !== AddressType.Token && (
                  <VerifiedGreenTickIcon size={18} />
                )}
            </div>
          </div>

          {addressType !== AddressType.Token && (
            <div>
              {isAddressCopied ? (
                <div className="flex flex-row gap-x-2.5 items-center">
                  <LinkText
                    testId="address-copied"
                    label="Copied!"
                    href={`/address/${aid}`}
                    customStyle="tracking-[0.01em]"
                  />
                  <GreenTickIcon data-testid="address-copied-icon" />
                  <MdOutlineQrCode
                    role="button"
                    onClick={() => setIsQrCodeClicked}
                    className="text-white-50"
                  />
                </div>
              ) : (
                <div className="flex flex-row gap-x-2.5 items-center">
                  <LinkText
                    testId="contract-address"
                    label={truncateTextFromMiddle(aid, 11)}
                    href={`/address/${aid}`}
                    customStyle="tracking-[0.01em]"
                  />
                  <FiCopy
                    role="button"
                    data-testid="contract-address-copy-icon"
                    onClick={() => onCopyAddressIconClick(aid)}
                    className="text-white-50"
                  />
                  <MdOutlineQrCode
                    data-testid="contract-address-qr-icon"
                    role="button"
                    onClick={() => setIsQrCodeClicked}
                    className="text-white-50"
                  />
                </div>
              )}
            </div>
          )}
          <div
            className={clsx(
              "grid gap-x-5 gap-y-6",
              "md:grid md:grid-cols-2",
              "lg:grid-cols-3",
              "mt-8"
            )}
          >
            {addressType === AddressType.Token && (
              <div className={clsx(detailContainerCss, "flex")}>
                <DetailRowTitle
                  title="Contract"
                  tooltip="The unique address identifying the smart contract on the blockchain"
                />
                <AddressWithQrCode
                  address={aid}
                  setIsQrCodeClicked={setIsQrCodeClicked}
                  truncateTextLength={truncateTextLength}
                  customStyle="justify-end md:justify-start"
                />
              </div>
            )}
            {addressType === AddressType.TokenContract && (
              <div className="flex flex-col gap-y-1">
                <DetailRowTitle title="Token" tooltip="Token name and symbol" />
                <div>
                  <LinkText
                    href={{
                      pathname: `/token/${walletDetail.token.address}`,
                    }}
                    label={walletDetail.token.name ?? "N/A"}
                  />
                  <span className="text-sm text-white-700 ml-1">
                    {walletDetail.token.symbol
                      ? `(${walletDetail.token.symbol})`
                      : ""}
                  </span>
                </div>
              </div>
            )}
            {(creatorAddress || addressType === AddressType.TokenContract) && (
              <div className={detailContainerCss}>
                <DetailRowTitle
                  title="Creator"
                  tooltip={
                    addressType === AddressType.Token
                      ? "The original issuer of the tokens"
                      : "The entity that deployed the smart contract on the blockchain"
                  }
                />
                <LinkText
                  href={`/address/${walletDetail.creator_address_hash ?? aid}`}
                  label={truncateTextFromMiddle(
                    walletDetail.creator_address_hash ?? aid,
                    truncateTextLength
                  )}
                  customStyle="break-all text-end md:text-start"
                />
              </div>
            )}
            {/* [Token] Token type, total supply, total transfers, holders */}
            {addressType === AddressType.Token && (
              <>
                <div className={detailContainerCss}>
                  <DetailRowTitle
                    title="Token type"
                    tooltip="The standard protocol the token follows, such as ERC-20 or ERC-721"
                  />
                  <div className={detailValueCss}>
                    {walletDetail.token.type}
                  </div>
                </div>
                <div className={detailContainerCss}>
                  <DetailRowTitle
                    title="Total supply"
                    tooltip="The total amount of tokens issued"
                  />
                  {walletDetail.token.total_supply ? (
                    <NumericFormat
                      data-testid="total-supply"
                      thousandSeparator
                      value={formatUnits(
                        BigInt(walletDetail.token.total_supply ?? "0"),
                        Number(walletDetail.token.decimals ?? GWEI_DECIMAL)
                      )}
                      decimalScale={0}
                      suffix={
                        walletDetail.token.symbol
                          ? ` ${walletDetail.token.symbol}`
                          : ""
                      }
                      className={detailValueCss}
                    />
                  ) : (
                    <span className="text-white-50">N/A</span>
                  )}
                </div>
                <div className={detailContainerCss}>
                  <DetailRowTitle
                    title="Total transfers"
                    tooltip="The cumulative count of all token transfers associated with this contract"
                  />
                  <NumericFormat
                    thousandSeparator
                    value={tokenCounters?.transfers_count ?? 0}
                    className={detailValueCss}
                    suffix={
                      Number(tokenCounters?.transfers_count ?? 0) > 1
                        ? " transfers"
                        : " transfer"
                    }
                    decimalScale={0}
                  />
                </div>
                <div className={detailContainerCss}>
                  <DetailRowTitle
                    title="Total holders"
                    tooltip="The total number of unique addresses holding the token"
                  />
                  <NumericFormat
                    thousandSeparator
                    value={tokenCounters?.token_holders_count ?? 0}
                    className={detailValueCss}
                    suffix={
                      Number(tokenCounters?.token_holders_count ?? 0) > 1
                        ? " addresses"
                        : " address"
                    }
                    decimalScale={0}
                  />
                </div>
              </>
            )}
            {addressType !== AddressType.Token && (
              <div className={detailContainerCss}>
                <DetailRowTitle
                  title="Balance"
                  tooltip={`The specific digital assets associated with this ${
                    addressType === AddressType.Wallet ? "address" : "contract"
                  }`}
                />
                <NumericFormat
                  className="text-white-50 tracking-[0.01em]"
                  thousandSeparator
                  value={formatEther(BigInt(walletDetail.coin_balance ?? "0"))}
                  decimalScale={8}
                  suffix={` ${DFI_TOKEN_SYMBOL}`}
                  data-testid="address-balance-value"
                />
              </div>
            )}
            {(addressType !== AddressType.Wallet ||
              (addressType === AddressType.Wallet &&
                walletDetail.has_tokens)) &&
              !isTokenPage && (
                <div className={detailContainerCss}>
                  <DetailRowTitle
                    title="Tokens"
                    tooltip="The current number of tokens held in a specific address"
                  />
                  <NumericFormat
                    className="text-white-50 tracking-[0.01em]"
                    thousandSeparator
                    value={tokensCount}
                    decimalScale={0}
                    suffix={tokensCount > 1 ? " tokens" : " token"}
                    data-testid="token-contract-tokens-count"
                  />
                </div>
              )}
            {Number(counters.transactions_count ?? 0) > 0 &&
              addressType !== AddressType.Token && (
                <div className={detailContainerCss}>
                  <DetailRowTitle
                    title="Transactions"
                    tooltip="The history of all transactions to and from this address"
                  />
                  <NumericFormat
                    className="text-white-50 tracking-[0.01em]"
                    thousandSeparator
                    value={counters.transactions_count ?? 0}
                    decimalScale={0}
                    suffix={
                      Number(counters.transactions_count ?? 0) > 1
                        ? " transactions"
                        : " transaction"
                    }
                    data-testid="token-contract-txs-count"
                  />
                </div>
              )}
            {/* [Token Contract] Transfers, Gas used, last updated */}
            {addressType === AddressType.TokenContract && (
              <>
                <div className={detailContainerCss}>
                  <DetailRowTitle
                    title="Transfers"
                    tooltip="The total number of token transfers involving this address"
                  />
                  <NumericFormat
                    className="text-white-50 tracking-[0.01em]"
                    thousandSeparator
                    value={counters.token_transfers_count ?? 0}
                    decimalScale={0}
                    suffix={
                      Number(counters.token_transfers_count ?? 0) > 1
                        ? " transfers"
                        : " transfer"
                    }
                    data-testid="token-contract-transfers-count"
                  />
                </div>
                <div className={detailContainerCss}>
                  <DetailRowTitle
                    title="Gas used"
                    tooltip="The total amount of computational effort expended to execute transactions"
                  />
                  <NumericFormat
                    className="text-white-50 tracking-[0.01em]"
                    thousandSeparator
                    value={counters.gas_usage_count ?? 0}
                    decimalScale={0}
                    data-testid="token-contract-gas-used"
                  />
                </div>
                <div className={detailContainerCss}>
                  <DetailRowTitle
                    title="Last updated"
                    tooltip="Block number in which this address was updated"
                  />
                  <LinkText
                    href={`/block/${walletDetail.block_number_balance_updated_at}`}
                    label={`Block #${walletDetail.block_number_balance_updated_at}`}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </GradientCardContainer>

      <div className="relative mt-10 lg:mt-8 md:px-10">
        <ListTabs
          tokenCount={tokensCount}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          addressType={addressType}
        />
      </div>
      <GradientCardContainer className="relative mt-6" fullBorder>
        <div className="p-5 md:p-10">
          {selectedTab === AddressContractTabsTitle.Transactions && (
            <TransactionsList addressHash={aid} />
          )}
          {selectedTab === AddressContractTabsTitle.Logs && (
            <LogsList addressHash={aid} />
          )}
          {selectedTab === AddressContractTabsTitle.Contract && (
            <ContractCode
              addressHash={aid}
              implementationAddress={
                walletDetail.implementation_address ?? null
              }
            />
          )}
          {selectedTab === AddressContractTabsTitle.Tokens && (
            <ContractTokensList addressHash={aid} />
          )}
          {selectedTab === AddressContractTabsTitle.TokenTransfers && (
            <TokenTransfersList addressHash={aid} />
          )}
          {selectedTab === AddressContractTabsTitle.TokenHolders && (
            <TokenHoldersList addressHash={aid} />
          )}
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

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<WalletDetailProps>> {
  const { network } = context.query;
  const aid = context.params?.aid?.toString().trim() as string;

  if (!isAlphanumeric(aid)) {
    return { notFound: true };
  }

  try {
    const walletDetail = await WalletAddressApi.getDetail(
      network as NetworkConnection,
      aid
    );
    const counters = await WalletAddressApi.getCounters(
      network as NetworkConnection,
      aid
    );

    const allTokens = await WalletAddressApi.getAllAddressTokens(
      network as NetworkConnection,
      aid
    );
    const tokensCount = allTokens?.length ?? 0;

    return {
      props: {
        walletDetail,
        counters,
        tokensCount,
        tokenCounters: null,
      },
    };
  } catch (e) {
    return { notFound: true };
  }
}
