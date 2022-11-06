import GradientText from "./GradientText";

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
      className={`${btnPadding} rounded-[28px] relative bg-black-900 group before:button-border before:bg-white-50 before:opacity-100 hover:before:opacity-0 hover:before:animate-none after:button-border after:opacity-0 after:brand-gradient-1 hover:after:opacity-100 hover:after:animate-none ${
        customStyle ?? ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex items-center ">
        <GradientText label={label} customStyle="font-medium" />
      </div>
    </button>
  );
}
