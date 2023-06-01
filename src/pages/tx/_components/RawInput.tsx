import clsx from "clsx";
import { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

import BoldedTitle from "./BoldedTitle";

export default function RawInput({ hex }: { hex: string }) {
  const [isRawInputExpanded, setIsRawInputExpanded] = useState(false);
  const onRawInputClick = () => {
    setIsRawInputExpanded(!isRawInputExpanded);
  };

  return (
    <div>
      <BoldedTitle
        className="lg:pt-14 md:pt-14 pt-16 pb-6"
        testId="transaction-raw-input-title"
        title="Raw input"
      />
      <div
        className={clsx("flex flex-row items-center lg:mb-[14px] mb-3", {
          "mb-3": isRawInputExpanded,
        })}
      >
        <div
          data-testid="transaction-hex-title"
          role="button"
          tabIndex={0}
          onKeyDown={onRawInputClick}
          onClick={onRawInputClick}
          className="text-white-50 pr-[10.29px]"
        >
          Hex (Default)
        </div>
        <div
          data-testid="transaction-hex-icon"
          role="button"
          tabIndex={0}
          onKeyDown={onRawInputClick}
          onClick={onRawInputClick}
        >
          <div className="grid ">
            <FiChevronDown
              size={24}
              className={clsx(
                "col-start-1 row-start-1 text-white-700",
                isRawInputExpanded
                  ? "transition-opacity duration-300 ease-out opacity-0"
                  : "opacity-100"
              )}
            />
            <FiChevronUp
              size={24}
              className={clsx(
                "col-start-1 row-start-1 text-white-700",
                isRawInputExpanded
                  ? "opacity-100"
                  : "transition-opacity duration-300 ease-out opacity-0"
              )}
            />
          </div>
        </div>
      </div>
      {isRawInputExpanded && (
        <div
          data-testid="transaction-hex"
          className={clsx(
            "transition-opacity rounded-lg font-space-mono tracking-[-0.04em] break-all bg-black-800 lg:py-6 md:py-5 py-4 lg:px-10 md:px-8 px-4 border-[1px] border-black-600 text-white-50 text-xs"
          )}
        >
          {hex}
        </div>
      )}
    </div>
  );
}
