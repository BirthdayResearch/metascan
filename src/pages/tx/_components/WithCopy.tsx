import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { FiCopy } from "react-icons/fi";
import { GreenTickIcon } from "@components/icons/GreenTickIcon";

const COPY_SUCCESS = "Copied!";

export default function WithCopy({
  textToCopy,
  testId,
  children,
}: PropsWithChildren<{
  textToCopy: string;
  testId: string;
}>) {
  const [isCopied, setIsCopied] = useState(false);

  const onCopyAddressIconClick = async (
    onTextClick: Dispatch<SetStateAction<boolean>>,
    address: string
  ) => {
    onTextClick(true);
    navigator.clipboard.writeText(address);
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    onTextClick(false);
  };

  return (
    <div className="inline-block">
      {isCopied ? (
        <div
          data-testid={`${testId}-copied`}
          className="flex flex-row gap-x-2.5 items-center"
        >
          <span className="text-lightBlue tracking-[0.01em] leading-[22.4px]">
            {COPY_SUCCESS}
          </span>
          <GreenTickIcon data-testid={`${testId}-copied-green-tick-icon`} />
        </div>
      ) : (
        <>
          {children}
          <FiCopy
            role="button"
            onClick={() => onCopyAddressIconClick(setIsCopied, textToCopy)}
            className="text-white-50 inline-block ml-2 mb-1"
          />
        </>
      )}
    </div>
  );
}
