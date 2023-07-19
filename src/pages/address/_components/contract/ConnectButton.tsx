import clsx from "clsx";
import { ConnectKitButton } from "connectkit";
import { truncateTextFromMiddle } from "shared/textHelper";

export default function ConnectButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, address, show }) => (
        <button
          type="button"
          className="flex gap-2 items-center border-[0.5px] border-black-500 rounded-lg px-3 py-[10px] text-white-50 hover:opacity-70"
          onClick={show}
        >
          <div
            className={clsx(
              "rounded-full w-2 h-2",
              isConnected ? "bg-green-800" : "bg-red-800"
            )}
          />
          {isConnected ? (
            <>
              <span className="font-medium">Connected:</span>
              <span>
                Web3 [{truncateTextFromMiddle(address?.toString() ?? "", 5)}]
              </span>
            </>
          ) : (
            <span className="font-medium">Connect to Web3</span>
          )}
        </button>
      )}
    </ConnectKitButton.Custom>
  );
}
