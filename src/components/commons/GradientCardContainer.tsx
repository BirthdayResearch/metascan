import clsx from "clsx";
import React from "react";

interface GradientCardProps {
  children?: JSX.Element;
  className?: string;
}

function GradientCardContainer({ children, className }: GradientCardProps) {
  return (
    <div
      className={clsx(
        "rounded-lg w-full h-full p-[0.5px] white-gradient-1 black-gradient-1-shadow backdrop-blur-[6px]",
        className
      )}
    >
      <div className="bg-black-900 black-gradient-1 rounded-lg w-full h-full">
        {children}
      </div>
    </div>
  );
}

export default GradientCardContainer;
