import clsx from "clsx";

interface BoldedTitleProps {
  title: string;
  testId?: string;
  className?: string;
}

export default function BoldedTitle({
  title,
  testId,
  className,
}: BoldedTitleProps) {
  return (
    <div
      data-testid={testId}
      className={clsx("text-white-50 font-bold", className)}
    >
      {title}
    </div>
  );
}
