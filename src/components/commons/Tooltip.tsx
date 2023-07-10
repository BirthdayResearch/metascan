import clsx from "clsx";
import React from "react";

interface TooltipProps {
  text: string;
  children?: JSX.Element;
  active?: boolean;
}

export default function Tooltip({
  text,
  children,
  active = true,
}: TooltipProps) {
  return (
    <div className="group relative cursor-pointer">
      <div
        className={clsx(
          "font-semibold pointer-events-none absolute -top-10 left-5 -translate-x-1/2 whitespace-nowrap rounded bg-dark-200 text-xs text-white-50 px-4 py-2 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black before:content-[''] group-hover:opacity-100",
          { hidden: !active }
        )}
      >
        <div className="h-2 w-2 absolute rotate-45 -bottom-1 left-[46%] bg-dark-200" />
        {text}
      </div>
      {children}
    </div>
  );
}
