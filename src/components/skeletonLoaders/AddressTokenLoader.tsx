export default function AddressTokenLoader(): JSX.Element {
  return (
    <>
      <div className="hidden lg:block">
        <div className="grid grid-cols-7 py-5">
          <div className="h-[18px] w-[136px] bg-dark-200 rounded-[5px]" />
          <div className="h-[18px] w-[80px] bg-dark-200 rounded-[5px]" />
          <div className="h-[18px] w-[80px] bg-dark-200 rounded-[5px]" />
          <div className="col-span-2 text-right">
            <div className="h-[18px] w-[136px] bg-dark-200 rounded-[5px] float-right	" />
          </div>
          <div className="col-span-2 text-right">
            <div className="h-[18px] w-[156px] bg-dark-200 rounded-[5px] float-right	" />
          </div>
        </div>
        <div className="bg-black-600 h-[1px]" />
      </div>
      {/* tablet and mobile */}
      <div className="lg:hidden">
        <div className="py-3 space-y-3">
          <div className="h-7 w-2/4 bg-dark-200 rounded-[5px]" />
          <div className="flex flex-row justify-between">
            <div className="h-[18px] w-1/6 bg-dark-200 rounded-[5px]" />
            <div className="h-[18px] w-1/4 bg-dark-200 rounded-[5px]" />
          </div>
          <div className="flex flex-row justify-between">
            <div className="h-[18px] w-1/5 bg-dark-200 rounded-[5px]" />
            <div className="h-[18px] w-1/4 bg-dark-200 rounded-[5px]" />
          </div>
          <div className="flex flex-row justify-between">
            <div className="h-[18px] w-2/6 bg-dark-200 rounded-[5px]" />
            <div className="h-[18px] w-2/4 bg-dark-200 rounded-[5px]" />
          </div>
          <div className="flex flex-row justify-between">
            <div className="h-[18px] w-4/12 bg-dark-200 rounded-[5px]" />
            <div className="h-[18px] w-5/12 bg-dark-200 rounded-[5px]" />
          </div>
        </div>
        <div className="bg-black-600 h-[1px] my-4" />
      </div>
    </>
  );
}
