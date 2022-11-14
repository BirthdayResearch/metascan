interface NetworkIconProps {
  size?: number;
  className?: string;
}

export function RejectedCross({
  size = 24,
  className,
}: NetworkIconProps): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 4L20 20"
        stroke="url(#red-gradient-1)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 4L4 20"
        stroke="url(#red-gradient-2)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
