type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  label: string;
  href: string;
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

  return (
    <button
      type="button"
      className={`flex items-center rounded-[28px] bg-black-900 group border border-white-50
                  hover:brand-bg-gradient-1 hover:border-transparent hover:transition hover:duration-300 hover:ease-in-out 
                  ${btnPadding} ${customStyle ?? ""}`}
      disabled={disabled}
      onClick={handleButtonClick}
    >
      <span
        className="text-white-50 group-hover:brand-gradient-1 group-hover:bg-clip-text group-hover:text-transparent
                  group-hover:transition group-hover:duration-300 group-hover:ease-in-out"
      >
        {label}
      </span>
    </button>
  );
}
