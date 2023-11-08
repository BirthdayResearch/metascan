import BigNumber from "bignumber.js";

const units = {
  3: "K",
  6: "M",
  9: "B",
  12: "T",
};

export function useUnitSuffix(value: string): string {
  const updatedValue = new BigNumber(value);
  const places = updatedValue.e !== null ? Math.floor(updatedValue.e / 3) : 0;
  const suffix = `${units[places * 3] ?? ""}`;

  if (suffix) {
    return updatedValue.dividedBy(1000 ** places).toFormat(2, {
      decimalSeparator: ".",
      suffix,
    });
  }
  return value;
}
