import React from "react";

interface GradientCardProps {
  children?: JSX.Element;
}

function GradientCardContainer({ children }: GradientCardProps) {
  return (
    <div className="rounded-[15px] w-full h-full p-[0.5px] white-gradient-1 drop-shadow-[0_5px_20px_rgba(0,0,0,0.2)]">
      <div className="bg-black-900 black-gradient-1 rounded-[15px] w-full h-full">
        {children}
      </div>
    </div>
  );
}

export default GradientCardContainer;
