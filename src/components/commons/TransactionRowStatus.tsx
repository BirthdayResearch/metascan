import clsx from "clsx";
import { TransactionStatus } from "@api/types";
import { ConfirmCheck } from "@components/icons/ConfirmCheck";
import { RejectedCross } from "@components/icons/RejectedCross";

export default function TransactionRowStatus({
  status,
}: {
  status: TransactionStatus;
}) {
  const statusMap = {
    [TransactionStatus.Success]: {
      icon: ConfirmCheck,
      color: "text-green-800",
    },
    [TransactionStatus.Failed]: { icon: RejectedCross, color: "text-red-800" },
    [TransactionStatus.Pending]: {
      icon: RejectedCross,
      color: "text-white-50",
    },
  };
  const Icon = statusMap[status].icon;
  const textColor = statusMap[status].color;
  return (
    <div className={clsx("flex items-center", textColor)}>
      <div
        data-testid="transaction-status"
        className={clsx(
          "-tracking-[0.01em] ",
          "md:text-base md:font-semibold md:-tracking-[0.02em]"
        )}
      >
        {status}
      </div>
      <Icon size={20} className=" ml-1" />
    </div>
  );
}
