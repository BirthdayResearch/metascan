import BigNumber from "bignumber.js";
import clsx from "clsx";
import NumericFormat from "@components/commons/NumericFormat";

export default function GasUsedRow({
  label,
  gasUsed,
  gasPercentage,
}: {
  label: string;
  gasUsed: string;
  gasPercentage: string;
}): JSX.Element {
  const style = {
    container: "flex gap-5 py-3 md:gap-0",
    labelWidth: "w-1/2 md:shrink-0 lg:w-1/3",
    valueWidth: "flex-1 text-right md:text-left",
  };

  return (
    <div className={clsx(style.container)}>
      <div
        data-testid="gas-used-label"
        className={clsx("text-white-700", style.labelWidth)}
      >
        {label}
      </div>
      <div className={clsx(style.valueWidth)}>
        <div data-testid="gas-used" className="text-white-50">
          <NumericFormat
            thousandSeparator
            value={new BigNumber(gasUsed)}
            decimalScale={0}
          />
        </div>
        <div data-testid="gas-pct" className="text-white-700 text-xs pt-1">
          {gasPercentage}%
        </div>
      </div>
    </div>
  );
}
