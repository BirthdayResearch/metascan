import clsx from "clsx";

export default function MainTableTxs() {
  const valueStyle = "h-3 md:h-4 lg:h-6 bg-dark-200 rounded";
  return (
    <div>
      <div className="py-5">
        <div className="hidden md:flex items-center gap-2">
          <div className="rounded-full w-6 h-6 bg-dark-200 shrink-0" />

          {/* desktop */}
          <div className="hidden xl:grid grid-cols-4 w-full gap-16">
            <div className={clsx("w-full", valueStyle)} />
            <div className={clsx("w-full", valueStyle)} />
            <div className={clsx("w-full", valueStyle)} />
            <div className={clsx("w-full", valueStyle)} />
          </div>

          {/* tablet */}
          <div className="xl:hidden grid grid-cols-3 grid-rows-2 w-full gap-x-16 gap-y-2">
            <div className={clsx("w-full", valueStyle)} />
            <div className={clsx("w-full", valueStyle)} />
            <div className={clsx("w-full", valueStyle)} />
            <div className={clsx("w-full", valueStyle)} />
            <div className={clsx("w-full", valueStyle)} />
            <div className={clsx("w-full", valueStyle)} />
          </div>
        </div>

        {/* mobile */}
        <div className="md:hidden flex flex-col gap-y-6">
          <div className="flex items-center gap-2 w-full">
            <div className="rounded-full w-6 h-6 bg-dark-200 shrink-0" />
            <div className="flex justify-between w-full">
              <div className={clsx("w-2/4", valueStyle)} />
              <div className={clsx("w-1/4", valueStyle)} />
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 w-full gap-x-12 gap-y-4">
            <div className={clsx(valueStyle)} />
            <div className={clsx(valueStyle)} />
            <div className={clsx(valueStyle)} />
            <div className={clsx(valueStyle)} />
          </div>
        </div>
      </div>
      <div className="border-b border-black-600 ml-8 lg:ml-10" />
    </div>
  );
}
