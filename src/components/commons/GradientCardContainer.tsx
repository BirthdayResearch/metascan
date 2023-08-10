import clsx from "clsx";
import React from "react";

interface GradientCardProps {
  children?: JSX.Element;
  className?: string;
  fullBorder?: boolean;
}

function GradientCardContainer({
  children,
  className,
  fullBorder,
}: GradientCardProps) {
  return (
    <div
      className={clsx(
        "rounded-lg w-full h-full p-[0.5px] white-gradient-1 black-gradient-1-shadow backdrop-blur-[6px]",
        className
      )}
    >
      <div
        className={clsx(
          "bg-black-900 black-gradient-1 rounded-lg w-full h-full",
          { "border-[0.5px] border-white-50 border-opacity-[0.15]": fullBorder }
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default GradientCardContainer;
