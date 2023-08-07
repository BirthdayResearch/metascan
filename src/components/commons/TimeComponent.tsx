import { getDuration } from "shared/durationHelper";

export function TimeComponent({
  time,
  containerClass,
  testId,
}: {
  time: number;
  containerClass?: string;
  testId?: string;
}): JSX.Element {
  return (
    <div data-testid={testId} className={containerClass}>
      <span className="text-white-700 text-sm md:text-base">
        {getDuration(time)} ago
      </span>
    </div>
  );
}
