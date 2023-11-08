import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import InputComponent from "@components/commons/InputComponent";
import AddZeroesModal from "./AddZeroesModal";

export default function ContractMethodTextInput({
  label,
  value,
  setValue,
  placeholder,
  valueType,
  type = "text",
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  valueType?: string;
  type?: "text" | "number";
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        {label}
        {valueType === "uint256" && (
          <>
            <button
              type="button"
              aria-label="Contract Input"
              className="bg-gray-800 rounded p-1 hover:opacity-70 border-[0.5px] border-transparent focus:border-white-900"
              onClick={() => setIsOpen(true)}
              id="add-zero"
            >
              <FiPlus size={18} />
            </button>
            <AddZeroesModal
              isOpen={isOpen}
              onCloseModal={() => setIsOpen(false)}
              onAdd={(zeroes) => {
                setValue(value === "" ? `1${zeroes}` : `${value}${zeroes}`);
                setIsOpen(false);
              }}
            />
          </>
        )}
      </div>

      <InputComponent
        type={type}
        value={value}
        setValue={setValue}
        placeholder={placeholder}
        inputClass="!text-sm"
        inputContainerClassName="!py-3"
      />
    </div>
  );
}
