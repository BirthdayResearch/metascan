import clsx from "clsx";
import React from "react";

interface VerifiedContractSubtitleProps {
  title: string;
  className?: string;
}

export default function VerifiedContractSubtitle({
  title,
  className,
}: VerifiedContractSubtitleProps) {
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
