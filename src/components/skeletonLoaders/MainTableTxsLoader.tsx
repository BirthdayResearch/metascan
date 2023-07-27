import clsx from "clsx";

export default function MainTableTxs() {
  const valueStyle = "h-3 md:h-4 lg:h-6 bg-dark-200 rounded";
  return (
    <div>
      <div className="py-5">
        <div className="flex gap-2">
          <div className="rounded-full w-6 h-6 bg-dark-200 shrink-0" />
          <div className="grid grid-cols-4 xl:grid-cols-12 w-full gap-8">
            <div
              className={clsx(
                "col-span-1 mt-[6px] xl:col-span-2 lg:mr-4 xl:mr-0",
                "w-[124px] md:w-auto md:mt-0",
                valueStyle
              )}
            />

            {/* from & to */}
            <div
              className={clsx(
                "col-span-2 gap-4 grid w-3/4",
                "col-start-1 md:col-start-2 md:gap-2 md:-ml-4",
                "xl:col-span-5 xl:gap-5 xl:grid-cols-2 xl:w-full xl:ml-0"
              )}
            >
              <div className={clsx("w-36 md:w-auto", valueStyle)} />
              <div className={clsx("w-32 md:w-auto", valueStyle)} />
              <div className={clsx("w-[184px] md:hidden", valueStyle)} />
            </div>

            {/* amount & timeago */}
            <div className="col-span-1 col-end-5 xl:col-end-13 xl:col-span-4 gap-2 xl:gap-5 xl:grid-cols-2 -ml-4 lg:ml-0 hidden md:grid">
              <div className={clsx(valueStyle)} />
              <div className={clsx(valueStyle)} />
            </div>

            {/* timeago in mobile */}
            <div
              className={clsx(
                "col-span-1 row-start-1 col-end-5 md:hidden w-[72px] -ml-5 mt-[6px]",
                valueStyle
              )}
            />
          </div>
        </div>
      </div>
      <div className="border-b border-black-600 ml-8 lg:ml-10" />
    </div>
  );
}
