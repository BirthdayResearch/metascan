import clsx from "clsx";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";

// TODO: Find a way to reuse InputComponent from commons
export default function ContractMethodTextInput({
  label,
  value,
  setValue,
  error,
  placeholder,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  error?: string;
  placeholder: string;
}) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <div>
      <div className="mb-2">{label}</div>
      <div
        className={clsx(
          "flex flex-row justify-between px-4 py-3 bg-dark-100 rounded-[10px] border-[0.5px] border-dark-200 focus-within:border focus-within:border-white-900",
          { "!border border-red-800": error }
        )}
      >
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full focus:outline-none border-none bg-dark-100 text-white-50 text-sm placeholder-white-900 focus:placeholder-black-500"
          onChange={(v) => setValue(v.target.value)}
          placeholder={placeholder}
          value={value}
        />
        {(value !== "" || isFocused) && (
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
