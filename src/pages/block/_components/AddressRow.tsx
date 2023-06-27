import clsx from "clsx";
import { useEffect, useState } from "react";
import { FiCopy } from "react-icons/fi";
import { MdCheckCircle } from "react-icons/md";
import useCopyToClipboard from "@hooks/useCopyToClipboard";
import LinkText from "@components/commons/LinkText";
import { truncateTextFromMiddle } from "shared/textHelper";

export default function AddressRow({
  label,
  address,
  testId,
  disableLink,
}: {
  label: string;
  address: string;
  testId: string;
  disableLink?: boolean;
}): JSX.Element {
  const { copy } = useCopyToClipboard();
  const [showSuccessCopy, setShowSuccessCopy] = useState(false);

  useEffect(() => {
    if (showSuccessCopy) {
      setTimeout(() => setShowSuccessCopy(false), 3000);
    }
  }, [showSuccessCopy]);

  const style = {
    container: "flex gap-5 py-3 md:gap-0",
    labelWidth: "w-1/2 md:shrink-0 lg:w-1/3",
    valueWidth: "flex-1 text-right md:text-left",
  };

  return (
    <div className={clsx("justify-between md:justify-start", style.container)}>
      <div
        data-testid={`${testId}-label`}
        className={clsx("text-white-700", style.labelWidth)}
      >
        {label}
      </div>
      {showSuccessCopy ? (
        <div data-testid="copy-success-msg" className="flex items-center">
          <span className="text-lightBlue">Copied!</span>
          <MdCheckCircle size={20} className="ml-2 text-green-800" />
        </div>
      ) : (
        <div className="flex">
          <LinkText
            testId={`${testId}-mobile`}
            href={`/address/${address}`}
            label={truncateTextFromMiddle(address, 4)}
            customStyle={clsx("inline-flex xl:hidden", style.valueWidth, {
              "text-white-50 pointer-events-none": disableLink,
            })}
          />
          <LinkText
            testId={`${testId}-desktop`}
            href={`/address/${address}`}
            label={truncateTextFromMiddle(address, 13)}
            customStyle={clsx("hidden xl:inline-flex", style.valueWidth, {
              "text-white-50 pointer-events-none": disableLink,
            })}
          />
          <FiCopy
            size={20}
            className="ml-2 self-center cursor-pointer"
            onClick={() => {
              copy(address);
              setShowSuccessCopy(true);
            }}
          />
        </div>
      )}
    </div>
  );
}
