import clsx from "clsx";

export default function SectionTitle({
  title,
}: {
  title: string;
}): JSX.Element {
  return (
    <div className="flex flex-col items-center text-center mt-[88px] md:mt-24 mx-1 md:mx-[148px] lg:mx-0 mb-6">
      <span
        className={clsx(
          "font-semibold text-white-50 text-[32px] leading-10 -tracking-[0.01em]",
          "md:text-5xl md:leading-[56px] md:-tracking-[0.02em]",
        )}
      >
        {title}
      </span>
    </div>
  );
}
