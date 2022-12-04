type ButtonSize = "small" | "medium" | "large";

interface LinklessButtonProps {
  label: string;
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
  testId,
  onClick,
  disabled = false,
  customStyle,
}: LinklessButtonProps): JSX.Element {
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
      className={`flex items-center justify-center rounded-[28px] group border border-white-50 brand-bg-gradient-1 active:brand-bg-gradient-2 hover:border-transparent
                  ${transitionStyle} ${btnPadding} ${customStyle ?? ""} ${
        disabled ? "opacity-50" : "opacity-100"
      }`}
      disabled={disabled}
      onClick={handleButtonClick}
    >
      <span
        className={`text-white-50 font-medium tracking-[0.02em] brand-gradient-1 group-active:brand-gradient-2 bg-clip-text group-hover:text-transparent ${transitionStyle} `}
      >
        {label}
      </span>
    </button>
  );
}
