import React, { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import LinkText from "@components/commons/LinkText";
import { GreenTickIcon } from "@components/icons/GreenTickIcon";
import { MdOutlineQrCode } from "react-icons/md";
import { truncateTextFromMiddle } from "shared/textHelper";
import { sleep } from "shared/sleep";
import { FiCopy } from "react-icons/fi";

interface QrClickProps {
  setIsQrCodeClicked: Dispatch<SetStateAction<boolean>>;
}

export function WalletAddressDetails({ setIsQrCodeClicked }: QrClickProps) {
  const [isWalletAddressCopied, setIsWalletAddressCopied] = useState(false);
  const router = useRouter();
  const aid = router.query.aid?.toString()!;

  const onCopyAddressIconClick = async (
    onTextClick: Dispatch<SetStateAction<boolean>>,
    address: string
  ) => {
    onTextClick(true);
    navigator.clipboard.writeText(address);
    await sleep(2000);
    onTextClick(false);
  };

  return (
    <div>
      {isWalletAddressCopied ? (
        <div className="flex flex-row gap-x-2.5 items-center">
          <LinkText
            testId="wallet-address-copied"
            label="Copied"
            href={`/address/${aid}`}
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
        <div className="flex flex-row gap-x-2.5 items-center">
          <LinkText
            testId="wallet-address"
            label={truncateTextFromMiddle(aid, 11)}
            href={`/address/${aid}`}
            customStyle="tracking-[0.01em]"
          />
          <FiCopy
            role="button"
            data-testid="wallet-address-copy-icon"
            onClick={() =>
              onCopyAddressIconClick(setIsWalletAddressCopied, aid)
            }
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
