type ButtonSize = "small" | "medium" | "big";

interface ButtonProps {
  label: string;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  customStyle?: string;
}

const getButtonPadding = (size: ButtonSize): string => {
  switch (size) {
    case "small":
      return "py-2 px-5";
    case "big":
      return "py-4 px-8";
    case "medium":
    default:
      return "py-3 px-8";
  }
};

export default function Button({
  size = "medium",
  label,
  onClick,
  disabled = false,
  customStyle,
}: ButtonProps): JSX.Element {
  const btnPadding = getButtonPadding(size);
  return (
    <button
      type="button"
      className={`flex items-center rounded-[28px] bg-black-900 group border border-white-50
                  hover:brand-bg-gradient-1 hover:border-transparent
                  ${btnPadding} ${customStyle ?? ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span
        data-label={label}
        className="text-white-50 group-hover:brand-gradient-1 group-hover:bg-clip-text group-hover:text-transparent"
      >
        {label}
      </span>
    </button>
  );
}
