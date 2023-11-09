import Container from "@components/commons/Container";
import GradientCardContainer from "@components/commons/GradientCardContainer";
import Button from "@components/commons/Button";
import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useState } from "react";
import { useNetwork } from "@contexts/NetworkContext";
import { NetworkConnection } from "@contexts/Environment";
import { useRouter } from "next/router";
import SectionTitle from "../../layouts/components/SectionTitle";
import WalletAddressTextInput from "../../layouts/components/WalletAddressTextInput";
import FaucetApi from "@api/FaucetApi";
import {useQuery} from "@tanstack/react-query";

// hide this page if not on testnet
export default function Faucet() {
  const { connection } = useNetwork();
  const router = useRouter();

  const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false);
  const [validEvmAddress, setValidEvmAddress] = useState<boolean>(false);

  const [isSendFundSuccessful, setIsSendFundSuccessful] = useState(false)

  const { data: faucetRes, isLoading, error, refetch } = useQuery({
    queryKey: ["sendFunds"],
    queryFn: async () => {
      // retrieve content type by fetching the url
      const request = await FaucetApi.sendFundsToUser(NetworkConnection.TestNet, "0xFB9DCeCBb49fA49cc2692A6A4A160fd6071b85b2" );

      return "pass"
    },
    initialData: null,
  });

  function onCaptchaChange() {
    setIsCaptchaSuccess(true);
  }
  async function handleSendFunds() {
    try{
      const res = await FaucetApi.sendFundsToUser(NetworkConnection.TestNet, "0xFB9DCeCBb49fA49cc2692A6A4A160fd6071b85b2" );
      if (!res) {
        setIsSendFundSuccessful(false)
      }
      setIsSendFundSuccessful(true)
      return "success"
    } catch (e) {
    return "FAIL";
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
            validEvmAddress={validEvmAddress}
            setValidEvmAddress={setValidEvmAddress}
          />
          <div className="py-6 flex gap-x-4 flex-row justify-end">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              onChange={() => onCaptchaChange()}
              className="text-center items-center"
            />
            <Button
              testId="send_tokens_btn"
              label={isSendFundSuccessful? "Transfer Success" : "Send Tokens"}
              customStyle="font-medium text-sm md:text-base !py-2 !px-4 md:!py-3 md:!px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isCaptchaSuccessful || !validEvmAddress}
              onClick={() => {handleSendFunds()}}
            />
          </div>
        </div>
      </GradientCardContainer>
    </Container>
  );
}
