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
      return;
    }
    window.open(href, "_blank", "noreferrer");
  };

  const transitionStyle = "transition-all ease-in duration-300";
  return (
    <button
      data-testid={`${testId}-button`}
      type="button"
      className={`flex items-center justify-center rounded-[28px] group border border-white-50 brand-bg-gradient-1 active:brand-bg-gradient-2 hover:border-transparent
                  ${transitionStyle} ${btnPadding} ${customStyle ?? ""}`}
      disabled={disabled}
      onClick={handleButtonClick}
    >
      <span
        className={`text-white-50 brand-gradient-1 group-active:brand-gradient-2 bg-clip-text group-hover:text-transparent ${transitionStyle}`}
      >
        {label}
      </span>
    </button>
  );
}
