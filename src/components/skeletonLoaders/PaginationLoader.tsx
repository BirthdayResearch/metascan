import clsx from "clsx";

export default function PaginationLoader({
  customStyle,
}: {
  customStyle: string;
}): JSX.Element {
  return (
    <div
      className={clsx(
        "bg-dark-200 h-[24px] w-[130px] absolute rounded-[5px]",
        customStyle
      )}
    />
  );
}
