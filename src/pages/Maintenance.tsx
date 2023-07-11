import clsx from "clsx";
import { FaReddit, FaGithub, FaTwitter } from "react-icons/fa";

const BirthdayResearchSocialItems = [
  {
    icon: FaTwitter,
    testId: "twitter_br",
    label: "Twitter (Birthday Research)",
    href: "https://twitter.com/BirthdayDev/",
  },
  {
    icon: FaGithub,
    testId: "gitHub_br",
    label: "GitHub (Birthday Research)",
    href: "https://github.com/BirthdayResearch/metascan",
  },
  {
    icon: FaReddit,
    testId: "reddit_dfc",
    label: "Reddit (r/defiblockchain)",
    href: "https://www.reddit.com/r/defiblockchain",
  },
];

export default function Maintenance() {
  return (
    <div className={clsx("px-1 pt-16", "lg:pr-[212px]")} data-testid="maintenance">
      <div className="text-red-800 font-bold">System maintenance</div>
      <div
        className={clsx(
          "pt-4 text-white-50 text-[32px] leading-10 font-bold",
          "md:text-[48px] md:leading-[56px]"
        )}
      >
        Block explorer is under maintenance
      </div>
      <div className="pt-6 text-white-50 md:text-xl">
        There are regular checks to maintain performance standards. Please try
        again after some time. For any immediate concerns or status updates,
        consult the following links:
      </div>
      <div className="mt-10 space-y-6">
        {BirthdayResearchSocialItems.map((each) => {
          const Icon = each.icon;
          return (
            <div key={each.label}>
              <a
                href={each.href}
                key={each.testId}
                target="_blank"
                rel="noreferrer"
                className="flex flex-row items-center"
                data-testid={`${each.testId}`}
                aria-label={`${each.testId} Icon`}
              >
                <Icon size={24} className="text-white-100" />
                <span className="text-white-100 text-lg ml-3">{each.label}</span>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
