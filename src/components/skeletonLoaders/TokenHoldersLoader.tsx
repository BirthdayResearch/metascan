export default function TokenHoldersLoader(): JSX.Element {
  return (
    <div className="flex items-center gap-6 py-[18px] border-b-[0.5px] border-dark-200">
      <div className="h-4 w-10 bg-dark-200 rounded" />
      <div className="flex flex-col gap-1">
        <div className="h-4 w-[136px] lg:w-96 bg-dark-200 rounded" />
        <div className="h-4 w-[136px] lg:w-96 bg-dark-200 rounded" />
      </div>
    </div>
  );
}
