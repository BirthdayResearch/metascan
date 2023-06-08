import Tooltip from "@components/commons/Tooltip";
import { InfoIcon } from "@components/icons/InfoIcon";

export default function DetailRow({
  label,
  tooltip,
  children,
}: {
  label: string;
  tooltip: string;
  children: any;
}) {
  const testId = label.replaceAll(" ", "");
  return (
    <div className="flex items-start gap-8 justify-between md:justify-normal">
      <div className="flex flex-row items-center md:w-[212px]">
        <div
          data-testid={`${testId}-title`}
          className="text-white-700 tracking-[0.01em]"
        >
          {label}
        </div>
        <Tooltip text={tooltip}>
          <InfoIcon data-testid={`${testId}-icon`} className="ml-1 md:ml-2" />
        </Tooltip>
      </div>
      {children}
    </div>
  );
}
