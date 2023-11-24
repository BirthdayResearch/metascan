import clsx from "clsx";
import Link from "./Link";

type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  label: string;
  testId: string;
  href?: string;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  customStyle?: string;
  variant?: "solid" | "outline";
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
  variant = "solid",
  label,
  href,
  testId,
  onClick,
  disabled = false,
  customStyle,
}: ButtonProps): JSX.Element {
  if (href) {
    return (
      <Link href={href} className={clsx({ "pointer-events-none": disabled })}>
        <ButtonElement
          size={size}
          label={label}
          testId={testId}
          onClick={onClick}
          customStyle={customStyle}
          disabled={disabled}
          variant={variant}
        />
      </Link>
    );
  }

  return (
    <ButtonElement
      size={size}
      label={label}
      testId={testId}
      onClick={onClick}
      customStyle={customStyle}
      disabled={disabled}
      variant={variant}
    />
  );
}

function ButtonElement({
  size = "medium",
  label,
  testId,
  onClick,
  disabled = false,
  customStyle,
  variant,
}: {
  label: string;
  testId: string;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  customStyle?: string;
  variant?: "solid" | "outline";
}) {
  const btnPadding = getButtonPadding(size);

  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const transitionStyle = "transition-all ease-in duration-300";
  return (
    <button
      data-testid={`${testId}-button`}
      type="button"
      className={clsx(
        "flex items-center justify-center rounded-[28px] group border",
        transitionStyle,
        btnPadding,
        customStyle,
        { "opacity-50": disabled },
        { "opacity-100": !disabled },
        {
          "bg-white-50 text-black-900 hover:border-transparent":
            variant === "solid",
        },
        {
          "text-white-50 border-white-50 brand-bg-gradient-1 active:brand-bg-gradient-2 hover:border-transparent":
            variant === "outline",
        },
      )}
      disabled={disabled}
      onClick={handleButtonClick}
    >
      <span
        className={`font-medium tracking-[0.02em] brand-gradient-1 group-active:brand-gradient-2 bg-clip-text group-hover:text-transparent ${transitionStyle} `}
      >
        {label}
      </span>
    </button>
  );
}
