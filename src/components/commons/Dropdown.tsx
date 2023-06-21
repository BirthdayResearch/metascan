import clsx from "clsx";
import { Listbox, Transition } from "@headlessui/react";
import { MdCheckCircle } from "react-icons/md";
import { CgChevronDown } from "react-icons/cg";

export default function Dropdown({
  value,
  label,
  options,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <div className="text-lg mb-2 text-white-700">{label}</div>
      <Listbox
        value={value}
        onChange={onChange}
        disabled={options.length === 0}
      >
        <div className="relative bg-dark-100 rounded-[10px] border-[0.5px] border-dark-200 focus-within:border focus-within:border-white-900">
          <Listbox.Button className="relative px-4 py-[18px] w-full cursor-default text-left shadow-md">
            {value?.value === "" ? (
              <span className="text-black-500 text-lg">{placeholder}</span>
            ) : (
              <span className="text-white-50 text-lg">{value?.label}</span>
            )}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <CgChevronDown
                size={16}
                className={clsx(
                  "h-4 w-4 text-black-500 stroke-white-50 stroke-[1.5px]",
                  { "text-white-50": value?.value !== "" }
                )}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as="div"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-md bg-dark-100 py-2 focus:outline-none text-lg z-10">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className="relative cursor-pointer select-none py-2 px-4"
                  value={option}
                >
                  <div className="flex flex-row justify-between">
                    <span className="block truncate text-white-50">
                      {option.label}
                    </span>
                    {option.value === value.value ? (
                      <span className="text-green-800">
                        <MdCheckCircle className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </div>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
