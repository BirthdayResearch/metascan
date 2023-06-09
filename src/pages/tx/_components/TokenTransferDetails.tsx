import { truncateTextFromMiddle } from "shared/textHelper";
import { FiArrowRight } from "react-icons/fi";

import NumericFormat from "@components/commons/NumericFormat";
import LinkText from "@components/commons/LinkText";
import DetailRow from "@components/commons/DetailRow";
import { RawTransactionType, TokenTransferProps } from "@api/types";

export default function TokenTransferDetails({
  tokenTransfers,
}: {
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
            <div className="flex flex-col gap-y-4 mb-6">
              {group.map(({ from, to, forToken }) => (
                <div
                  className="flex flex-row flex-wrap justify-end md:justify-start"
                  key={`${from.hash}-${to.hash}`}
                >
                  <div className="flex flex-row">
                    <div className="min-w-[94px]">
                      <LinkText
                        customStyle="tracking-[0.01em]"
                        testId="token-transferred-from"
                        label={truncateTextFromMiddle(from.hash, 4)}
                        href={
                          from.isContract
                            ? `/address/${from.hash}` // TODO: Update to /contract
                            : `/address/${from.hash}`
                        }
                      />
                    </div>
                    <FiArrowRight className="text-white-50 mx-2" size={24} />
                    <div className="min-w-[94px]">
                      <LinkText
                        testId="token-transferred-to"
                        label={truncateTextFromMiddle(to.hash, 4)}
                        href={
                          to.isContract
                            ? `/address/${to.hash}` // TODO: Update to /contract
                            : `/address/${to.hash}`
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-row ml-4">
                    <div className="text-white-900 mr-1">For: </div>
                    <NumericFormat
                      data-testid="token-transferred-for"
                      className="text-white-50 whitespace-normal tracking-[0.01em]"
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
