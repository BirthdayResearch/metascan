import BigNumber from "bignumber.js";

export const truncateTextFromMiddle = (text: string, length = 5): string => {
  if (text.length <= length) {
    return text;
  }
  return `${text.substring(0, length)}...${text.substring(
    text.length - length,
    text.length
  )}`;
};

export const stringToNumber = (value: string): Number =>
  new BigNumber(value.replace(",", "")).toNumber();
