import { Disclosure } from "@headlessui/react";
import clsx from "clsx";
import { FiChevronDown } from "react-icons/fi";

export default function DisclosureComponent({ title, subtitle, children }) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="py-2">
            <div className="flex flex-row items-center space-x-4">
              <FiChevronDown
                size={24}
                className={clsx("stroke-white-50 stroke-[2px] transition", {
                  "rotate-180": open,
                })}
                aria-hidden="true"
              />
              <div className="flex flex-col justify-items-start items-left">
                <div className="text-white-50 -tracking-[0.02em] text-lg text-left">
                  {title}
                </div>
                <div className="text-white-700 -tracking-[0.01em] text-sm text-left">
                  {subtitle}
                </div>
              </div>
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
