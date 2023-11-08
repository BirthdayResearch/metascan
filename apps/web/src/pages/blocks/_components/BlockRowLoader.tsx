export default function BlockRowLoader() {
  return (
    <div>
      {/* for desktop and tablet */}
      <div className="hidden md:block">
        <div className="grid grid-cols-5 lg:grid-cols-11 gap-5 py-4">
          <div className="col-start-1 col-end-3">
            <div className="flex gap-y-1 lg:flex-row">
              <div className="bg-dark-200 rounded-full mr-1 w-[24px] h-[24px]" />
              <div className="bg-dark-200 rounded-[5px] ml-3 w-9/12 h-[12px] lg:h-[24px]" />
            </div>
          </div>
          <div className="grid col-start-3 col-end-5 lg:col-start-3 lg:col-end-8">
            <div className="grid gap-y-1 lg:flex flex-col lg:flex-row">
              <div className="bg-dark-200 rounded-[5px] lg:mr-5 lg:w-9/12" />
              <div className="bg-dark-200 rounded-[5px] lg:mr-10 lg:w-9/12" />
            </div>
          </div>
          <div className="grid col-start-5 col-end-11 lg:col-start-8 lg:col-end-13">
            <div className="grid gap-y-1 lg:flex flex-col lg:flex-row">
              <div className="bg-dark-200 rounded-[5px] lg:mr-[24px] lg:w-9/12" />
              <div className="bg-dark-200 rounded-[5px] lg:w-6/12" />
            </div>
          </div>
        </div>
      </div>

      {/* For mobile */}
      <div className="md:hidden py-6">
        <div className="flex flex-row pb-2">
          <div className="bg-dark-200 rounded-full mr-1 w-[24px] h-[24px]" />
          <div className="bg-dark-200 rounded-[5px] ml-3 w-1/2 h-[12px]" />
        </div>
        <div className="ml-10 grid gap-2">
          <div className="bg-dark-200 rounded-[5px] w-9/12 h-[12px]" />
          <div className="bg-dark-200 rounded-[5px] w-9/12 h-[12px]" />
          <div className="bg-dark-200 rounded-[5px] w-8/12 h-[12px]" />
          <div className="bg-dark-200 rounded-[5px] w-5/12 h-[12px]" />
        </div>
      </div>
      <div className="border-b border-black-600 ml-8 lg:ml-10" />
    </div>
  );
}
