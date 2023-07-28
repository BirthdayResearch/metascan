import { truncateTextFromMiddle } from "shared/textHelper";
import { FiArrowRight } from "react-icons/fi";

import NumericFormat from "@components/commons/NumericFormat";
import LinkText from "@components/commons/LinkText";
import DetailRow from "@components/commons/DetailRow";
import { RawTransactionType, TxTokenTransferProps } from "@api/types";

export default function TokenTransferDetails({
  tokenTransfers,
}: {
  tokenTransfers: TxTokenTransferProps[];
}) {
  const groupedTokenTransfers: { [key: string]: TxTokenTransferProps[] } =
    tokenTransfers.reduce((group, tokenTransfer) => {
      const { type } = tokenTransfer;
      /* eslint-disable no-param-reassign */
      group[type] = group[type] ?? [];
      group[type].push(tokenTransfer);
      return group;
    }, {});
  return (
    <>
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
            key={key}
          >
            <div
              data-testid="token-transfers"
              className="flex flex-col gap-y-4 mb-6"
            >
              {group.map(({ from, to, forToken }) => (
                <div
                  className="flex flex-col md:flex-row flex-wrap justify-end md:justify-start"
                  key={`${from.hash}-${to.hash}`}
                >
                  <div className="flex flex-col items-end md:items-start md:flex-row">
                    <div className="min-w-[94px]">
                      <LinkText
                        customStyle="tracking-[0.01em]"
                        testId="token-transferred-from"
                        label={truncateTextFromMiddle(from.hash, 4)}
                        href={`/address/${from.hash}`}
                      />
                    </div>
                    <FiArrowRight
                      className="text-white-50 rotate-90 md:rotate-0 mr-9 md:mx-2"
                      size={24}
                    />
                    <div className="min-w-[94px]">
                      <LinkText
                        testId="token-transferred-to"
                        label={truncateTextFromMiddle(to.hash, 4)}
                        href={`/address/${to.hash}`}
                      />
                    </div>
                  </div>
                  <div
                    data-testid="for-token-container"
                    className="flex flex-row mt-2 md:mt-0 md:ml-4"
                  >
                    <div className="text-white-900 mr-1">For: </div>
                    <NumericFormat
                      testId="token-transferred-for"
                      className="text-white-50 whitespace-normal tracking-[0.01em]"
                      thousandSeparator
                      value={forToken.value}
                      decimalScale={8}
                    />
                    <div className="ml-1">
                      <LinkText
                        testId="token-transferred-for-symbol"
                        label={forToken.symbol}
                        href={`/token/${forToken.address}`}
                      />
                    </div>
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
