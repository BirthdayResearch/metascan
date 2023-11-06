import clsx from "clsx";
import NumericFormat from "@components/commons/NumericFormat";

export default function DetailRow({
  testId,
  label,
  value,
  decimalScale = 8,
  suffix = "",
}: {
  testId: string;
  label: string;
  value: string;
  decimalScale?: number;
  suffix?: string;
}): JSX.Element {
  const style = {
    container: "flex gap-5 py-3 md:gap-0",
    labelWidth: "w-1/2 md:shrink-0 lg:w-1/3",
    valueWidth: "flex-1 text-right md:text-left",
  };

  return (
    <div className={clsx(style.container)}>
      <div
        data-testid={`${testId}-label`}
        className={clsx("text-white-700", style.labelWidth)}
      >
        {label}
      </div>
      <div
        data-testid={testId}
        className={clsx("text-white-50", style.valueWidth)}
      >
        <NumericFormat
          thousandSeparator
          value={value}
          decimalScale={decimalScale}
          suffix={suffix}
        />
      </div>
    </div>
  );
}
