import GradientCardContainer from "@components/commons/GradientCardContainer";
import LinkText from "@components/commons/LinkText";
import NumericFormat from "@components/commons/NumericFormat";
import { GreenTickIcon } from "@components/icons/GreenTickIcon";
import { SearchBar } from "layouts/components/searchbar/SearchBar";
import { readContractPages, verifiedContractData } from "mockdata/ContractData";
import { pages, transactions } from "mockdata/TransactionData";
import { tokenPages, tokens } from "mockdata/TokenData";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { FiCopy } from "react-icons/fi";
import { MdOutlineQrCode } from "react-icons/md";
import { truncateTextFromMiddle } from "shared/textHelper";
import QrCode from "@components/commons/QrCode";
import VerifiedGreenTickIcon from "@components/icons/VerifiedGreenTickIcon";
import { sleep } from "shared/sleep";
import { ContractTabsTitle } from "enum/contractTabsTitle";
import ContractTabs from "./_components/ContractTabs";
import ContractTokensList from "./_components/ContractTokensList";
import ContractTransactionsList from "./_components/ContractTransactionsList";
import VerifiedContractSubtitle from "./_components/VerifiedContractSubtitle";
import ContractCode from "./_components/ContractCode";

export default function VerifiedContract({ data }) {
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
              {fixedTitle.contract}
            </span>
            <VerifiedGreenTickIcon size={18} />
          </div>
          <ContractSegmentOne
            creator={data.verifiedContractData.creatorAddress}
            balance={data.verifiedContractData.balance}
            setIsQrCodeClicked={setIsQrCodeClicked}
          />
        </div>
      </GradientCardContainer>
      <GradientCardContainer className="relative mt-6">
        <div className="md:p-10 px-5 py-10">
          <ContractSegmentTwo data={data} />
        </div>
      </GradientCardContainer>
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
}: {
  creator: string;
  balance: { value: number; symbol: string };
  setIsQrCodeClicked: Dispatch<SetStateAction<boolean>>;
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
            data-testid="contract-wallet-balance-value"
          />
        </div>
      </div>
    </div>
  );
}

function ContractSegmentTwo({ data }) {
  const [selectedTab, setSelectedTab] = useState(ContractTabsTitle.Code);

  return (
    <div>
      <ContractTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === ContractTabsTitle.Transactions && (
        <ContractTransactionsList
          contractTransactions={data.transactions}
          contractTransactionPages={data.pages}
        />
      )}
      {selectedTab === ContractTabsTitle.Tokens && (
        <ContractTokensList
          contractTokenList={data.tokens}
          contractTokenListPage={data.tokenPages}
          balance={data.verifiedContractData.dmctxBalance}
          otherTokens={data.verifiedContractData.otherTokens}
          networth={data.verifiedContractData.networth}
        />
      )}
      {selectedTab === ContractTabsTitle.Code && (
        <ContractCode
          contractName={data.verifiedContractData.contractName}
          compilerVersion={data.verifiedContractData.compilerVersion}
          evmVersion={data.verifiedContractData.evmVersion}
          optimizedEnabled={data.verifiedContractData.optimizationEnabled}
          optimizationRuns={data.verifiedContractData.optimazationRuns}
          verifiedAt={data.verifiedContractData.verifiedAt}
          codes={data.verifiedContractData.codes}
          pages={data.readContractPages}
          writeContractData={data.verifiedContractData.writeContractData}
        />
      )}
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

export async function getServerSideProps() {
  // Fetch data from external API
  const data = {
    verifiedContractData,
    pages,
    transactions,
    tokenPages,
    tokens,
    readContractPages,
  };
  // Pass data to the page via props
  return { props: { data } };
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
