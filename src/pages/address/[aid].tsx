import React, { Dispatch, SetStateAction, useState } from "react";
import { formatEther } from "viem";

import GradientCardContainer from "@components/commons/GradientCardContainer";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import { useRouter } from "next/router";
import { isAlphanumeric, isNumeric } from "shared/textHelper";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import { NetworkConnection } from "@contexts/Environment";

import { TxnNextPageParamsProps } from "@api/TransactionsApi";
import AddressWithQrCode from "@components/commons/AddressWithQrCode";
import QrCode from "../../components/commons/QrCode";
import WalletAddressApi from "../../api/WalletAddressApi";
import WalletDetails, { WalletDetailProps } from "./_components/WalletDetails";
import AddressContractTabs from "./_components/shared/AddressContractTabs";

interface SegmentOneProps {
  aid: string;
  setIsQrCodeClicked: Dispatch<SetStateAction<boolean>>;
  detail: WalletDetailProps;
}

function Address({
  balance,
  addressTransactions,
  tokens,
  walletDetail,
  counters,
  isLoading,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isQrCodeClicked, setIsQrCodeClicked] = useState(false);
  const router = useRouter();
  const aid = router.query.aid?.toString()!;

  return (
    <div className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer className="relative z-[1]" fullBorder>
        <div className="lg:p-10 md:p-10 px-5 py-6">
          <div
            className="flex flex-row pb-[9px]"
            data-testid="address-details-title"
          >
            <span className="font-bold text-xl text-white-50">
              Wallet address
            </span>
          </div>
          <WalletSegmentOne
            aid={aid}
            setIsQrCodeClicked={setIsQrCodeClicked}
            detail={{
              balance,
              tokens,
              addressTransactions,
              walletDetail,
              counters,
            }}
          />
        </div>
      </GradientCardContainer>
      <AddressContractTabs
        addressHash={aid}
        isLoading={isLoading}
        transactions={addressTransactions}
        implementationAddress={walletDetail.implementation_address ?? null}
        isContract={walletDetail.is_contract}
        isTokenContract={walletDetail.token !== null}
        basePath="/address"
      />
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

function WalletSegmentOne({
  aid,
  setIsQrCodeClicked,
  detail,
}: SegmentOneProps) {
  return (
    <div className="flex flex-col gap-y-[33px]">
      <AddressWithQrCode
        address={aid}
        setIsQrCodeClicked={setIsQrCodeClicked}
      />
      <WalletDetails detail={detail} />
    </div>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<WalletDetailProps>> {
  const { network, ...params } = context.query;
  const aid = context.params?.aid?.toString().trim() as string;

  if (!isAlphanumeric(aid)) {
    return { notFound: true };
  }

  try {
    const walletDetail = await WalletAddressApi.getDetail(
      network as NetworkConnection,
      aid
    );

    // Redirect contract address to contract page
    if (walletDetail?.is_contract) {
      return {
        redirect: {
          permanent: false,
          destination: `/contract/${aid}`,
        },
      };
    }

    const counters = await WalletAddressApi.getCounters(
      network as NetworkConnection,
      aid
    );

    const hasInvalidParams =
      !isNumeric(params?.block_number as string) ||
      !isNumeric(params?.items_count as string) ||
      !isNumeric(params?.page_number as string) ||
      !isNumeric(params?.index as string);

    const addressTransactions = hasInvalidParams
      ? await WalletAddressApi.getAddressTransactions(
          network as NetworkConnection,
          aid
        )
      : await WalletAddressApi.getAddressTransactions(
          network as NetworkConnection,
          aid,
          params?.block_number as string,
          params?.items_count as string,
          params?.index as string
        );

    return {
      props: {
        balance: formatEther(BigInt(walletDetail.coin_balance ?? "0")),
        walletDetail,
        counters,
        addressTransactions: {
          transactions: addressTransactions.items,
          nextPageParams:
            addressTransactions.next_page_params as TxnNextPageParamsProps,
        },
        tokens: null, // passing null to temporary hide all tokens related UI
      },
    };
  } catch (e) {
    return { notFound: true };
  }
}

export default Address;
