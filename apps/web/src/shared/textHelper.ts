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

export function isAlphanumeric(input: string, ignore?: string): boolean {
  const re = /^[0-9A-Z]+$/i;

  let str = input;

  if (ignore !== undefined) {
    str = input.replace(
      new RegExp(
        "[".concat(ignore.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "]"),
        "g"
      ),
      ""
    );
  }

  return re.test(str);
}

export function isNumeric(input: string): boolean {
  const re = /^[0-9]+$/;

  return re.test(input);
}

export function hexToUtf8(hexValue: string): string {
  const hexWithoutPrefix = hexValue.slice(2);
  const utf8String = Buffer.from(hexWithoutPrefix, "hex").toString("utf-8");
  return utf8String.replace(/\0/g, ""); // removes NULL (ASCII value 0)
}
