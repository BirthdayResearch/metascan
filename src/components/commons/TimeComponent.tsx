import { getDuration } from "shared/durationHelper";

export function TimeComponent({
  time,
  containerClass,
}: {
  time: number;
  containerClass?: string;
}): JSX.Element {
  return (
    <div className={containerClass}>
      <span className="text-white-700 text-sm md:text-base">
        {getDuration(time)} ago
      </span>
    </div>
  );
}
