export default function GradientText({
  label,
  initialTextColor = "bg-white-50",
  customStyle,
  gradient = "after:brand-gradient-1",
}: {
  label: string;
  initialTextColor?: string;
  customStyle?: string;
  gradient?: string;
}): JSX.Element {
  return (
    <span
      data-label={label}
      data-gradient={gradient}
      className={`relative before:gradient-text before:content-[attr(data-label)] before:${initialTextColor} before:opacity-100 group-hover:before:opacity-0 after:gradient-text after:content-[attr(data-label)] ${gradient} after:opacity-0 group-hover:after:opacity-100 ${
        customStyle ?? ""
      }`}
    >
      {label}
    </span>
  );
}
