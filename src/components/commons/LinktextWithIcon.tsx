import clsx from "clsx";
import { LinkProps } from "next/link";
import { useState } from "react";
import { IconType } from "react-icons";
import { Link } from "./Link";

interface IconProps {
  Icon: IconType;
  pos: "left" | "right";
  size?: number;
  iconStyle?: string;
}
export default function LinkTextWithIcon({
  href,
  label,
  customStyle,
  testId,
  icon,
}: LinkProps & {
  label: string;
  customStyle?: string;
  testId?: string;
  icon?: IconProps;
}): JSX.Element {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const LinkIcon = icon?.Icon;
  const iconProps = {
    size: icon?.size ?? 24,
    className: clsx("stroke-lightBlue", icon?.iconStyle),
    style: {
      ...(isHovered && {
        stroke: "url(#red-gradient-1)",
      }),
      ...(isPressed && {
        stroke: "url(#brand-gradient-2)",
      }),
    },
  };

  return (
    <Link
      data-testid={testId}
      href={href}
      className={`flex items-center text-lightBlue brand-gradient-1 active:brand-gradient-2 bg-clip-text hover:text-transparent transition-all ease-in duration-300 ${
        customStyle ?? ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseOut={() => setIsPressed(false)}
    >
      {LinkIcon && icon.pos === "left" && <LinkIcon {...iconProps} />}
      {label}
      {LinkIcon && icon.pos === "right" && <LinkIcon {...iconProps} />}
    </Link>
  );
}
