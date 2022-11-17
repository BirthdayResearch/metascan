import React from "react";

interface TooltipProps {
  text: string;
  children?: JSX.Element;
}

export default function Tooltip({ text, children }: TooltipProps) {
  return (
    <div className="group relative">
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-white-700 px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black before:content-[''] group-hover:opacity-100">
        {text}
      </div>
      {children}
    </div>
  );
}
