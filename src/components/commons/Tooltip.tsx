import clsx from "clsx";
import React, { useState } from "react";
import BottomModal from "./BottomModal";

interface TooltipProps {
  title: string;
  text: string;
  children?: JSX.Element;
  active?: boolean;
}

export default function Tooltip({
  title,
  text,
  children,
  active = true,
}: TooltipProps) {
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  return (
    <>
      {/* Web */}
      <div className="hidden lg:block group relative cursor-pointer">
        <div
          className={clsx(
            "rounded bg-white-50 text-xs text-black-900 -tracking-[0.12px] pointer-events-none",
            "absolute left-5 -translate-x-1/2 -translate-y-[112%] opacity-0 group-hover:opacity-100 transition",
            "before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black before:content-['']",
            { hidden: !active }
          )}
        >
          <div className="bg-white-50 h-2 w-2 absolute rotate-45 -bottom-1 left-[46%]" />
          <div className="max-w-[235px] w-max px-3 py-2">{text}</div>
        </div>
        {children}
      </div>

      {/* Tabley & Mobile */}
      <div
        className="lg:hidden relative"
        role="button"
        aria-label="tooltip-button"
        onKeyDown={() => {}}
        onClick={() => setIsMobileModalOpen(true)}
        tabIndex={0}
      >
        <BottomModal
          title={title}
          isOpen={isMobileModalOpen}
          onClose={() => setIsMobileModalOpen(false)}
        >
          <div className="mt-5 mb-16 text-dark-700">
            <span>{text}</span>
          </div>
        </BottomModal>
        {children}
      </div>
    </>
  );
}
