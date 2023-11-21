import clsx from "clsx";
import Link from "@components/commons/Link";

export default function SectionDesc({ title, href }: { title: string; href?: string }): JSX.Element {
  return (
    <div className="flex flex-col items-center text-center my-4 mx-1 md:mx-[148px] lg:mx-0">
      <Link
        className={clsx(
          "font-semibold text-white-50 text-sm leading-10 -tracking-[0.01em]",
        )}
        href={href}
        target="_blank"
      >
        {title}
      </Link>
    </div>
  );
}
