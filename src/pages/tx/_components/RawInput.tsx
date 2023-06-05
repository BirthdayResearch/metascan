import clsx from "clsx";
import { useState } from "react";

import BoldedTitle from "./BoldedTitle";

export default function RawInput({ hex }: { hex: string }) {
  const [isRawInputExpanded, setIsRawInputExpanded] = useState(false);
  const onRawInputClick = () => {
    setIsRawInputExpanded(!isRawInputExpanded);
  };

  return (
    <div>
      <BoldedTitle
        className="pb-6"
        testId="transaction-raw-input-title"
        title="Raw input"
      />
      <div className="flex flex-row items-center lg:mb-[14px] mb-3">
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
      </div>
      <textarea
        data-testid="transaction-hex"
        rows={3}
        className={clsx(
          "textarea-scrollbar w-full transition-opacity rounded-md font-space-mono tracking-[-0.04em] break-all bg-black-800 border-[1px] border-black-600 text-white-50 text-xs",
          "p-4",
          "lg:px-10"
        )}
        disabled
      >
        {hex}
      </textarea>
      <div
        className={clsx(
          "relative inline-block after:bg-white-900 after:z-[1] after:absolute after:right-[2px] after:bottom-[12px]",
          "after:pointer-events-none after:rounded-md after:w-[19.8px] after:border-t-[1.5px] after:border-white-900 after:rotate-[135deg]"
        )}
      >
        <div className="absolute border-t-[1.5px] border-white-900 rounded-md w-[11.31px] right-[2px] bottom-2 rotate-[135deg] z-[2]" />
      </div>
    </div>
  );
}
