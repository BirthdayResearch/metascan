import { NetworkConnection } from "@contexts/Environment";
import { useNetwork } from "@contexts/NetworkContext";

export interface MenuItem {
  label: string;
  pathname: string;
  testId: string;
  childPaths: string[];
  imagePath: string;
}

// To hide /faucet navigation menu item if not in testnet
export default function useMenuNavigationHelper({
  menu,
}: {
  menu: MenuItem[];
}) {
  const { connection } = useNetwork();

  return connection !== NetworkConnection.TestNet
    ? menu.filter((item) => item.label !== "Faucet")
    : menu;
}
