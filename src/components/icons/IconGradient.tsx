/**
 * This component is used to define gradient stroke at one place
 * This component imported only once in the Default component
 */
export function IconGradient(): JSX.Element {
  return (
    <svg height={0} width={0} viewBox="0 0 0 0" fill="none">
      <defs>
        <linearGradient
          id="brand-gradient-2"
          x1="4.7452"
          y1="3.61595"
          x2="24.7519"
          y2="10.7907"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#42F9C2" />
          <stop offset="1" stopColor="#082FD4" />
        </linearGradient>
        <linearGradient
          id="red-gradient-1"
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
          id="red-gradient-2"
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
