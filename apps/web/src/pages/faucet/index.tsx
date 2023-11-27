import Container from "@components/commons/Container";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useState } from "react";
import { useNetwork } from "@contexts/NetworkContext";
import { NetworkConnection } from "@contexts/Environment";
import FaucetApi, { FaucetTransactionResponse } from "@api/FaucetApi";
import { RiLoader2Fill } from "react-icons/ri";
import { ActionButton } from "pages/address/verify/_components/StepOne";
import Page404 from "pages/404";
import LinkText from "@components/commons/LinkText";
import SectionTitle from "../../layouts/components/SectionTitle";
import WalletAddressTextInput from "../../layouts/components/WalletAddressTextInput";
import SectionDesc from "../../layouts/components/SectionDesc";

function Loader() {
  return (
    <div className="flex items-center justify-center h-[24px]">
      <RiLoader2Fill
        className="text-white-50 animate-spin"
        data-testid="spinner"
        size={24}
      />
    </div>
  );
}

export default function Faucet() {
  const { connection } = useNetwork();
  const recaptcha = React.useRef<ReCAPTCHA>(null);

  const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false);
  const [validEvmAddress, setValidEvmAddress] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<FaucetTransactionResponse>();
  const [errorMsg, setErrorMsg] = useState<string>();

  function onCaptchaChange() {
    if (recaptcha.current !== null) {
      setIsCaptchaSuccess(true);
    }
  }

  async function handleSendFunds(recaptchaVal: string) {
    try {
      setIsLoading(true);
      setErrorMsg("");
      setData(undefined);
      const res = await FaucetApi.sendFundsToUser(
        connection,
        recaptchaVal,
        walletAddress,
      );
      setData(res);
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message ??
          "Error occurred, please try again later",
      );
    } finally {
      recaptcha.current?.reset();
      setIsLoading(false);
      setIsCaptchaSuccess(false);
    }
  }

  const isDisabled = isLoading || !isCaptchaSuccessful || !validEvmAddress;
  if (connection !== NetworkConnection.TestNet) {
    return <Page404 />;
  }

  return (
    <Container className="px-1 md:px-0 mt-12">
      <SectionTitle title="DeFiChain Testnet Faucet" />
      <div className="text-center mb-4 font-bold text-xl text-white-50">
        This faucet gives 100 testnet DFI per request
      </div>
      <GradientCardContainer>
        <div>
          <div data-testid="blocks-list" className="p-5">
            <div className="flex flex-col py-2 items-start relative">
              <div className="py-2 text-white-50 text-xl">
                Enter a Testnet DFI address to receive funds.
              </div>
            </div>
            <div className="space-y-6">
              <WalletAddressTextInput
                walletAddress={walletAddress}
                setWalletAddress={setWalletAddress}
                validEvmAddress={validEvmAddress}
                setValidEvmAddress={setValidEvmAddress}
              />
              <ReCAPTCHA
                ref={recaptcha}
                sitekey={process.env.NEXT_PUBLIC_SITE_KEY || ""}
                onChange={() => onCaptchaChange()}
                onExpired={() => setIsCaptchaSuccess(false)}
                className="flex justify-center"
                // theme="dark"
              />
              <div className="flex justify-center">
                <ActionButton
                  label="Send Testnet DFI"
                  testId="send_tokens_btn"
                  onClick={() => {
                    if (
                      recaptcha.current !== null &&
                      recaptcha.current.getValue() !== null
                    ) {
                      handleSendFunds(recaptcha.current.getValue()!);
                    }
                  }}
                  labelStyle="font-medium text-sm"
                  disabled={isDisabled}
                  customStyle="px-5"
                />
              </div>
            </div>
            {errorMsg && (
              <SectionDesc title={errorMsg} customTextStyle="!text-red-500" />
            )}
            {isLoading ? (
              <div className="mt-4">
                <Loader />
                <SectionDesc
                  title="Sending funds..."
                  customStyle="!my-0 pb-4"
                />
              </div>
            ) : (
              data?.hash && (
                <div className="items-center mt-4">
                  <div className="text-white-50 -tracking-[0.01em] text-center">
                    Your transaction has been sent. You should receive your DFI
                    shortly.
                  </div>
                  <div className="flex flex-row justify-center mt-2">
                    <div className="text-white-50 -tracking-[0.01em] mr-1">
                      Transaction Hash:
                    </div>
                    <LinkText
                      label={data.hash}
                      href={`/tx/${data.hash}`}
                      customStyle="text-base font-semibold tracking-[0.032em]"
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </GradientCardContainer>
    </Container>
  );
}
