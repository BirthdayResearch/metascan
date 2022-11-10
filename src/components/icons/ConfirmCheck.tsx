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
        stroke="url(#paint0_linear_2291_8195)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2291_8195"
          x1="4.7452"
          y1="3.61595"
          x2="24.7519"
          y2="10.7907"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#42F9C2" />
          <stop offset="1" stopColor="#082FD4" />
        </linearGradient>
      </defs>
    </svg>
  );
}
