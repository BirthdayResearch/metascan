import React from "react";

interface GradientCardProps {
  children?: JSX.Element;
}

function GradientCardContainer({ children }: GradientCardProps) {
  return (
    <div className="rounded-lg w-full h-full p-[0.5px] white-gradient-1 black-gradient-1-shadow backdrop-blur-[6px]">
      <div className="bg-black-900 black-gradient-1 rounded-lg w-full h-full">
        {children}
      </div>
    </div>
  );
}

export default GradientCardContainer;
