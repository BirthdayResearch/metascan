import clsx from "clsx";

export default function TransactionRowLoader() {
  return (
    <div>
      {/* For desktop and tablet */}
      <div className="hidden md:block">
        <div className="grid grid-cols-8 xl:grid-cols-12 gap-x-5 gap-y-3 py-4">
          {/* First col */}
          <div className="col-start-1 col-end-3">
            <div className="flex gap-2 md:gap-4 items-center">
              <div className="w-6 h-6 rounded-full bg-dark-200" />
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex flex-col overflow-hidden rounded-[5px] flex-1 ">
                  <div className="h-3 lg:h-6  bg-dark-200 rounded-[5px] " />
                </div>
                <div className="flex flex-col overflow-hidden rounded-[5px] flex-1 ">
                  <div className="h-3 lg:h-6  bg-dark-200 rounded-[5px] " />
                </div>
              </div>
            </div>
          </div>
          {/* Second col */}
          <div
            className={clsx(
              "col-start-1 col-end-7 ml-10 lg:ml-0",
              "lg:col-start-4 lg:col-end-8",
              "xl:col-start-5 xl:col-end-10"
            )}
          >
            {/* First row */}
            <div className="h-3 lg:h-6 w-[186px] bg-dark-200 rounded-[5px]" />
            {/* Second row */}
            <div className="grid grid-cols-12 gap-1 mt-1">
              <div className="h-3 lg:h-6 flex gap-1 col-start-1 col-end-4 bg-dark-200 rounded-[5px]" />
              <div className="h-3 lg:h-6 flex gap-1 col-start-6 lg:col-start-7 xl:col-start-6 col-end-9 bg-dark-200 rounded-[5px]" />
            </div>
          </div>
          {/* Third col */}
          <div className="flex flex-col items-end row-start-1 col-start-7 md:col-start-4 lg:col-start-8 col-end-9 xl:col-start-11 xl:col-end-13 justify-self-end">
            <div className="h-3  lg:h-6 w-[186px] bg-dark-200 rounded-[5px]" />
            <div className="h-3  lg:h-6 w-[146px] bg-dark-200 rounded-[5px] mt-1" />
          </div>
        </div>
      </div>

      {/* For mobile */}
      <div className="md:hidden pt-4 pb-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center">
            <div className="w-6 h-6 rounded-full bg-dark-200" />
            <div className="flex flex-col overflow-hidden ml-2 text-base">
              <div className="h-4 w-[124px] bg-dark-200 rounded-[5px]" />
            </div>
          </div>
          <div className="text-right">
            <div className="h-4 w-[72px] bg-dark-200 rounded-[5px]" />
          </div>
        </div>
        <div className="ml-8">
          <div className="h-4 w-[144px] bg-dark-200 rounded-[5px] mt-2" />

          <div className="h-[14px] w-[44px] bg-dark-200 rounded-[5px] mt-1" />
          <div className="h-[14px] bg-dark-200 rounded-[5px] mt-4 w-3/6" />
          <div className="h-[14px] bg-dark-200 rounded-[5px] mt-2 w-4/6" />
          <div className="h-[14px] bg-dark-200 rounded-[5px] mt-2 w-3/6" />
        </div>
      </div>
      <div className="border-b border-black-600" />
    </div>
  );
}
