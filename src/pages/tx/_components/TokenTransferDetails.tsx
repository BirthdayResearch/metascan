import { truncateTextFromMiddle } from "shared/textHelper";
import { FiArrowRight } from "react-icons/fi";

import NumericFormat from "@components/commons/NumericFormat";
import LinkText from "@components/commons/LinkText";
import DetailRow from "@components/commons/DetailRow";
import clsx from "clsx";
import { RawTransactionType, TokenTransferProps } from "@api/types";
import BoldedTitle from "./BoldedTitle";

export default function TokenTransferDetails({
  displayTitle,
  tokenTransfers,
}: {
  displayTitle: string;
  tokenTransfers: TokenTransferProps[];
}) {
  const groupedTokenTransfers: { [key: string]: TokenTransferProps[] } =
    tokenTransfers.reduce((group, tokenTransfer) => {
      const { type } = tokenTransfer;
      /* eslint-disable no-param-reassign */
      group[type] = group[type] ?? [];
      group[type].push(tokenTransfer);
      return group;
    }, {});
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

      {Object.keys(groupedTokenTransfers).map((key) => {
        const group = groupedTokenTransfers[key];
        const transferTypeMapping = {
          [RawTransactionType.TokenTransfer]: "Tokens transferred",
          [RawTransactionType.TokenMinting]: "Tokens minted",
          [RawTransactionType.TokenBurning]: "Tokens burned",
        };
        return (
          <DetailRow
            label={
              transferTypeMapping[key] ??
              transferTypeMapping[RawTransactionType.TokenTransfer]
            }
          >
            <div className="flex flex-col gap-y-4 mb-6">
              {group.map(({ from, to, forToken }) => (
                <div className="flex flex-row">
                  <div className="lg:col-span-2 lg:col-start-5 col-start-4 row-start-2">
                    {from.isContract ? (
                      <div className="text-white-50">
                        {truncateTextFromMiddle(from.hash, 4)}
                      </div>
                    ) : (
                      <LinkText
                        customStyle="tracking-[0.01em]"
                        testId="token-transferred-from"
                        label={truncateTextFromMiddle(from.hash, 4)}
                        href={`/address/${from.hash}`}
                      />
                    )}
                  </div>
                  <FiArrowRight className="text-white-50 mx-2" size={24} />
                  <div className="lg:col-start-5 col-start-4 row-start-3 lg:col-span-2">
                    {to.isContract ? (
                      <div className="text-white-50">
                        {truncateTextFromMiddle(to.hash, 4)}
                      </div>
                    ) : (
                      <LinkText
                        testId="token-transferred-to"
                        label={truncateTextFromMiddle(to.hash, 4)}
                        href={`/address/${to.hash}`}
                      />
                    )}
                  </div>
                  <div className="flex flex-row lg:col-start-5 col-start-4 row-start-4 col-span-2 ml-4">
                    <div className="text-white-900 mr-1">For: </div>
                    <NumericFormat
                      data-testid="token-transferred-for"
                      className={rowValueFont}
                      thousandSeparator
                      value={forToken.value}
                      decimalScale={8}
                      suffix={` ${forToken.symbol}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </DetailRow>
        );
      })}
    </>
  );
}
