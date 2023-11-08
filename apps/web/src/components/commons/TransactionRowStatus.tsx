import clsx from "clsx";
import { TransactionStatus } from "@api/types";
import { CgSpinner } from "react-icons/cg";
import { FiX } from "react-icons/fi";
import { IoMdCheckmarkCircle } from "react-icons/io";

export default function TransactionRowStatus({
  status,
}: {
  status: TransactionStatus;
}) {
  const statusMap = {
    [TransactionStatus.Success]: {
      icon: IoMdCheckmarkCircle,
      color: "text-green-800",
    },
    [TransactionStatus.Failed]: { icon: FiX, color: "text-red-800" },
    [TransactionStatus.Pending]: { icon: CgSpinner, color: "text-orange-700" },
  };
  const Icon = statusMap[status].icon;
  const textColor = statusMap[status].color;
  return (
    <div className={clsx("flex items-center", textColor)}>
      <div
        data-testid="transaction-status"
        className={clsx(
          "-tracking-[0.01em] ",
          "text-xs md:text-base font-semibold md:-tracking-[0.02em]",
        )}
      >
        {status}
      </div>
      <Icon className="ml-1 h-4 w-4 md:h-5 md:w-5" />
    </div>
  );
}
