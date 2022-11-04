import BigNumber from "bignumber.js";

export function useUnitSuffix(
  units: Record<number, string>,
  value: string
): string {
  const updatedValue = new BigNumber(value);
  const places = updatedValue.e !== null ? Math.floor(updatedValue.e / 3) : 0;
  const suffix = `${units[places * 3] ?? ""}`;

  return updatedValue.dividedBy(1000 ** places).toFormat(2, {
    decimalSeparator: ".",
    suffix,
  });
}
