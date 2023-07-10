import React, { Dispatch, SetStateAction, useState } from "react";
import LinkText from "@components/commons/LinkText";
import { GreenTickIcon } from "@components/icons/GreenTickIcon";
import { MdOutlineQrCode } from "react-icons/md";
import { truncateTextFromMiddle } from "shared/textHelper";
import { sleep } from "shared/sleep";
import { FiCopy } from "react-icons/fi";

interface QrClickProps {
  address: string;
  setIsQrCodeClicked: Dispatch<SetStateAction<boolean>>;
  truncateTextLength?: number;
}

export default function AddressWithQrCode({
  address,
  setIsQrCodeClicked,
  truncateTextLength = 11,
}: QrClickProps) {
  const [isWalletAddressCopied, setIsWalletAddressCopied] = useState(false);

  const onCopyAddressIconClick = async () => {
    setIsWalletAddressCopied(true);
    navigator.clipboard.writeText(address);
    await sleep(2000);
    setIsWalletAddressCopied(false);
  };

  return (
    <div>
      {isWalletAddressCopied ? (
        <div className="flex flex-row gap-x-2.5 items-center">
          <LinkText
            testId="wallet-address-copied"
            label="Copied"
            href={`/address/${address}`}
            customStyle="tracking-[0.01em]"
          />
          <GreenTickIcon data-testid="wallet-address-copied-green-tick-icon" />
          <MdOutlineQrCode
            role="button"
            onClick={() => setIsQrCodeClicked(true)}
            className="text-white-50"
          />
        </div>
      ) : (
        <div className="flex flex-row gap-x-2.5 items-center flex-wrap">
          <LinkText
            testId="wallet-address"
            label={truncateTextFromMiddle(address, truncateTextLength)}
            href={`/address/${address}`}
            customStyle="tracking-[0.01em]"
          />
          <FiCopy
            role="button"
            data-testid="wallet-address-copy-icon"
            onClick={() => onCopyAddressIconClick()}
            className="text-white-50"
          />
          <MdOutlineQrCode
            data-testid="wallet-address-qr-icon"
            role="button"
            onClick={() => setIsQrCodeClicked(true)}
            className="text-white-50"
          />
        </div>
      )}
    </div>
  );
}
