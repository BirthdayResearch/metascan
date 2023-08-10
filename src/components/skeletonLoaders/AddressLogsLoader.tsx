export default function AddressLogsLoader(): JSX.Element {
  return (
    <div className="flex flex-col gap-12 md:gap-6 lg:gap-7 mt-7">
      {/* Tx hash */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-4 md:gap-2 h-4">
          <div className="h-4 w-28 md:w-[168px] lg:w-64">
            <div className="h-4 bg-dark-200 rounded w-full md:w-3/4" />
          </div>
          <div className="h-4 w-full lg:w-1/2 bg-dark-200 rounded" />
        </div>
        {/* Topics */}
        <div className="flex gap-4 md:gap-2">
          <div className="h-4 w-28 md:w-[168px] lg:w-64">
            <div className="h-4 bg-dark-200 rounded w-full md:w-3/4" />
          </div>
          <div className="flex flex-col gap-3 md:gap-2 w-full lg:w-1/2">
            <div className="h-4 bg-dark-200 rounded" />
            <div className="h-4 bg-dark-200 rounded" />
            <div className="h-4 bg-dark-200 rounded" />
          </div>
        </div>
        {/* Data */}
        <div className="flex gap-4 md:gap-2">
          <div className="h-4 w-28 md:w-[168px] lg:w-64">
            <div className="h-4 bg-dark-200 rounded w-full md:w-3/4" />
          </div>
          <div className="h-4 w-full lg:w-1/2 bg-dark-200 rounded" />
        </div>
      </div>
      <div className="h-[0.5px] bg-dark-200" />
    </div>
  );
}
