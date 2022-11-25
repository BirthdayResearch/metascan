import clsx from "clsx";
import NextLink from "next/link";

type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  label: string;
  href: string;
  testId: string;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  customStyle?: string;
}

const getButtonPadding = (size: ButtonSize): string => {
  switch (size) {
    case "small":
      return "py-2 px-5";
    case "large":
      return "py-4 px-8";
    case "medium":
    default:
      return "py-3 px-8";
  }
};

export default function Button({
  size = "medium",
  label,
  href,
  testId,
  onClick,
  disabled = false,
  customStyle,
}: ButtonProps): JSX.Element {
  const btnPadding = getButtonPadding(size);

  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const transitionStyle = "transition-all ease-in duration-300";
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={handleButtonClick}
      onClick={handleButtonClick}
      className={`relative group z-10 flex items-center justify-center rounded-[28px] group border border-white-50 brand-bg-gradient-1 active:brand-bg-gradient-2 hover:border-transparent
      ${transitionStyle} ${btnPadding} ${customStyle ?? ""} ${
        disabled
          ? "disabled-brand-gradient active:disabled-brand-gradient hover:border-white-50 hover:border-opacity-50 border-opacity-50"
          : ""
      }`}
    >
      <NextLink
        data-testid={testId}
        href={href}
        className={clsx(
          "text-white-50 font-medium tracking-[0.02em] brand-gradient-1 group-active:brand-gradient-2 bg-clip-text group-hover:text-transparent transition-all ease-in duration-300",
          {
            "pointer-events-none opacity-50 text-white-50 group-hover:text-white-50":
              disabled,
          }
        )}
      >
        {label}
      </NextLink>
    </div>
  );
}
