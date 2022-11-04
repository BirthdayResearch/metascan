import clsx from "clsx";
import { Link } from "@components/commons/Link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Container from "@components/commons/Container";
import { FiXCircle, FiMenu } from "react-icons/fi";
import Image from "next/image";
import {
  HeaderNetworkMenu,
  HeaderNetworkMenuMobile,
} from "./HeaderNetworkMenu";

const MenuItems = [
  {
    label: "Blocks",
    pathname: "/blocks",
    testId: "Desktop.HeaderLink.Blocks",
    imagePath: "/menu/Blocks.svg",
  },
  {
    label: "Transactions",
    pathname: "/transactions",
    testId: "Desktop.HeaderLink.Transactions",
    imagePath: "/menu/Transactions.svg",
  },
  {
    label: "Verified Contracts",
    pathname: "/contracts",
    testId: "Desktop.HeaderLink.VerifiedContracts",
    imagePath: "/menu/VerifiedContracts.svg",
  },
];

export function Header(): JSX.Element {
  const [menu, setMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function routeChangeStart(): void {
      setMenu(false);
    }

    router.events.on("routeChangeStart", routeChangeStart);
    return () => router.events.off("routeChangeStart", routeChangeStart);
  }, []);

  return (
    <header data-testid="Header.Container">
      <Container className="p-4 md:py-5 md:py-6 md:px-10">
        <div className="flex items-center justify-between">
          <Link href={{ pathname: "/" }} passHref>
            <div className="relative w-[135px] h-[24px] md:w-[202px] md:h-[36px]">
              <Image
                fill
                data-testid="dmc_explorer_logo"
                src="/logo.svg"
                alt="DeFi Meta Chain Logo"
              />
            </div>
          </Link>
          <div className="hidden lg:flex">
            <DesktopNavbar />
          </div>
          <div className="flex">
            <div className="hidden lg:flex">
              <HeaderNetworkMenu />
            </div>
            <div className="lg:hidden">
              <div className="ml-4 pl-0.5">
                <FiMenu
                  className="w-6 h-6 stroke-white-50"
                  onClick={() => setMenu(true)}
                  data-testid="Header.OpenMenu"
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

function DesktopNavbar(): JSX.Element {
  return (
    <div className="bg-white-50 rounded-3xl">
      {MenuItems.map((item) => (
        <HeaderLink
          label={item.label}
          pathname={item.pathname}
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
  return (
    <>
      <div
        className={clsx(
          "h-full fixed top-0 right-0 z-10 w-full bg-black-900/20 backdrop-blur-[28px]",
          { block: isOpen, hidden: !isOpen }
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
          { "w-full md:w-[360px]": isOpen, "w-0": !isOpen }
        )}
      >
        <div className="flex items-center justify-between p-4">
          <Link href={{ pathname: "/" }}>
            <div className="relative w-[135px] h-[25px]">
              <Image
                fill
                data-testid="dmc_logo"
                src="/logo.svg"
                alt="DeFi Meta Chain Logo"
              />
            </div>
          </Link>
          <FiXCircle
            className="!stroke-1 w-10 h-10 stroke-white-50"
            onClick={onClose}
            data-testid="Header.CloseMenu"
          />
        </div>
        <div className="mt-4">
          {MenuItems.map((item) => (
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
}: {
  label: string;
  pathname: string;
  testId?: string;
}): JSX.Element {
  return (
    <Link href={{ pathname }}>
      <div
        className="
          inline-block
          px-8
          font-medium
          text-base
          py-4
          group
          cursor-pointer
          relative
          before:cta-border
          before:bg-white-50
          before:opacity-100
          hover:before:opacity-0
          after:cta-border
          after:brand-gradient-1
          after:opacity-0
          hover:after:opacity-100
        "
        data-testid={testId}
      >
        <span
          data-label={label}
          className="
            text-transparent
            font-medium
            before:bg-black-900
            relative
            before:gradient-text
            before:font-medium
            before:opacity-100
            group-hover:before:opacity-0
            before:leading-[20.8px]
            after:leading-[20.8px]
            after:gradient-text
            after:font-medium
            after:brand-gradient-1
            after:opacity-0
            group-hover:after:opacity-100
            before:content-[attr(data-label)]
            after:content-[attr(data-label)]
          "
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
