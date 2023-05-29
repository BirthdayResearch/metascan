export default function TransactionRowLoader() {
  return (
    <div>
      {/* For desktop */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-8 lg:grid-cols-12 gap-5 py-4">
          <div className="col-start-1 col-end-3">
            <div className="flex flex-row">
              <div className="w-6 h-6 rounded-full bg-dark-200" />
              <div className="flex flex-col overflow-hidden ml-4 rounded-[5px]">
                <div className="h-[14px] lg:h-6 w-[136px] bg-dark-200 rounded-[5px]" />
              </div>
            </div>
            <div className="flex flex-row mt-[18px] lg:mt-3">
              <div className="w-6" />
              <div className="flex flex-col overflow-hidden ml-4 rounded-[5px]">
                <div className="h-[14px] lg:h-6 w-[136px] bg-dark-200" />
              </div>
            </div>
          </div>
          <div className="col-start-3 col-end-7 lg:col-start-4 lg:col-end-10">
            <div className="h-[14px] lg:h-6 w-[212px] bg-dark-200 rounded-[5px]" />
            <div className="grid grid-cols-4 lg:grid-cols-6 gap-5 mt-2 lg:mt-3">
              <div className="h-[14px] lg:h-6 w-[136px] bg-dark-200 rounded-[5px]" />
              <div className="h-[14px] lg:h-6 w-[136px] bg-dark-200 rounded-[5px] ml-12" />
            </div>
          </div>
          <div className="col-start-11 col-end-13 gap-2 grid justify-items-end justify-end">
            <div className="h-[14px] lg:h-6 w-[136px] bg-dark-200 rounded-[5px]" />
            <div className="h-[14px] lg:h-6 w-[136px] bg-dark-200 rounded-[5px]" />
          </div>
        </div>
      </div>

      {/* For tablet */}
      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-8 gap-5 py-4">
          <div className="col-start-1 col-end-3">
            <div className="flex flex-row">
              <div className="w-6 h-6 rounded-full bg-dark-200 mr-4" />
              <div className="h-3 w-[136px] bg-dark-200 rounded-[5px]" />
            </div>
            <div className="flex flex-col gap-3 items-end mt-2">
              <div className="h-3 w-[103px] bg-dark-200 rounded-[5px]" />
              <div className="h-3 w-[103px] bg-dark-200 rounded-[5px]" />
            </div>
          </div>
          <div className="col-start-3 col-end-7 lg:col-start-4 lg:col-end-10">
            <div className="h-3 w-[212px] bg-dark-200 rounded-[5px]" />
            <div className="flex flex-row mt-[18px]">
              <div className="flex flex-col gap-3">
                <div className="h-3 w-[120px] bg-dark-200 rounded-[5px]" />
                <div className="h-3 w-[120px] bg-dark-200 rounded-[5px] lg:ml-11" />
              </div>
              <div className="flex flex-col gap-3 ml-2">
                <div className="h-3 w-[120px] bg-dark-200 rounded-[5px]" />
                <div className="h-3 w-[120px] bg-dark-200 rounded-[5px] lg:ml-11" />
              </div>
            </div>
          </div>
          <div className="col-start-7 col-end-9 lg:col-start-11 lg:col-end-13 justify-self-end">
            <div className="h-3 w-[136px] bg-dark-200 rounded-[5px]" />
          </div>
        </div>
      </div>

      {/* For mobile */}
      <div className="md:hidden py-6">
        <div className="flex flex-row justify-between mb-[22px]">
          <div className="flex flex-row items-center">
            <div className="w-6 h-6 rounded-full bg-dark-200" />
            <div className="flex flex-col overflow-hidden ml-2 text-base">
              <div className="h-3 w-[124px] bg-dark-200 rounded-[5px]" />
            </div>
          </div>
          <div className="text-right items-center flex">
            <div className="h-3 w-[72px] bg-dark-200 rounded-[5px]" />
          </div>
        </div>
        <div className="ml-8 grid gap-4">
          <div className="h-3 w-[176px] bg-dark-200 rounded-[5px]" />
          <div className="h-3 w-[144px] bg-dark-200 rounded-[5px]" />
          <div className="h-3 w-[144px] bg-dark-200 rounded-[5px]" />
          <div className="h-3 w-[128px] bg-dark-200 rounded-[5px]" />
          <div className="h-3 w-[184px] bg-dark-200 rounded-[5px]" />
        </div>
      </div>
      <div className="border-b border-black-600 ml-8 lg:ml-10" />
    </div>
  );
}
