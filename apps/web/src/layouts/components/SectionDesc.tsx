import clsx from "clsx";

export default function SectionDesc({ title, customStyle, customTextStyle }: { title: string; customStyle?: string ; customTextStyle?: string}): JSX.Element {
  return (
    <div className={clsx("flex flex-col items-center text-center my-4 mx-1 md:mx-[148px] lg:mx-0", customStyle)}>
      <span
        className={clsx(
          "font-semibold text-white-50 text-sm leading-10 -tracking-[0.01em]",
            customTextStyle
        )}
      >
        {title}
      </span>
    </div>
  );
}
