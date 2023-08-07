export default function TokenHoldersLoader(): JSX.Element {
  return (
    <div className="flex items-center gap-1 md:gap-3 lg:gap-6 py-[18px] border-b-[0.5px] border-dark-200">
      <div className="h-6 w-5 md:w-7 lg:w-8 mr-2 md:mr-1 lg:mr-2 bg-dark-200 rounded" />
      <div className="flex flex-col gap-1 w-full">
        <div className="h-6 w-40 bg-dark-200 rounded" />
        <div className="flex gap-2">
          <div className="h-6 w-5/6 md:w-80 bg-dark-200 rounded" />
          <div className="h-6 w-1/6 md:w-14 bg-dark-200 rounded" />
        </div>
      </div>
    </div>
  );
}
