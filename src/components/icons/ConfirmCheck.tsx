interface ConfirmCheckProps {
  size?: number;
  className?: string;
}

export function ConfirmCheck({
  size = 24,
  className,
}: ConfirmCheckProps): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M3 11.8332L8.80565 17.6926C8.97333 17.8619 9.24685 17.8619 9.41453 17.6926L21 5.99988"
        stroke="url(#brand-gradient-2)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
