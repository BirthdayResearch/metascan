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
import { TxnNextPageParamsProps } from "@api/TransactionsApi";
import WalletAddressApi from "@api/WalletAddressApi";
import { NetworkConnection } from "@contexts/Environment";
import { DMX_TOKEN_SYMBOL } from "shared/constants";
import { AddressTransactionsProps } from "pages/address/_components/WalletDetails";
import {
  WalletAddressCounterI,
  WalletAddressInfoI,
  WalletAddressToken,
} from "@api/types";
import clsx from "clsx";
import AddressContractTabs from "pages/address/_components/shared/AddressContractTabs";
import DetailRowTitle from "pages/address/_components/shared/DetailRowTitle";

interface ContractDetailProps {
  addressTransactions: AddressTransactionsProps;
  balance: string;
  addressDetail: WalletAddressInfoI;
  counters: WalletAddressCounterI;
  tokensCount: number;
  isLoading?: boolean;
}

export default function VerifiedContract({
  addressTransactions,
  addressDetail,
  balance,
  counters,
  tokensCount,
  isLoading,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isQrCodeClicked, setIsQrCodeClicked] = useState(false);
  const router = useRouter();
  const cid = router.query.cid?.toString()!;

  // Token Contract
  const isTokenContract = addressDetail.token !== null;
  const hasTokens = addressDetail.has_tokens;

  return (
    <div className="px-1 md:px-0 mt-12">
      <SearchBar containerClass="mt-1 mb-6" />
      <GradientCardContainer className="relative" fullBorder>
        <div className="lg:p-10 md:p-10 px-5 py-8">
          <div
            className="flex flex-row lg:pb-[5px] pb-[9px] items-center gap-x-[11px]"
            data-testid="contract-details-title"
          >
            <span className="font-bold text-xl text-white-50">
              {addressDetail.name ?? "Contract"}
            </span>
            {addressDetail.is_verified && <VerifiedGreenTickIcon size={18} />}
          </div>
          <ContractSegmentOne
            creator={addressDetail.creator_address_hash ?? ""}
            balance={{ value: balance, symbol: DMX_TOKEN_SYMBOL }}
            setIsQrCodeClicked={setIsQrCodeClicked}
            isVerified={addressDetail.is_verified}
            isTokenContract={isTokenContract}
            hasTokens={hasTokens}
            token={addressDetail.token}
            counters={counters}
            tokensCount={tokensCount}
            lastupdatedAtBlock={addressDetail.block_number_balance_updated_at}
          />
        </div>
      </GradientCardContainer>
      <AddressContractTabs
        addressHash={cid}
        isLoading={isLoading}
        transactions={addressTransactions}
        implementationAddress={addressDetail.implementation_address ?? null}
        isContract={addressDetail.is_contract}
        isTokenContract={isTokenContract}
        basePath="/contract"
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
  isTokenContract,
  hasTokens,
  token,
  lastupdatedAtBlock,
  counters,
  tokensCount,
}: {
  creator: string;
  balance: { value: string; symbol: string };
  setIsQrCodeClicked: Dispatch<SetStateAction<boolean>>;
  isVerified: boolean;
  isTokenContract: boolean;
  hasTokens: boolean;
  token: WalletAddressToken;
  lastupdatedAtBlock: number;
  counters: WalletAddressCounterI;
  tokensCount: number;
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
              label="Copied!"
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
      <div
        className={clsx(
          "grid gap-x-5 gap-y-5",
          "md:grid md:grid-cols-2",
          "lg:grid-cols-3"
        )}
      >
        {isTokenContract && (
          <div className="flex flex-col gap-y-1">
            <DetailRowTitle title="Token" tooltip="Token name and symbol" />
            <div>
              <LinkText
                href={`/token/${token.address}`}
                label={token.name ?? "N/A"}
              />
              <span className="text-sm text-white-700 ml-1">
                {token.symbol ? `(${token.symbol})` : ""}
              </span>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-y-1">
          <DetailRowTitle
            title="Creator"
            tooltip="The original issuer of the tokens"
          />
          <LinkText
            href={`/address/${creator}`}
            label={truncateTextFromMiddle(creator, 11)}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <DetailRowTitle
            title="Balance"
            tooltip="The specific digital assets associated with this contract"
          />
          <NumericFormat
            className="text-white-50 tracking-[0.01em]"
            thousandSeparator
            value={balance.value}
            decimalScale={8}
            suffix={` ${balance.symbol}`}
            data-testid="contract-address-balance-value"
          />
        </div>
        {(isTokenContract || hasTokens) && (
          <div className="flex flex-col gap-y-1">
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
        {isTokenContract && (
          <>
            <div className="flex flex-col gap-y-1">
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
            <div className="flex flex-col gap-y-1">
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
            <div className="flex flex-col gap-y-1">
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
            <div className="flex flex-col gap-y-1">
              <DetailRowTitle
                title="Last updated"
                tooltip="Block number in which this address was updated"
              />
              <LinkText
                href={`/block/${lastupdatedAtBlock}`}
                label={`Block #${lastupdatedAtBlock}`}
              />
            </div>
          </>
        )}
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

    const counters = await WalletAddressApi.getCounters(
      network as NetworkConnection,
      cid
    );
    const allTokens = await WalletAddressApi.getAllAddressTokens(
      network as NetworkConnection,
      cid
    );
    const tokensCount = allTokens?.length ?? 0;

    return {
      props: {
        balance: formatEther(BigInt(addressDetail.coin_balance ?? "0")),
        addressDetail,
        addressTransactions: {
          transactions: addressTransactions.items,
          nextPageParams:
            addressTransactions.next_page_params as TxnNextPageParamsProps,
        },
        counters,
        tokensCount,
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
