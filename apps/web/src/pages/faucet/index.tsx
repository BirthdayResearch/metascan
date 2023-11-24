import Container from "@components/commons/Container";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import Button from "@components/commons/Button";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useEffect, useState } from "react";
import { useNetwork } from "@contexts/NetworkContext";
import { NetworkConnection } from "@contexts/Environment";
import { useRouter } from "next/router";
import FaucetApi, { FaucetTransactionResponse } from "@api/FaucetApi";
import { RiLoader2Fill } from "react-icons/ri";
import SectionTitle from "../../layouts/components/SectionTitle";
import WalletAddressTextInput from "../../layouts/components/WalletAddressTextInput";
import SectionDesc from "../../layouts/components/SectionDesc";

function Loader() {
  return (
    <section className="flex items-center justify-center animate-spin h-[24px]">
      <RiLoader2Fill
        className="text-white-50"
        data-testid="spinner"
        size={24}
      />
    </section>
  );
}
// hide this page if not on testnet
export default function Faucet() {
  const { connection } = useNetwork();
  const router = useRouter();
  const recaptcha = React.useRef<ReCAPTCHA>(null);

  const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false);
  const [validEvmAddress, setValidEvmAddress] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<FaucetTransactionResponse>();
  function onCaptchaChange() {
    if (recaptcha.current !== null) {
      setIsCaptchaSuccess(true);
    }
  }

  async function handleSendFunds(recaptchaVal: string) {
    try {
      setIsLoading(true);
      const res = await FaucetApi.sendFundsToUser(
        connection,
        recaptchaVal,
        walletAddress,
      );
      setData(res);
    } catch (error) {
      setData(undefined);
    } finally {
      setIsLoading(false);
      setIsCaptchaSuccess(false);
    }
  }

  useEffect(() => {
    if (connection !== NetworkConnection.TestNet) {
      router.push(`/404?network=${connection}`);
    }
  }, [connection]);

  return (
    <Container className="px-1 md:px-0 mt-12">
      <SectionTitle title="DeFiChain Testnet Faucet" />
      <h1 className="text-center mb-6 font-bold text-2xl text-white-50">
        This faucet gives 100 testnet DFI per request
      </h1>
      <GradientCardContainer>
        <section>
          <div data-testid="blocks-list" className="p-5 md:p-10">
            <div className="flex flex-col py-6 md:py-4 items-start relative">
              <h1 className="font-bold text-2xl text-white-50">
                Testnet DFI Address
              </h1>
              <SectionDesc
                title="Enter a Testnet DFI address to receive funds."
                customStyle="mt-0"
              />
            </div>
            <div className="space-y-4">
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
                className="flex justify-center"
              />
              <div className="flex justify-center">
                <Button
                  testId="send_tokens_btn"
                  label="Send Testnet DFI"
                  customStyle="font-medium text-sm md:text-base !py-2 !px-4 md:!py-3 md:!px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    !isCaptchaSuccessful || !validEvmAddress || isLoading
                  }
                  onClick={() => {
                    if (
                      recaptcha.current !== null &&
                      recaptcha.current.getValue() !== null
                    ) {
                      handleSendFunds(recaptcha.current.getValue()!);
                    }
                  }}
                />
              </div>
            </div>

            {data?.message && <SectionDesc title={data?.message} />}
          </div>
          {isLoading ? (
            <section>
              <Loader />
              <SectionDesc title="Sending funds..." customStyle="!my-0 pb-4" />
            </section>
          ) : (
            data?.hash && (
              <section>
                <SectionDesc
                  title="Your transaction has been sent!"
                  customStyle="mb-0"
                />
                <SectionDesc
                  title="You should receive your DFI shortly."
                  customStyle="!my-0"
                  customTextStyle="font-normal text-xs"
                />
                <SectionDesc title="Transaction Hash" customStyle="mb-0" />
                <SectionDesc
                  title={data.hash}
                  customTextStyle="font-normal text-xs"
                  customStyle="!my-0 pb-4"
                />
              </section>
            )
          )}
        </section>
      </GradientCardContainer>
    </Container>
  );
}
