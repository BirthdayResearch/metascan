import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { AddressType, getAddressType } from "@waveshq/walletkit-core";
import { IoCloseCircleSharp } from "react-icons/io5";

export default function WalletAddressTextInput({
  validEvmAddress,
  setValidEvmAddress,
  walletAddress,
  setWalletAddress,
}: {
  validEvmAddress: boolean;
  setValidEvmAddress: (val: boolean) => void;
  walletAddress: string;
  setWalletAddress: (val: string) => void;
}): JSX.Element {
  const transitionClass = "transition duration-300 ease-in";

  const inputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the input element

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const addressType = getAddressType(walletAddress, "testnet");

  const invalidAddressInput = !validEvmAddress && walletAddress !== "";
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(event.target.value);
  };

  useEffect(() => {
    setValidEvmAddress(addressType === AddressType.ETH);
  }, [walletAddress]);

  return (
    <div>
      <div
        className={clsx(
          "relative group flex w-full rounded-lg p-[1px] bg-black-500 black-gradient-1-shadow backdrop-blur-[6px]",
          invalidAddressInput
            ? "focus-within:bg-red-500"
            : "focus-within:bg-lightBlue",
          transitionClass,
        )}
      >
        {!isFocused && (
          <div
            className={clsx(
              "absolute opacity-0 inset-0 rounded-lg transition brand-gradient-1 group-hover:opacity-100",
              transitionClass,
            )}
          />
        )}
        <div className="relative flex w-full px-8 py-[22px] rounded-lg bg-black-500 black-gradient-1">
          <div className="flex w-full gap-2">
            <input
              ref={inputRef}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="0xxxxxxx"
              className={clsx(
                "h-full w-full focus:outline-none bg-transparent caret-lightBlue placeholder-white-700 placeholder-opacity-50 text-white-50 text-xl tracking-[0.01em]",
              )}
              data-testid="wallet_address_input"
              onChange={changeHandler}
            />
          </div>
          {(walletAddress !== "" || isFocused) && (
            <IoCloseCircleSharp
              size={24}
              onClick={() => {
                setWalletAddress(""); // Clear the walletAddress
                if (inputRef.current) {
                  inputRef.current.value = ""; // Clear the display in the input field if inputRef.current is not null
                }
              }}
              className="text-white-50 self-center"
            />
          )}
        </div>
      </div>
      <div className="text-red-500 py-4">
        {invalidAddressInput && (
          <div>Please input a valid Testnet DFI Address.</div>
        )}
      </div>
    </div>
  );
}
