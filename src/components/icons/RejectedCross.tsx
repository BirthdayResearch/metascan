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
        stroke="url(#paint0_linear_2291_8386)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 4L4 20"
        stroke="url(#paint1_linear_2291_8386)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2291_8386"
          x1="5.55129"
          y1="0.821434"
          x2="36.2373"
          y2="5.45941"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0393797" stopColor="#BE0000" />
          <stop offset="0.369652" stopColor="#FF12AF" />
          <stop offset="0.654866" stopColor="#B117B3" />
          <stop offset="0.809562" stopColor="#0821BB" />
          <stop offset="1" stopColor="#42F9C2" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2291_8386"
          x1="23.1786"
          y1="5.55129"
          x2="18.5406"
          y2="36.2373"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0393797" stopColor="#BE0000" />
          <stop offset="0.369652" stopColor="#FF12AF" />
          <stop offset="0.654866" stopColor="#B117B3" />
          <stop offset="0.809562" stopColor="#0821BB" />
          <stop offset="1" stopColor="#42F9C2" />
        </linearGradient>
      </defs>
    </svg>
  );
}
