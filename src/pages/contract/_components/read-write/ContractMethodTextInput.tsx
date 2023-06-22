import clsx from "clsx";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";

// TODO: Add `plus` button for number fields
export default function ContractMethodTextInput({
  label,
  value,
  setValue,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  type?: "text" | "number";
}) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <div>
      <div className="mb-2">{label}</div>
      <div
        className={clsx(
          "flex flex-row justify-between px-4 py-3 bg-dark-100 rounded-[10px] border-[0.5px] border-dark-200",
          "focus-within:border focus-within:border-white-900"
        )}
      >
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full focus:outline-none border-none bg-dark-100 text-white-50 text-sm placeholder-white-900 focus:placeholder-black-500"
          onChange={(v) => setValue(v.target.value)}
          placeholder={placeholder}
          value={value}
          type={type}
        />
        {(value !== "" || isFocused) && (
          <IoCloseCircleSharp
            onClick={() => setValue("")}
            role="button"
            className="text-white-50 ml-1"
            size={24}
          />
        )}
      </div>
    </div>
  );
}
