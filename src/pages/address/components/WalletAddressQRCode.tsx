import GradientCardContainer from "@components/commons/GradientCardContainer";
import LinkText from "@components/commons/LinkText";
import { GreenTickIcon } from "@components/icons/GreenTickIcon";
import { Dispatch, SetStateAction, useState } from "react";
import { FiCopy } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import QRCode from "react-qr-code";
import { truncateTextFromMiddle } from "shared/textHelper";

interface QrCodeProps {
  address: string;
  onCloseClick: Dispatch<SetStateAction<boolean>>;
}

export default function WalletAddressQRCode({
  address,
  onCloseClick,
}: QrCodeProps) {
  const [isWalletAddressCopied, setIsWalletAddressCopied] = useState(false);
  return (
    <div className="fixed backdrop-blur z-20 inset-0 pt-[104px] w-screen h-screen flex flex-col gap-y-[10px] items-center">
      <IoCloseOutline
        data-testid="wallet-qr-close-button"
        role="button"
        onClick={() => {
          onCloseClick(false);
        }}
        size={24}
        className="fixed md:top-[46px] md:right-[46px] top-[38px] right-[38px] text-white-50"
      />
      <GradientCardContainer className="w-[245px] h-[38px]">
        {isWalletAddressCopied ? (
          <div className="flex flex-row gap-x-[9.6px] justify-center items-center py-2 px-[21.5px]">
            <LinkText
              testId="wallet-id-copied"
              label={fixedTitle.copied}
              href={`/address/${address}`}
              customStyle="tracking-[0.01em]"
            />
            <GreenTickIcon data-testid="qr-code-address-copied-green-tick-icon" />
          </div>
        ) : (
          <div className="flex flex-row justify-evenly items-center py-2 px-[21.5px]">
            <LinkText
              testId="wallet-id"
              label={truncateTextFromMiddle(address, 8)}
              href={`/address/${address}`}
              customStyle="tracking-[0.01em]"
            />
            <FiCopy
              data-testid="qr-code-copy-icon"
              role="button"
              onClick={() =>
                onCopyAddressIconClick(setIsWalletAddressCopied, address)
              }
              className="text-white-50"
            />
          </div>
        )}
      </GradientCardContainer>
      <QRCode
        data-testid="wallet-qr-code-image"
        size={245}
        value={`/address/${address}`}
        viewBox="0 0 245 245"
      />
    </div>
  );
}

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const onCopyAddressIconClick = async (
  onTextClick: Dispatch<SetStateAction<boolean>>,
  address: string
) => {
  onTextClick(true);
  navigator.clipboard.writeText(address);
  await sleep(2000);
  onTextClick(false);
};

const fixedTitle = {
  copied: "Copied!",
};
