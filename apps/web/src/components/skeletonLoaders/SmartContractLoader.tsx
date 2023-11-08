export default function SmartContractLoader(): JSX.Element {
  return (
    <>
      {/* desktop */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12 py-[22px] gap-x-5 items-center">
          <div className="flex flex-row items-center col-span-3 gap-x-4">
            <div className="w-6 h-6 rounded-full bg-dark-200" />
            <div className="flex flex-col flex-1 gap-y-1">
              <div className="h-[18px] w-[136px] bg-dark-200 rounded-[5px]" />
              <div className="h-[14px] w-[136px] bg-dark-200 rounded-[5px]" />
            </div>
          </div>
          <div className="flex flex-row gap-x-2 col-span-2">
            <div className="h-4 w-[136px] bg-dark-200 rounded-[5px]" />
          </div>
          <div className="flex flex-row gap-x-2 col-span-3">
            <div className="h-4 w-[156px] bg-dark-200 rounded-[5px]" />
          </div>
          <div className="flex flex-row gap-x-2 col-span-2">
            <div className="h-4 w-[136px] bg-dark-200 rounded-[5px]" />
          </div>
          <div className="flex flex-row gap-x-2 justify-end col-span-2">
            <div className="h-4 w-[136px] bg-dark-200 rounded-[5px]" />
          </div>
        </div>
        <div className="bg-black-600 h-[1px] my-1" />
      </div>

      {/* tablet */}
      <div className="hidden lg:hidden md:block">
        <div className="grid grid-cols-3 py-6 gap-x-4">
          <div className="flex flex-row gap-x-4 items-center">
            <div className="w-6 h-6 rounded-full bg-dark-200" />
            <div className="flex flex-col flex-1 gap-y-1">
              <div className="h-[18px] w-3/4 bg-dark-200 rounded-[5px] mb-0.5" />
              <div className="h-[14px] w-3/4 bg-dark-200 rounded-[5px]" />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="h-[14px] w-3/4 bg-dark-200 rounded-[5px]" />
            <div className="h-[14px] w-3/4 bg-dark-200 rounded-[5px]" />
          </div>
          <div className="flex flex-col gap-y-2 items-end">
            <div className="h-[14px] w-3/4 bg-dark-200 rounded-[5px]" />
            <div className="h-[14px] w-3/4 bg-dark-200 rounded-[5px]" />
          </div>
        </div>
        <div className="bg-black-600 h-[1px]" />
      </div>

      {/* mobile */}
      <div className="md:hidden sm:block mt-4">
        <div className="flex flex-col py-4 gap-y-2">
          <div className="flex flex-row gap-x-4 items-center mb-2">
            <div className="w-6 h-6 rounded-full bg-dark-200" />
            <div className="flex flex-col flex-1">
              <div className="h-[18px] w-2/4 bg-dark-200 rounded-[5px] mb-0.5" />
              <div className="h-[14px] w-1/4 bg-dark-200 rounded-[5px]" />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="h-[14px] w-1/4 bg-dark-200 rounded-[5px]" />
            <div className="h-[14px] w-1/4 bg-dark-200 rounded-[5px]" />
          </div>
          <div className="flex flex-row justify-between">
            <div className="h-[14px] w-2/6 bg-dark-200 rounded-[5px]" />
            <div className="h-[14px] w-3/6 bg-dark-200 rounded-[5px]" />
          </div>
          <div className="flex flex-row justify-between">
            <div className="h-[14px] w-3/6 bg-dark-200 rounded-[5px]" />
            <div className="h-[14px] w-1/4 bg-dark-200 rounded-[5px]" />
          </div>
          <div className="flex flex-row justify-between">
            <div className="h-[14px] w-1/4 bg-dark-200 rounded-[5px]" />
            <div className="h-[14px] w-1/4 bg-dark-200 rounded-[5px]" />
          </div>
        </div>
        <div className="bg-black-600 h-[1px] my-2" />
      </div>
    </>
  );
}
