import clsx from "clsx";
import { FiInfo } from "react-icons/fi";
import Tooltip from "@components/commons/Tooltip";

interface DetailRowTitleProps {
  title: string;
  tooltip?: string;
  className?: string;
}

export default function DetailRowTitle({
  title,
  tooltip,
  className,
}: DetailRowTitleProps) {
  return (
    <div className={clsx("flex items-center text-white-700", className)}>
      <span>{title}</span>
      {tooltip && (
        <Tooltip text={tooltip}>
          <FiInfo size={16} className="ml-1 md:ml-2" />
        </Tooltip>
      )}
    </div>
  );
}
