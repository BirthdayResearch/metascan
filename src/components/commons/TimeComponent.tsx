import { secondsToDhmsDisplay } from "shared/durationHelper";

export function TimeComponent({
  time,
  containerClass,
}: {
  time: number;
  containerClass?: string;
}): JSX.Element {
  return (
    <div className={containerClass}>
      <span className="text-white-700 text-base">
        {secondsToDhmsDisplay(time)} ago
      </span>
    </div>
  );
}
