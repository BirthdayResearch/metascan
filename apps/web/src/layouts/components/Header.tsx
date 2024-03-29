import clsx from "clsx";
import Link from "@components/commons/Link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Container from "@components/commons/Container";
import { FiMenu, FiXCircle } from "react-icons/fi";
import Image from "next/image";
import { getTopLevelRoute } from "shared/urlHelper";
import useMenuNavigationHelper, {
  MenuItem,
} from "@hooks/useMenuNavigationHelper";
import { useNetwork } from "@contexts/NetworkContext";
import { NetworkConnection } from "@contexts/Environment";
import {
  HeaderNetworkMenu,
  HeaderNetworkMenuMobile,
} from "./HeaderNetworkMenu";

export const MenuItems: MenuItem[] = [
  {
    label: "Blocks",
    pathname: "/blocks",
    testId: "Desktop.HeaderLink.Blocks",
    childPaths: ["/block"],
    imagePath: "/menu/Blocks.svg",
  },
  {
    label: "Transactions",
    pathname: "/txs",
    testId: "Desktop.HeaderLink.Transactions",
    childPaths: ["/tx"],
    imagePath: "/menu/Transactions.svg",
  },
  {
    label: "Contracts",
    pathname: "/contracts",
    childPaths: [],
    testId: "Desktop.HeaderLink.Contracts",
    imagePath: "/menu/VerifiedContracts.svg",
  },
  {
    label: "Tokens",
    pathname: "/tokens",
    testId: "Desktop.HeaderLink.Tokens",
    childPaths: ["/token"],
    imagePath: "/menu/Tokens.svg",
  },
  // {
  //   label: "Faucet",
  //   pathname: "/faucet",
  //   testId: "Desktop.HeaderLink.Faucet",
  //   childPaths: ["/faucet"],
  //   imagePath: "/menu/Transactions.svg",
  // },
];

export default function Header(): JSX.Element {
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  const currentPath = getTopLevelRoute(router.asPath);

  const { connection } = useNetwork();

  useEffect(() => {
    function routeChangeStart(): void {
      setMenu(false);
    }

    router.events.on("routeChangeStart", routeChangeStart);
    return () => router.events.off("routeChangeStart", routeChangeStart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header data-testid="header-container">
      {connection === NetworkConnection.TestNet && (
        <div
          className="text-gray-900 bg-orange-100 rounded p-3 text-center text-sm"
          data-testid="warning_banner"
        >
          You are currently in the TestNet network
        </div>
      )}
      <Container className="p-4 md:py-6 md:px-10 lg:px-[120px]">
        <div className="flex items-center justify-between">
          <Link href={{ pathname: "/" }} passHref>
            <div className="relative w-[135px] h-[24px] md:w-[202px] md:h-[36px]">
              <Image
                fill
                data-testid="dmc-explorer-logo"
                src="/logo.svg"
                alt="DeFi Meta Chain Logo"
              />
            </div>
          </Link>
          <div className="hidden xl:flex">
            <DesktopNavbar currentPath={currentPath} />
          </div>
          <div className="flex">
            <div className="hidden xl:flex">
              <HeaderNetworkMenu />
            </div>
            <div className="xl:hidden">
              <div className="mr-1.5 md:mr-0">
                <FiMenu
                  className="w-6 h-6 stroke-white-50"
                  onClick={() => setMenu(true)}
                  data-testid="header-openMenu"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <MobileNavbar isOpen={menu} onClose={() => setMenu(false)} />
    </header>
  );
}

function DesktopNavbar({ currentPath }: { currentPath: string }): JSX.Element {
  const filteredMenuItems = useMenuNavigationHelper({ menu: MenuItems });

  return (
    <div className="bg-white-50 rounded-3xl">
      {filteredMenuItems.map((item) => (
        <HeaderLink
          label={item.label}
          pathname={item.pathname}
          currentPath={currentPath}
          childPaths={item.childPaths}
          testId={item.testId}
          key={item.testId}
        />
      ))}
    </div>
  );
}

function MobileNavbar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}): JSX.Element {
  const filteredMenuItems = useMenuNavigationHelper({ menu: MenuItems });

  return (
    <>
      <div
        className={clsx(
          "h-full fixed top-0 right-0 z-10 w-full bg-black-900/20 backdrop-blur-[28px]",
          { block: isOpen, hidden: !isOpen },
        )}
        onClick={onClose}
        onKeyDown={onClose}
        role="button"
        aria-label="Close Menu"
        tabIndex={0}
      />
      <div
        className={clsx(
          "h-full fixed top-0 right-0 z-10 bg-black-900 backdrop-blur-[28px] transition-[width] duration-300 overflow-y-auto",
          { "w-full md:w-[360px]": isOpen, "w-0": !isOpen },
        )}
      >
        <div className="flex items-center justify-between p-4">
          <Link href={{ pathname: "/" }}>
            <div className="relative w-[135px] h-[25px]">
              <Image
                fill
                data-testid="dmc-logo"
                src="/logo.svg"
                alt="DeFi Meta Chain Logo"
              />
            </div>
          </Link>
          <FiXCircle
            className="!stroke-1 w-10 h-10 stroke-white-50"
            onClick={onClose}
            data-testid="header-closeMenu"
          />
        </div>
        <div className="mt-4">
          {filteredMenuItems.map((item) => (
            <HeaderMobileLink
              label={item.label}
              imagePath={item.imagePath}
              pathname={item.pathname}
              testId={item.testId}
              key={item.testId}
            />
          ))}
        </div>
        <HeaderNetworkMenuMobile />
      </div>
    </>
  );
}

function HeaderLink({
  label,
  pathname,
  testId,
  childPaths,
  currentPath,
}: {
  label: string;
  pathname: string;
  currentPath: string;
  childPaths?: string[];
  testId?: string;
}): JSX.Element {
  const isActive =
    currentPath === pathname || childPaths?.includes(currentPath);
  return (
    <Link href={{ pathname }}>
      <div
        className={clsx(
          "inline-block px-8 font-medium text-base py-4 group cursor-pointer relative",
          "before:cta-border before:bg-white-50 before:opacity-100",
          "after:cta-border after:brand-gradient-1 after:opacity-0",
          "hover:before:opacity-0 hover:after:opacity-100",
          { "before:opacity-0 after:opacity-100": isActive },
        )}
        data-testid={testId}
      >
        <span
          data-label={label}
          className={clsx(
            "font-medium brand-gradient-1 group-hover:text-transparent bg-clip-text transition-all ease-in duration-100",
            {
              "text-transparent": isActive,
            },
          )}
        >
          {label}
        </span>
      </div>
    </Link>
  );
}

function HeaderMobileLink({
  label,
  imagePath,
  pathname,
  testId,
}: {
  label: string;
  imagePath: string;
  pathname: string;
  testId?: string;
}): JSX.Element {
  return (
    <Link href={{ pathname }}>
      <div className="flex py-5 px-12 cursor-pointer items-center text-center">
        <div className="w-8 h-8 relative">
          <Image fill src={imagePath} alt={label} />
        </div>
        <div
          data-label={label}
          className="ml-6 text-base text-gray-50"
          data-testid={testId}
        >
          {label}
        </div>
      </div>
    </Link>
  );
}
