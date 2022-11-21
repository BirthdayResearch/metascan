import clsx from "clsx";
import React from "react";

interface TokenTableTitle {
  title: string;
  className?: string;
}

export default function AddressTokenTableTitle({
  title,
  className,
}: TokenTableTitle) {
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
