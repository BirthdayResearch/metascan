import GradientText from "./GradientText";

export default function LinkButton({
  label,
  href,
  onClick,
  customStyle,
}: {
  label: string;
  href: string;
  onClick?: () => void;
  customStyle?: string;
}): JSX.Element {
  return (
    <button
      type="button"
      className={`group before:opacity-100 hover:before:opacity-0 hover:before:animate-none after:opacity-0 after:brand-gradient-1 hover:after:opacity-100 hover:after:animate-none ${
        customStyle ?? ""
      }`}
      onClick={onClick}
    >
      <a href={href} target="_blank" rel="noreferrer">
        <div className="flex items-center ">
          <GradientText label={label} />
        </div>
      </a>
    </button>
  );
}
