import { useState } from "react";
import { Combobox } from "@headlessui/react";
import clsx from "clsx";

export default function TextInput(): JSX.Element {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const transitionClass = "transition duration-300 ease-in";

  return (
    <Combobox>
      <div
        className={clsx(
          "relative group flex w-full rounded-lg p-[1px] bg-black-500 focus-within:bg-lightBlue black-gradient-1-shadow backdrop-blur-[6px]",
          transitionClass
        )}
        data-testid="search-bar-container"
      >
        {!isFocused && (
          <div
            className={clsx(
              " opacity-0  rounded-lg transition brand-gradient-1 group-hover:opacity-100",
              transitionClass
            )}
          />
        )}

        <div className="relative flex w-full px-8 py-[22px] rounded-lg bg-black-500 black-gradient-1">
          <Combobox.Button as="div" className="flex w-full gap-2">
            <Combobox.Input
              as="input"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="0xxxxxxx"
              className="h-full w-full focus:outline-none bg-transparent caret-lightBlue placeholder-white-700 placeholder-opacity-50 text-white-50 text-xl tracking-[0.01em]"
              data-testid="wallet_address_input"
            />
          </Combobox.Button>
        </div>
      </div>
    </Combobox>
  );
}
