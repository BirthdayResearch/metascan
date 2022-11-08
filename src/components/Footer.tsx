import React from "react";
import Image from "next/image";
import Container from "./commons/Container";

const MenuItems = [
  {
    category: "Ecosystem",
    childLink: [
      {
        imagePath: "/menu/dmc-explorer.svg",
        testId: "DeFiMetaChain",
        label: "DeFiMetaChain",
        href: "https://defimetachain.org/",
      },
      {
        imagePath: "/menu/defichain-com.svg",
        testId: "DeFiChain.com",
        label: "DeFiChain.com",
        href: "https://defichain.com",
      },
      {
        imagePath: "/menu/VerifiedContracts.svg",
        testId: "Verified Contracts",
        label: "Verified Contracts",
        href: "",
      },
    ],
  },
  {
    category: "Community",
    childLink: [
      {
        imagePath: "/menu/twitter.svg",
        testId: "Twitter",
        label: "Twitter",
        href: "https://twitter.com/defichain",
      },
      {
        imagePath: "/menu/telegram.svg",
        testId: "Telegram",
        label: "Telegram",
        href: "https://t.me/defiblockchain",
      },
    ],
  },
  {
    category: "Blog",
    href: "",
    childLink: [
      {
        imagePath: "/menu/whitepaper.svg",
        testId: "Whitepaper",
        label: "Whitepaper",
        href: "",
      },
      {
        imagePath: "/menu/github.svg",
        testId: "GitHub",
        label: "GitHub",
        href: "https://github.com/DeFiCh/metachain",
      },
    ],
  },
];

function Footer() {
  return (
    <footer className="w-full relative pb-[40px] lg:pb-[70px] md:pb-[52px] sm:pb-[57.05] lg:pt-[104px] md:pt-[66px] pt-[79px] bottom-0 right-0">
      <Container className="px-4 sm:px-10 md:px-10">
        {/* <div className="rounded-[30px] w-full h-full p-[0.5px] white-gradient-1 drop-shadow-[0_5px_20px_rgba(0,0,0,0.2)] opacity-70">
                <div className="black-gradient-1 rounded-[30px] w-full h-full bg-opacity-25"> */}

        <div className="black-gradient-1-shadow backdrop-blur-[6px] bg-opacity-70 bg-black-900 flex flex-col sm:flex-row py-10 px-5 md:px-10 lg:px-[86px] rounded-[30px] black-gradient-1 gap-y-10 md:gap-0">
          <div className="flex flex-row grow">
            <FooterColumn
              category={MenuItems[0].category}
              childLinks={MenuItems[0].childLink}
            />
          </div>
          <div className="flex flex-row grow">
            <FooterColumn
              category={MenuItems[1].category}
              childLinks={MenuItems[1].childLink}
            />
          </div>
          <div className="flex flex-row grow">
            <FooterColumn
              category={MenuItems[2].category}
              childLinks={MenuItems[2].childLink}
            />
          </div>
          <div className="flex flex-row relative lg:w-[202px] lg:h-[36px] md:w-[168px] md:h-[30] w-[135px] h-[24px] ">
            <Image
              fill
              data-testid="dmc_explorer_logo"
              src="/logo.svg"
              alt="DeFi Meta Chain Logo"
            />
          </div>
        </div>

        {/* </div>
            </div> */}
      </Container>
    </footer>
  );
}

interface FooterColumnProps {
  category: string;
  childLinks: FooterLinkItemProps[];
}

interface FooterLinkItemProps {
  label: string;
  href?: string;
  testId?: string;
}

function FooterColumn({ category, childLinks }: FooterColumnProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="font-medium text-white-50">{category}</div>
      {childLinks.map((link) => (
        <FooterLinkItem
          href={link.href}
          label={link.label}
          key={link.label}
          testId={link.testId}
        />
      ))}
    </div>
  );
}

function FooterLinkItem({ href, label, testId }: FooterLinkItemProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-white-50/60"
      data-testid={testId}
    >
      {label}
    </a>
  );
}

export default Footer;
