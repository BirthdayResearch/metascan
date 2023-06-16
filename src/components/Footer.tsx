import React from "react";
import Image from "next/image";
import Container from "./commons/Container";

const MenuItems = [
  {
    category: "Ecosystem",
    childLink: [
      {
        imagePath: "/menu/defichain-com.svg",
        testId: "DeFiChain.com",
        label: "DeFiChain.com",
        href: "https://defichain.com",
      },
      // {
      //   imagePath: "/menu/VerifiedContracts.svg",
      //   testId: "Verified Contracts",
      //   label: "Verified Contracts",
      //   href: "",
      // },
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
        imagePath: "/menu/github.svg",
        testId: "GitHub",
        label: "GitHub",
        href: "https://github.com/BirthdayResearch/metascan",
      },
    ],
  },
];

function Footer() {
  return (
    <footer className="w-full relative lg:pb-[70px] md:pb-[52px] pb-[57.05px] md:pt-[104px] pt-20">
      <Container className="px-5 md:px-10 lg:px-[120px]">
        <div className="black-gradient-1-shadow backdrop-blur-[6px] bg-opacity-70 bg-black-900 flex flex-col lg:flex-row md:flex-row lg:py-10 md:py-10 py-8 lg:px-[126px] md:px-10 px-5 rounded-[30px] black-gradient-1 gap-y-10 lg:gap-0 md:gap-0">
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
          <div className="flex flex-row lg:mt-0 md:mt-0 mt-[56px] relative lg:w-[202px] md:w-[168px] w-[135px] lg:h-[36px] md:h-[30px] h-[24px] ">
            <Image
              fill
              data-testid="footer-dmc-explorer-logo"
              src="/logo.svg"
              alt="DeFi Meta Chain Logo"
            />
          </div>
        </div>
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
  testId: string;
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
