import clsx from "clsx";
import { FiInfo } from "react-icons/fi";
import Tooltip from "@components/commons/Tooltip";

interface DetailRowTitleProps {
  title: string;
  tooltip?: string;
  containerClass?: string;
}

export default function DetailRowTitle({
  title,
  tooltip,
  containerClass,
}: DetailRowTitleProps) {
  return (
    <div className={clsx("flex items-center text-white-700", containerClass)}>
      <span>{title}</span>
      {tooltip && (
        <Tooltip text={tooltip}>
          <FiInfo size={16} className="ml-1 md:ml-2" />
        </Tooltip>
      )}
    </div>
  );
}
