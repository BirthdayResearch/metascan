import NextLink from "next/link";

export default function LinkText({
  href,
  label,
  customStyle,
}: {
  href: string;
  label: string;
  customStyle?: string;
}): JSX.Element {
  return (
    <NextLink
      href={href}
      className={`text-lightBlue brand-gradient-1 bg-clip-text hover:text-transparent transition-all ease-in duration-300 ${
        customStyle ?? ""
      }`}
    >
      {label}
    </NextLink>
  );
}
