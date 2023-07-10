import clsx from "clsx";
import React, { useState } from "react";
import { FiInfo } from "react-icons/fi";
import { formatEther } from "viem";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { isAlphanumeric, truncateTextFromMiddle } from "shared/textHelper";
import TokenApi, { TokenProps } from "@api/TokenApi";
import WalletAddressApi from "@api/WalletAddressApi";
import { NetworkConnection } from "@contexts/Environment";
import { useNetwork } from "@contexts/NetworkContext";
import useWindowDimensions from "@hooks/useWindowDimensions";
import { useGetTokenCountersQuery } from "@store/token";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import Tooltip from "@components/commons/Tooltip";
import LinkText from "@components/commons/LinkText";
import NumericFormat from "@components/commons/NumericFormat";
import AddressWithQrCode from "@components/commons/AddressWithQrCode";
import QrCode from "../../components/commons/QrCode";
import TokenTransfers from "./_components/TokenTransfers";
import TokenHolders from "./_components/TokenHolders";

enum TabTitle {
  transfers = "Token transfers",
  holders = "Token holders",
}

interface TokenDetailProps {
  token: TokenProps;
  creatorAddress: string;
}

export default function Token({ token, creatorAddress }: TokenDetailProps) {
  const tokenId = token.address;
  const { connection } = useNetwork();
  const { data: tokenCounters } = useGetTokenCountersQuery({
    network: connection,
    tokenId,
  });

  const [isQrCodeClicked, setIsQrCodeClicked] = useState(false);
  const windowDimension = useWindowDimensions().width;
  const truncateTextLength = windowDimension <= 1024 ? 8 : 11;
  const detailContainerCss = "flex justify-between md:flex-col gap-1";

  return (
    <div className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer className="relative z-[1]">
        <div className="lg:p-10 md:p-10 px-5 py-6">
          <div
            className="flex flex-col gap-y-1 flex-wrap pb-5 md:pb-8 text-white-50 border-b border-black-600 md:border-b-0"
            data-testid="token-details-title"
          >
            <div className="flex items-center gap-x-2">
              <span className="font-bold text-xl leading-8 -tracking-[0.2px] shrink-0">
                {token.name}
              </span>
              <span className="-tracking-[0.32px] shrink-0">
                ({token.symbol})
              </span>
            </div>
            <div className="md:hidden">
              <AddressWithQrCode
                address={tokenId}
                setIsQrCodeClicked={setIsQrCodeClicked}
                truncateTextLength={truncateTextLength}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-5 md:mt-0">
            <div className={clsx(detailContainerCss, "hidden md:flex")}>
              <DetailTitle title="Contract" tooltip="Contract" />
              <AddressWithQrCode
                address={tokenId}
                setIsQrCodeClicked={setIsQrCodeClicked}
                truncateTextLength={truncateTextLength}
              />
            </div>
            <div className={detailContainerCss}>
              <DetailTitle title="Creator" tooltip="Creator" />
              <LinkText
                href={`/address/${creatorAddress}`}
                label={truncateTextFromMiddle(
                  creatorAddress,
                  truncateTextLength
                )}
              />
            </div>
            <div className={detailContainerCss}>
              <DetailTitle title="Token type" tooltip="Token type" />
              <div className="text-white-50">{token.type}</div>
            </div>
            <div className={detailContainerCss}>
              <DetailTitle title="Total supply" tooltip="Total supply" />
              <NumericFormat
                thousandSeparator
                value={formatEther(BigInt(token.total_supply ?? "0"))}
                className="text-white-50"
                suffix={` ${token.symbol}`}
                decimalScale={2}
              />
            </div>
            <div className={detailContainerCss}>
              <DetailTitle title="Total transfers" tooltip="Total transfers" />
              <NumericFormat
                thousandSeparator
                value={tokenCounters?.transfers_count ?? 0}
                className="text-white-50"
                suffix=" transfers"
                decimalScale={0}
              />
            </div>
            <div className={detailContainerCss}>
              <DetailTitle title="Total holders" tooltip="Total holders" />
              <NumericFormat
                thousandSeparator
                value={token.holders}
                className="text-white-50"
                suffix=" addresses"
                decimalScale={0}
              />
            </div>
          </div>
        </div>
      </GradientCardContainer>
      <div className="mt-6" />
      <GradientCardContainer className="relative">
        <div className="md:p-10 p-5">
          <TokenTransfersAndHolders />
        </div>
      </GradientCardContainer>
      {isQrCodeClicked && (
        <QrCode
          data-testid="qr-code"
          address={tokenId}
          href={`/address/${tokenId}`}
          onCloseClick={setIsQrCodeClicked}
        />
      )}
    </div>
  );
}

function DetailTitle({ title, tooltip }: { title: string; tooltip: string }) {
  return (
    <div className="flex items-center text-white-700">
      <div className="text-white-700">{title}</div>
      <Tooltip text={tooltip}>
        <FiInfo size={16} className="ml-1 md:ml-2" />
      </Tooltip>
    </div>
  );
}

function TokenTransfersAndHolders() {
  const [activeTab, setActiveTab] = useState(TabTitle.holders);

  const tabs = [
    {
      title: TabTitle.transfers,
    },
    {
      title: TabTitle.holders,
    },
  ];

  return (
    <div className="flex flex-col md:pt-[3.67px] pt-[23.67px]">
      {tabs.length > 0 && (
        <div className="flex flex-row gap-x-6">
          {tabs.map(({ title }) => (
            <div className="flex flex-col" key={title}>
              <button
                type="button"
                className={clsx(
                  "font-medium",
                  activeTab === title ? "text-white-50" : "text-white-700"
                )}
                data-testid={`wallet-${title}-options-title`}
                onClick={() => setActiveTab(title)}
              >
                {title}
              </button>
              {activeTab === title && (
                <div className="brand-gradient-1 h-1 mt-3" />
              )}
            </div>
          ))}
        </div>
      )}

      <div>
        {activeTab === TabTitle.transfers && <TokenTransfers />}
        {activeTab === TabTitle.holders && <TokenHolders />}
      </div>
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<TokenDetailProps>> {
  const { network } = context.query;
  const tokenId = context.params?.tokenId?.toString().trim() as string;

  if (!isAlphanumeric(tokenId)) {
    return { notFound: true };
  }

  try {
    const token = await TokenApi.getToken(
      network as NetworkConnection,
      tokenId
    );
    const addressDetails = await WalletAddressApi.getDetail(
      network as NetworkConnection,
      tokenId
    );

    return {
      props: {
        token,
        creatorAddress: addressDetails.creator_address_hash ?? tokenId,
      },
    };
  } catch (e) {
    return { notFound: true };
  }
}
