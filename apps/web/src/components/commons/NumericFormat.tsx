import BigNumber from "bignumber.js";

interface NumericFormatProps extends BigNumber.Format {
  value: string | number | BigNumber;
  className?: string;
  thousandSeparator?: boolean;
  decimalScale?: number;
  testId?: string;
}

export default function NumericFormat({
  value,
  className,
  prefix = "",
  suffix = "",
  thousandSeparator,
  decimalScale = 8,
  testId = "",
}: NumericFormatProps): JSX.Element {
  const fmt: BigNumber.Format = {
    prefix,
    suffix,
    decimalSeparator: ".",
    groupSeparator: thousandSeparator ? "," : "",
    groupSize: thousandSeparator ? 3 : 0,
  };
  return (
    <span data-testid={testId} className={className}>
      {new BigNumber(value).toFormat(decimalScale, fmt)}
    </span>
  );
}
