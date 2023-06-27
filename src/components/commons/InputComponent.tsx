import clsx from "clsx";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";

export default function InputComponent({
  label,
  value,
  error,
  setValue,
  inputClass,
  placeholder,
  labelClassName,
  type = "string",
  disabled = false,
  showClearIcon = true,
  inputContainerClassName,
}: {
  label?: string;
  value: string | number;
  type?: string;
  setValue: (value: string | number) => void;
  error?: string;
  disabled?: boolean;
  inputClass?: string;
  labelClassName?: string;
  showClearIcon?: boolean;
  inputContainerClassName?: string;
  placeholder: string;
}) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isVisited, setIsVisited] = useState<boolean>(false);
  return (
    <div>
      {label && (
        <div className={clsx("text-lg mb-2 text-white-700", labelClassName)}>
          {label}
        </div>
      )}
      <div
        className={clsx(
          "flex flex-row justify-between px-4 py-[18px] bg-dark-100 rounded-[10px] border-[0.5px] border-dark-200 focus-within:border focus-within:border-white-900",
          { "!border !border-red-800": error && isVisited },
          inputContainerClassName
        )}
      >
        <input
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={(v) => setValue(v.target.value)}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
            setIsVisited(true);
          }}
          className={clsx(
            "w-full focus:outline-none border-none bg-dark-100 text-white-50 text-xl placeholder-white-900 focus:placeholder-black-500",
            { "opacity-[0.3]": disabled },
            inputClass
          )}
        />
        {showClearIcon && (value !== "" || isFocused) && (
          <IoCloseCircleSharp
            onClick={() => {
              setValue("");
            }}
            role="button"
            className="text-white-50 ml-1"
            size={24}
          />
        )}
      </div>
    </div>
  );
}
