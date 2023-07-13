import { useState } from "react";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import TransactionDetails from "@components/TransactionDetails";
import { AddressContractTabsTitle } from "enum/tabsTitle";
import AddressLogs from "pages/contract/_components/AddressLogs";
import ContractCode from "pages/contract/_components/ContractCode";
import { AddressTransactionsProps } from "../WalletDetails";
import AddressContractTabsMenu from "./AddressContractTabsMenu";

export default function AddressContractTabs({
  addressHash,
  isLoading,
  transactions,
  implementationAddress,
  isContract,
  isTokenContract,
  basePath,
}: {
  addressHash: string;
  isLoading?: boolean;
  transactions: AddressTransactionsProps;
  implementationAddress: string | null;
  isContract: boolean;
  isTokenContract: boolean;
  basePath: string;
}) {
  const [selectedTab, setSelectedTab] = useState(
    AddressContractTabsTitle.Transactions
  );

  return (
    <div>
      <div className="relative mt-10 lg:mt-8">
        <AddressContractTabsMenu
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          isContract={isContract}
          isTokenContract={isTokenContract}
        />
      </div>
      <GradientCardContainer className="relative mt-6">
        <div className="p-5 md:p-10">
          {selectedTab === AddressContractTabsTitle.Transactions && (
            <div>
              <TransactionDetails
                data={transactions}
                pathname={`${basePath}/${addressHash}`}
                type="address"
                isLoading={isLoading}
                isHeaderDisplayed={false}
              />
            </div>
          )}
          {selectedTab === AddressContractTabsTitle.Logs && (
            <AddressLogs addressHash={addressHash} basePath={basePath} />
          )}
          {selectedTab === AddressContractTabsTitle.Contract && (
            <ContractCode implementationAddress={implementationAddress} />
          )}
          {/* {selectedTab === AddressContractTabsTitle.Tokens && (
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
