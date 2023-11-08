import clsx from "clsx";
import { useEffect, useState, useRef } from "react";
import { hexToUtf8 } from "shared/textHelper";
import BoldedTitle from "./BoldedTitle";
import WithCopy from "./WithCopy";

enum InputDisplay {
  Hex = "hex",
  Utf8 = "utf-8",
}

export default function RawInput({ hex }: { hex: string }) {
  const [selectedId, setSelectedId] = useState<InputDisplay>(InputDisplay.Hex);
  const [allowResize, setAllowResize] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const scrollHeight = textareaRef.current?.scrollHeight ?? 0;
    const clientHeight = textareaRef.current?.clientHeight ?? 0;
    if (scrollHeight > clientHeight) {
      setAllowResize(true);
    }
  }, [textareaRef]);

  const displayedInput = selectedId === InputDisplay.Hex ? hex : hexToUtf8(hex);
  return (
    <div>
      <BoldedTitle
        className="pb-6"
        testId="transaction-raw-input-title"
        title="Raw input"
      />
      <div className="flex flex-row items-center lg:mb-[14px] mb-3">
        <RawInputSelectButton
          label="Hex (Default)"
          id={InputDisplay.Hex}
          selectedId={selectedId}
          onClick={setSelectedId}
        />
        <RawInputSelectButton
          label="UTF-8"
          id={InputDisplay.Utf8}
          selectedId={selectedId}
          onClick={setSelectedId}
        />
        <div className="ml-auto">
          <WithCopy
            textToCopy={displayedInput}
            testId="raw-input"
            copyIconStyle="w-4 h-4 md:w-6 md:h-6 mb-0"
            successCopyStyle="text-sm lg:text-base gap-x-1"
          />
        </div>
      </div>
      <textarea
        ref={textareaRef}
        data-testid="transaction-hex"
        className={clsx(
          "textarea-scrollbar textarea-scrollbar-resizer w-full h-[200px] md:h-28 lg:h-auto transition-opacity rounded-md font-space-mono tracking-[-0.04em] break-all bg-black-800 border-[1px] border-black-600 text-white-50 p-4 lg:px-10",
          allowResize ? "resize-y" : "resize-none",
        )}
        disabled
        value={displayedInput}
      />
      {/* custom style for scrollbar resizer */}
      {allowResize && (
        <div className="relative inline-block after:bg-white-900 after:z-[1] after:absolute after:right-[2px] after:bottom-[12px] after:pointer-events-none after:rounded-md after:w-[19.8px] after:border-t-[1.5px] after:border-white-900 after:rotate-[135deg]">
          <div className="absolute border-t-[1.5px] border-white-900 rounded-md w-[11.31px] right-[2px] bottom-2 rotate-[135deg] z-[2]" />
        </div>
      )}
    </div>
  );
}

function RawInputSelectButton({
  label,
  id,
  selectedId,
  onClick,
}: {
  label: string;
  id: InputDisplay;
  selectedId: string;
  onClick: (id: InputDisplay) => void;
}) {
  const isSelected = selectedId === id;
  return (
    <button
      type="button"
      data-testid={`${id}-btn`}
      className={clsx(
        "font-semibold md:font-medium text-xs md:text-sm leading-[18.2px] px-4 py-2 mr-2 rounded-[24px]",
        isSelected
          ? "bg-white-50 text-black-900"
          : "bg-black-600 text-white-50 hover:opacity-70",
      )}
      onClick={() => !isSelected && onClick(id)}
    >
      {label}
    </button>
  );
}
