import useWindowDimensions from "hooks/useWindowDimensions";
import { truncateTextFromMiddle } from "shared/textHelper";

import NumericFormat from "@components/commons/NumericFormat";
import LinkText from "@components/commons/LinkText";
import DetailRow from "@components/commons/DetailRow";
import clsx from "clsx";
import BoldedTitle from "./BoldedTitle";
import WithCopy from "./WithCopy";

interface TokenTransferProps {
  fromHash: string;
  toHash: string;
  forToken: {
    from: string;
    to: string;
    value: string;
    address: string;
    type: string;
  };
}

export default function TokenTransferDetails({
  displayTitle,
  tokenTransfers,
}: {
  displayTitle: string;
  tokenTransfers: TokenTransferProps[];
}) {
  const windowDimension = useWindowDimensions().width;
  const rowValueFont = "text-white-50 whitespace-normal tracking-[0.01em]";

  return (
    <>
      <div
        className={clsx(
          "border-b border-black-600",
          "mt-9 mb-6",
          "md:mt-[58px] md:mb-9",
          "lg:mt-[38px] lg:mb-11"
        )}
      />
      <div className="my-6 lg:col-start-4 col-start-3 row-start-1 col-span-2">
        <BoldedTitle title={displayTitle} testId="token-transferred-title" />
      </div>

      {tokenTransfers.map(({ fromHash, toHash, forToken }) => (
        <div className="flex flex-col gap-y-4 mt-[22px] md:mt-[30px]">
          <DetailRow label="From" tooltip="From">
            <div className="lg:col-span-2 lg:col-start-5 col-start-4 row-start-2 ">
              <WithCopy
                textToCopy={fromHash}
                testId="token-from"
                copyIconStyle="mb-1"
              >
                <LinkText
                  customStyle="tracking-[0.01em]"
                  testId="token-transferred-from"
                  label={truncateTextFromMiddle(
                    fromHash,
                    windowDimension <= 1280 ? 4 : 11
                  )}
                  href={`/address/${fromHash}`}
                />
              </WithCopy>
            </div>
          </DetailRow>
          <DetailRow label="To" tooltip="To">
            <div className="lg:col-start-5 col-start-4 row-start-3 lg:col-span-2">
              <WithCopy
                textToCopy={toHash}
                testId="token-to"
                copyIconStyle="mb-1"
              >
                <LinkText
                  testId="token-transferred-to"
                  label={truncateTextFromMiddle(
                    toHash,
                    windowDimension <= 1280 ? 4 : 11
                  )}
                  href={`/address/${toHash}`}
                />
              </WithCopy>
            </div>
          </DetailRow>
          <DetailRow label="For" tooltip="Fo">
            <div className="lg:col-start-5 col-start-4 row-start-4 col-span-2">
              <NumericFormat
                data-testid="token-transferred-for"
                className={rowValueFont}
                thousandSeparator
                value={forToken.value}
                decimalScale={8}
                // TODO: Display symbol of the token here
              />
            </div>
          </DetailRow>
        </div>
      ))}
    </>
  );
}
