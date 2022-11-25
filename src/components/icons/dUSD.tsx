interface DUSDProps {
  size?: number;
}

export default function dUSD({ size }: DUSDProps): JSX.Element {
  return (
    <svg height={size} width={size} viewBox="0 0 32 32">
      <path
        d="M32 15.9908C32 24.8268 24.836 31.9908 16 31.9908C7.164 31.9908 0 24.8268 0 15.9908C0 7.15484 7.164 -0.00915527 16 -0.00915527C24.836 -0.00915527 32 7.15484 32 15.9908Z"
        fill="#FFCCEF"
      />
      <path
        d="M15.9704 3.6842L18.5494 4.37527L17.2958 9.05185L21.9734 10.3059L21.2823 12.885L15.8448 11.4272L14.017 12.4833C13.3798 12.8508 13.1617 13.6645 13.5304 14.3025C13.8979 14.9397 14.7116 15.1577 15.3496 14.7891C17.2638 13.685 19.7107 14.3408 20.8157 16.2545C21.8841 18.1067 21.3047 20.4576 19.532 21.6104L19.3508 21.7216L17.2928 22.9092L15.8783 28.1912L13.2992 27.5002L14.5098 22.9758L9.98877 21.7659L10.6792 19.1867L15.9548 20.5982L18.0149 19.4099C18.6522 19.0412 18.8706 18.2261 18.5032 17.5891C18.1357 16.9526 17.3211 16.7343 16.6846 17.1014C14.77 18.2077 12.3222 17.5517 11.2181 15.6374C10.1474 13.7846 10.7273 11.4325 12.5011 10.2817L12.6825 10.1707L14.5158 9.1112L15.9704 3.6842Z"
        fill="#FF00AF"
      />
    </svg>
  );
}
