export default function TransactionRowLoader() {
  return (
    <div>
      {/* For desktop and tablet */}
      <div className="hidden md:block">
        <div className="grid grid-cols-8 lg:grid-cols-12 gap-5 py-4">
          {/* First col */}
          <div className="col-start-1 col-end-3 lg:col-end-4 lg:mr-8">
            <div className="flex flex-row">
              <div className="w-6 h-6 rounded-full bg-dark-200" />
              <div className="flex flex-col overflow-hidden ml-2 lg:ml-3 rounded-[5px] w-full">
                <div className="h-3 lg:h-6 w-full bg-dark-200 rounded-[5px] ml-1" />
              </div>
            </div>
            {/* Second row */}
            <div className="flex flex-col lg:flex-row ml-8 lg:ml-9 lg:mt-3">
              <span className="w-full gap-y-2 grid">
                <div className="h-3 lg:h-6 w-full bg-dark-200 rounded-[5px]" />
                <div className="h-3 lg:h-6 w-full bg-dark-200 rounded-[5px] md:block lg:hidden" />
              </span>
            </div>
          </div>
          {/* Second col */}
          <div className="col-start-3 col-end-7 lg:col-start-4 lg:col-end-10">
            {/* First row */}
            <div className="h-3 lg:h-6 w-[176px] bg-dark-200 rounded-[5px]" />
            {/* Second row */}
            <div className="gap-y-2 grid grid-cols-2 lg:flex lg:flex-row lg:gap-x-[12px] w-10/12 lg:w-7/12 mt-2 lg:mt-3">
              <div className="h-3 lg:h-6 w-10/12 lg:w-1/2 bg-dark-200 rounded-[5px]" />
              <div className="h-3 lg:h-6 w-10/12 lg:w-1/2 bg-dark-200 rounded-[5px]" />
              <div className="h-3 lg:h-6 w-10/12 bg-dark-200 rounded-[5px] lg:hidden" />
              <div className="h-3 lg:h-6 w-10/12 bg-dark-200 rounded-[5px] lg:hidden" />
            </div>
          </div>
          {/* Third col */}
          <div className="col-start-7 col-end-9 lg:col-start-10 lg:col-end-13">
            <div className="h-3 lg:h-6 bg-dark-200 rounded-[5px]" />
            <div className="mt-2 lg:mt-3 flex justify-end">
              <div className="h-3 lg:h-6 w-9/12 bg-dark-200 rounded-[5px] md:hidden lg:block" />
            </div>
          </div>
        </div>
      </div>

      {/* For mobile */}
      <div className="md:hidden py-6">
        <div className="flex flex-row justify-between mb-[22px]">
          <div className="flex flex-row items-center">
            <div className="w-6 h-6 rounded-full bg-dark-200" />
            <div className="flex flex-col overflow-hidden ml-2 text-base">
              <div className="h-3 lg:h-6 w-[124px] bg-dark-200 rounded-[5px]" />
            </div>
          </div>
          <div className="text-right items-center flex">
            <div className="h-3 lg:h-6 w-[72px] bg-dark-200 rounded-[5px]" />
          </div>
        </div>
        <div className="ml-8 grid gap-4">
          <div className="h-3 lg:h-6 w-[176px] bg-dark-200 rounded-[5px]" />
          <div className="h-3 lg:h-6 w-[144px] bg-dark-200 rounded-[5px]" />
          <div className="h-3 lg:h-6 w-[144px] bg-dark-200 rounded-[5px]" />
          <div className="h-3 lg:h-6 w-[128px] bg-dark-200 rounded-[5px]" />
          <div className="h-3 lg:h-6 w-[184px] bg-dark-200 rounded-[5px]" />
        </div>
      </div>
      <div className="border-b border-black-600 ml-8 lg:ml-10" />
    </div>
  );
}
