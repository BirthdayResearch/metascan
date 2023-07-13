import clsx from "clsx";
import React from "react";

interface DetailRowTitleProps {
  title: string;
  className?: string;
}

export default function DetailRowTitle({
  title,
  className,
}: DetailRowTitleProps) {
  return (
    <div
      className={clsx(
        "text-white-700 tracking-[0.01em] leading-[22.4px]",
        className
      )}
    >
      {title}
    </div>
  );
}
