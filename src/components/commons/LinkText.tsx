import clsx from "clsx";
import { LinkProps } from "next/link";
import { PropsWithChildren } from "react";
import { Link } from "./Link";

export default function LinkText({
  href,
  label,
  customStyle,
  testId,
  children,
}: LinkProps &
  PropsWithChildren<{
    label?: string;
    customStyle?: string;
    testId?: string;
  }>): JSX.Element {
  return (
    <Link
      data-testid={testId}
      href={href}
      className={clsx(
        "text-lightBlue brand-gradient-1 active:brand-gradient-2 bg-clip-text hover:text-transparent transition-all ease-in duration-300",
        customStyle
      )}
    >
      {label}
      {children}
    </Link>
  );
}
