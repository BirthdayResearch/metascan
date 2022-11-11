import NextLink from "next/link";

export default function LinkText({
  href,
  label,
  customStyle,
  testId,
}: {
  href: string;
  label: string;
  customStyle?: string;
  testId?: string;
}): JSX.Element {
  return (
    <NextLink
      data-testid={testId}
      href={href}
      className={`text-lightBlue brand-gradient-1 focus:brand-gradient-2 bg-clip-text hover:text-transparent transition-all ease-in duration-300 ${
        customStyle ?? ""
      }`}
    >
      {label}
    </NextLink>
  );
}
