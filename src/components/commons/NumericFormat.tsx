import BigNumber from "bignumber.js";

interface NumericFormatProps extends BigNumber.Format {
  value: string | BigNumber;
  className?: string;
  thousandSeparator?: boolean;
  decimalScale?: number;
}

export default function NumericFormat({
  value,
  className,
  prefix = "",
  suffix = "",
  thousandSeparator,
  decimalScale = 8,
}: NumericFormatProps): JSX.Element {
  const fmt: BigNumber.Format = {
    prefix,
    suffix,
    decimalSeparator: ".",
    groupSeparator: thousandSeparator ? "," : "",
    groupSize: thousandSeparator ? 3 : 0,
  };
  return (
    <span className={className}>
      {new BigNumber(value).toFormat(decimalScale, fmt)}
    </span>
  );
}

export function formatNumberValue({
  value,
  prefix = "",
  suffix = "",
  thousandSeparator = true,
  decimalScale = 0,
}: NumericFormatProps): string {
  const fmt: BigNumber.Format = {
    prefix,
    suffix,
    decimalSeparator: ".",
    groupSeparator: thousandSeparator ? "," : "",
    groupSize: thousandSeparator ? 3 : 0,
  };
  return new BigNumber(value).toFormat(decimalScale, fmt);
}
