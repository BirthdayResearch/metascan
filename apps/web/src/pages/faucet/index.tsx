import Container from "@components/commons/Container";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import Button from "@components/commons/Button";
import ReCAPTCHA from "react-google-recaptcha";
import React, { useEffect, useState } from "react";
import { useNetwork } from "@contexts/NetworkContext";
import { NetworkConnection } from "@contexts/Environment";
import { useRouter } from "next/router";
import FaucetApi, { FaucetTransactionResponse } from "@api/FaucetApi";
import { FadeLoader } from "react-spinners";
import SectionTitle from "../../layouts/components/SectionTitle";
import WalletAddressTextInput from "../../layouts/components/WalletAddressTextInput";

import SectionDesc from "../../layouts/components/SectionDesc";


function Loader() {
  return (
      <section className="flex items-center justify-center h-[20px] mt-8 ml-4">
        <FadeLoader
            loading
            color="#FFFFFF"
            aria-label="spinner"
            data-testid="spinner"
            height={9}
            width={3.5}
            margin={-8}
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
const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<FaucetTransactionResponse>();
  function onCaptchaChange() {
    if (recaptcha.current !== null) {
      setIsCaptchaSuccess(true);
    }
  }

  async function handleSendFunds(recaptchaVal: string) {
    try {
      setIsLoading(true)
      const res = await FaucetApi.sendFundsToUser(
        connection,
        recaptchaVal,
        walletAddress,
      );
      setData(res);
    } catch (error) {
      setData(undefined);
    }finally {
    setIsLoading(false)
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
      <SectionTitle title="Testnet Faucet" />
      <GradientCardContainer>
        <div data-testid="blocks-list" className="p-5 md:p-10">
          <div className="flex flex-col md:flex-row py-6 md:py-4 justify-between md:items-center relative">
            <h1 className="font-bold text-2xl text-white-50">Wallet Address</h1>
          </div>
          <WalletAddressTextInput
            walletAddress={walletAddress}
            setWalletAddress={setWalletAddress}
            validEvmAddress={validEvmAddress}
            setValidEvmAddress={setValidEvmAddress}
          />
          <div className="py-6 flex gap-x-4 flex-row justify-end">
            <ReCAPTCHA
              ref={recaptcha}
              sitekey={process.env.NEXT_PUBLIC_SITE_KEY || ""}
              onChange={() => onCaptchaChange()}
              className="text-center items-center"
            />
            <Button
              testId="send_tokens_btn"
              label="Send Tokens"
              customStyle="font-medium text-sm md:text-base !py-2 !px-4 md:!py-3 md:!px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isCaptchaSuccessful || !validEvmAddress || isLoading}
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
      </GradientCardContainer>
      {
        isLoading ? (
            <section className="">
              <Loader/>
              <SectionDesc title="Sending funds..." />
            </section>
            ) : (data?.hash &&(<section>
            <SectionDesc title="Transaction success!" customStyle="mb-0"/>
          <SectionDesc title="Transaction may take awhile to show up on Meta scan" customStyle="my-0" customTextStyle="font-normal text-xs"/>
          <SectionDesc title={data.hash} customTextStyle="font-normal text-xs" customStyle="my-0"/>
          </section>))

      }
      {data?.message && <SectionDesc title={data?.message} />}
    </Container>
  );
}