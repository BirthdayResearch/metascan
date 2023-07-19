import clsx from "clsx";

export default function SubmitButton({
  onClick,
  disabled,
  label,
  testId,
}: {
  label: string;
  testId: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      data-testid={`${testId}-button`}
      type="button"
      className={clsx(
        "bg-white-50 rounded-[24px] px-4 py-2 w-full md:w-fit",
        "text-black-900 font-medium tracking-[0.02em] text-sm",
        "hover:bg-white-300 active:opacity-70",
        "disabled:bg-white-50 disabled:opacity-30"
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
