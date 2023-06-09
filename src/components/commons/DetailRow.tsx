import Tooltip from "@components/commons/Tooltip";
import { InfoIcon } from "@components/icons/InfoIcon";
import clsx from "clsx";

export default function DetailRow({
  label,
  tooltip,
  children,
  className,
}: {
  label: string;
  tooltip?: string;
  children: any;
  className?: string;
}) {
  const testId = label.replaceAll(" ", "");
  return (
    <div
      className={clsx(
        "flex items-start gap-8 justify-between md:justify-normal",
        className
      )}
    >
      <div className="flex flex-row items-center md:w-[212px]">
        <div
          data-testid={`${testId}-title`}
          className="text-white-700 tracking-[0.01em]"
        >
          {label}
        </div>
        {tooltip && (
          <Tooltip text={tooltip}>
            <InfoIcon data-testid={`${testId}-icon`} className="ml-1 md:ml-2" />
          </Tooltip>
        )}
      </div>
      {children}
    </div>
  );
}
