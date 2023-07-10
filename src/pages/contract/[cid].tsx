import { useState, Dispatch, SetStateAction } from "react";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import { FiCopy, FiInfo } from "react-icons/fi";
import { MdOutlineQrCode } from "react-icons/md";
import { formatEther } from "viem";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import LinkText from "@components/commons/LinkText";
import NumericFormat from "@components/commons/NumericFormat";
import { GreenTickIcon } from "@components/icons/GreenTickIcon";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import {
  isAlphanumeric,
  isNumeric,
  truncateTextFromMiddle,
} from "shared/textHelper";
import QrCode from "@components/commons/QrCode";
import VerifiedGreenTickIcon from "@components/icons/VerifiedGreenTickIcon";
import { sleep } from "shared/sleep";
import { ContractTabsTitle } from "enum/contractTabsTitle";
import { TxnNextPageParamsProps } from "@api/TransactionsApi";
import WalletAddressApi from "@api/WalletAddressApi";
import { NetworkConnection } from "@contexts/Environment";
import { DMX_TOKEN_SYMBOL } from "shared/constants";
import { AddressTransactionsProps } from "pages/address/_components/WalletDetails";
import TransactionDetails from "@components/TransactionDetails";
import { WalletAddressInfoI } from "@api/types";
import VerifiedContractSubtitle from "./_components/VerifiedContractSubtitle";
import ContractTabs from "./_components/ContractTabs";
import ContractCode from "./_components/ContractCode";

interface ContractDetailProps {
  addressTransactions: AddressTransactionsProps;
  balance: string;
  addressDetail: WalletAddressInfoI;
  isLoading?: boolean;
}

export default function VerifiedContract({
  addressTransactions,
  addressDetail,
  balance,
  isLoading,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isQrCodeClicked, setIsQrCodeClicked] = useState(false);
  const router = useRouter();
  const cid = router.query.cid?.toString()!;

  return (
    <div className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer className="relative">
        <div className="lg:p-10 md:p-10 px-5 py-8">
          <div
            className="flex flex-row lg:pb-[5px] pb-[9px] items-center gap-x-[11px]"
            data-testid="contract-details-title"
          >
            <span className="font-bold text-xl text-white-50">
              {addressDetail.name ?? fixedTitle.contract}
            </span>
            {addressDetail.is_verified && <VerifiedGreenTickIcon size={18} />}
          </div>
          <ContractSegmentOne
            creator={addressDetail.creator_address_hash ?? ""}
            balance={{ value: balance, symbol: DMX_TOKEN_SYMBOL }}
            setIsQrCodeClicked={setIsQrCodeClicked}
            isVerified={addressDetail.is_verified}
          />
        </div>
      </GradientCardContainer>
      <ContractSegmentTwo
        addressHash={cid}
        isLoading={isLoading}
        transactions={addressTransactions}
        implementationAddress={addressDetail.implementation_address ?? null}
      />
      {isQrCodeClicked && (
        <QrCode
          data-testid="contract-qr-code"
          address={cid}
          href={`/contract/${cid}`}
          onCloseClick={setIsQrCodeClicked}
        />
      )}
    </div>
  );
}

function ContractSegmentOne({
  creator,
  balance,
  setIsQrCodeClicked,
  isVerified,
}: {
  creator: string;
  balance: { value: string; symbol: string };
  setIsQrCodeClicked: Dispatch<SetStateAction<boolean>>;
  isVerified: boolean;
}): JSX.Element {
  const [isContractAddressCopied, setIsContractAddressCopied] = useState(false);
  const router = useRouter();
  const cid = router.query.cid?.toString()!;

  return (
    <div className="flex flex-col lg:gap-y-[37px] gap-y-[33px]">
      <div>
        {isContractAddressCopied ? (
          <div className="flex flex-row gap-x-2.5 items-center">
            <LinkText
              testId="contract-address-copied"
              label={fixedTitle.copied}
              href={`/contract/${cid}`}
              customStyle="tracking-[0.01em]"
            />
            <GreenTickIcon data-testid="contract-copied-green-tick-icon" />
            <MdOutlineQrCode
              role="button"
              onClick={() => onQrCodeClick(setIsQrCodeClicked)}
              className="text-white-50"
            />
          </div>
        ) : (
          <div className="flex flex-row gap-x-2.5 items-center">
            <LinkText
              testId="contract-address"
              label={truncateTextFromMiddle(cid, 11)}
              href={`/contract/${cid}`}
              customStyle="tracking-[0.01em]"
            />
            <FiCopy
              role="button"
              data-testid="contract-address-copy-icon"
              onClick={() =>
                onCopyAddressIconClick(setIsContractAddressCopied, cid)
              }
              className="text-white-50"
            />
            <MdOutlineQrCode
              data-testid="contract-address-qr-icon"
              role="button"
              onClick={() => onQrCodeClick(setIsQrCodeClicked)}
              className="text-white-50"
            />
          </div>
        )}
      </div>
      <div className="flex lg:flex-row md:flex-row flex-col gap-x-5 gap-y-5">
        <div className="flex flex-col gap-y-1 w-[288px]">
          <VerifiedContractSubtitle title={fixedTitle.creator} />
          <LinkText
            href={`/address/${creator}`}
            label={truncateTextFromMiddle(creator, 11)}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <VerifiedContractSubtitle title={fixedTitle.balance} />
          <NumericFormat
            className="text-white-50 tracking-[0.01em]"
            thousandSeparator
            value={balance.value}
            decimalScale={8}
            suffix={` ${balance.symbol}`}
            data-testid="contract-address-balance-value"
          />
        </div>
      </div>
      {!isVerified && (
        <div className="flex items-center">
          <FiInfo className="text-orange-700" />
          <span className="text-orange-700 ml-1">Unverified Contract</span>
        </div>
      )}
    </div>
  );
}

function ContractSegmentTwo({
  addressHash,
  isLoading,
  transactions,
  implementationAddress,
}: {
  addressHash: string;
  isLoading?: boolean;
  transactions: AddressTransactionsProps;
  implementationAddress: string | null;
}) {
  const [selectedTab, setSelectedTab] = useState(
    ContractTabsTitle.Transactions
  );

  return (
    <div>
      <div className="relative mt-10 lg:mt-8">
        <ContractTabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
      <GradientCardContainer className="relative mt-6">
        <div className="p-5 md:p-10">
          {selectedTab === ContractTabsTitle.Transactions && (
            <div className="mt-8">
              <TransactionDetails
                data={transactions}
                pathname={`/contract/${addressHash}`}
                type="address"
                isLoading={isLoading}
                isHeaderDisplayed={false}
              />
            </div>
          )}
          {selectedTab === ContractTabsTitle.Contract && (
            <ContractCode implementationAddress={implementationAddress} />
          )}
          {/* {selectedTab === ContractTabsTitle.Tokens && (
        <ContractTokensList
          contractTokenList={data.tokens}
          contractTokenListPage={data.tokenPages}
          balance={data.verifiedContractData.dmctxBalance}
          otherTokens={data.verifiedContractData.otherTokens}
          networth={data.verifiedContractData.networth}
        />
      )} 
      */}
        </div>
      </GradientCardContainer>
    </div>
  );
}

const fixedTitle = {
  contract: "Contract",
  creator: "Creator",
  balance: "Balance",
  code: "Code",
  transaction: "Transactions",
  token: "Tokens",
  networth: "Net worth",
  dmctxBalance: "DMCTx Balance",
  otherToken: "Other tokens",
  asset: "Asset",
  type: "Type",
  symbol: "Symbol",
  amount: "Amount",
  price: "Price",
  value: "Value",
  contractAddress: "Contract Address",
  copied: "Copied!",
};

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ContractDetailProps>> {
  const { network, ...params } = context.query;
  const cid = params?.cid?.toString().trim() as string;

  if (!isAlphanumeric(cid)) {
    return { notFound: true };
  }

  try {
    const addressDetail = await WalletAddressApi.getDetail(
      network as NetworkConnection,
      cid
    );

    const hasInvalidParams =
      !isNumeric(params?.block_number as string) ||
      !isNumeric(params?.items_count as string) ||
      !isNumeric(params?.page_number as string) ||
      !isNumeric(params?.index as string);

    const addressTransactions = hasInvalidParams
      ? await WalletAddressApi.getAddressTransactions(
          network as NetworkConnection,
          cid
        )
      : await WalletAddressApi.getAddressTransactions(
          network as NetworkConnection,
          cid,
          params?.block_number as string,
          params?.items_count as string,
          params?.index as string
        );

    return {
      props: {
        balance: formatEther(BigInt(addressDetail.coin_balance ?? "0")),
        addressDetail,
        addressTransactions: {
          transactions: addressTransactions.items,
          nextPageParams:
            addressTransactions.next_page_params as TxnNextPageParamsProps,
        },
      },
    };
  } catch (e) {
    return { notFound: true };
  }
}

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
