import React, { Dispatch, SetStateAction, useState } from "react";

import GradientCardContainer from "@components/commons/GradientCardContainer";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import { useRouter } from "next/router";
import { isAlphanumeric } from "shared/textHelper";
import { tokenPages, tokens as tokenDetailList } from "mockdata/TokenData";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import clsx from "clsx";
import { RawTransactionI } from "@api/types";
import { NetworkConnection } from "@contexts/Environment";

import QrCode from "../../components/commons/QrCode";
import WalletAddressApi from "../../api/WalletAddressApi";
import { WalletAddressDetails } from "./_components/WalletAddressDetails";
import {
  WalletDetailProps,
  WalletDetailTokenI,
  WalletDetails,
} from "./_components/WalletDetails";
import { BalanceDetails } from "./_components/BalanceDetails";
import { TokenDetails } from "./_components/TokenDetails";
import { TransactionDetails } from "./_components/TransactionDetails";

enum TabTitle {
  tokens = "Tokens",
  transactions = "Transactions",
}

interface SegmentOneProps {
  setIsQrCodeClicked: Dispatch<SetStateAction<boolean>>;
  detail: WalletDetailProps;
}

function Address({
  balance,
  transactionCount,
  addressTransactions,
  tokens,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
              Wallet address
            </span>
          </div>
          <WalletSegmentOne
            setIsQrCodeClicked={setIsQrCodeClicked}
            detail={{ balance, transactionCount, tokens, addressTransactions }}
          />
        </div>
      </GradientCardContainer>
      <div className="mt-6" />
      <GradientCardContainer className="relative">
        <div className="md:p-10 p-5">
          <WalletSegmentTwo
            tokens={tokens}
            addressTransactions={addressTransactions}
          />
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

function TabSelectionIndicator() {
  return <div className="brand-gradient-1 h-1 mt-[19.33px]" />;
}

function WalletSegmentOne({ setIsQrCodeClicked, detail }: SegmentOneProps) {
  return (
    <div className="flex flex-col gap-y-[33px]">
      <WalletAddressDetails setIsQrCodeClicked={setIsQrCodeClicked} />
      <WalletDetails detail={detail} />
    </div>
  );
}

function WalletSegmentTwo({
  tokens,
  addressTransactions,
}: {
  tokens: WalletDetailTokenI | null;
  addressTransactions: RawTransactionI[];
}) {
  const [isTransactionClicked, setIsTransactionClicked] = useState(true);
  const selectedFontStyle = "text-white-50";
  const unselectedFontStyle = "text-white-700";
  const tabs = [
    {
      title: TabTitle.transactions,
      isSelected: isTransactionClicked,
    },
    // hide tokens tab for now
    ...(tokens !== null
      ? [
          {
            title: TabTitle.tokens,
            isSelected: !isTransactionClicked,
          },
        ]
      : []),
  ];

  const onOptionsClick = (
    setIsTransactionOptionClicked: Dispatch<SetStateAction<boolean>>,
    itemClicked: string
  ) => {
    if (itemClicked === TabTitle.tokens) {
      setIsTransactionOptionClicked(false);
    } else {
      setIsTransactionOptionClicked(true);
    }
  };

  return (
    <div className="flex flex-col md:pt-[3.67px] pt-[23.67px]">
      <div className="flex flex-row gap-x-6">
        {tabs.map(({ title, isSelected }) => (
          <div className="flex flex-col" key={title}>
            <button
              type="button"
              className={clsx(
                "font-medium",
                isSelected ? selectedFontStyle : unselectedFontStyle
              )}
              data-testid={`wallet-${title}-options-title`}
              onClick={() => onOptionsClick(setIsTransactionClicked, title)}
            >
              {title}
            </button>
            {isSelected && <TabSelectionIndicator />}
          </div>
        ))}
      </div>
      {isTransactionClicked ? (
        <div className="lg:mt-5 lg:mb-[22.5px] md:mt-5 md:mb-5 mt-5 mb-7" />
      ) : (
        <BalanceDetails />
      )}
      {isTransactionClicked ? (
        <TransactionDetails addressTransactions={addressTransactions} />
      ) : (
        <div>
          <TokenDetails
            tokenList={tokenDetailList}
            tokenListPage={tokenPages}
          />
        </div>
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
    const addressTransactions = await WalletAddressApi.getAddressTransactions(
      network as NetworkConnection,
      aid
    );

    return {
      props: {
        balance: walletDetail.coin_balance,
        addressTransactions: addressTransactions.items,
        transactionCount: counters?.transactions_count,
        tokens: null, // passing null to temporary hide all tokens related UI
      },
    };
  } catch (e) {
    return { notFound: true };
  }
}

export default Address;
