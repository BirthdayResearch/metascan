import { ConnectKitButton } from "connectkit";

export default function ConnectButton() {
  return (
    // TODO: refine ui to follow figma design
    <ConnectKitButton.Custom>
      {({ isConnected, address, show }) => (
        <button
          type="button"
          className="border-[0.5px] border-black-500 rounded-lg px-3 py-[10px] font-semibold text-white-50 hover:opacity-70"
          onClick={show}
        >
          {isConnected ? address : "Connect to Web3"}
        </button>
      )}
    </ConnectKitButton.Custom>
  );
}
