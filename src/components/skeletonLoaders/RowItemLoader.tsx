export default function RowItemLoader(): JSX.Element {
  return (
    <div>
      <div className="py-5 md:flex md:flex-wrap md:items-start lg:flex-nowrap xl:gap-5">
        <div className="w-2/4 inline-flex items-center md:w-32 lg:w-36">
          <span className="mr-2">
            <div className="w-6 h-6 rounded-full bg-dark-200" />
          </span>
          <div className="h-[14px] lg:h-6 w-[136px] bg-dark-200 rounded-[5px]" />
        </div>

        {/* last col */}
        <div className="w-2/4 inline-flex justify-end align-top md:order-last md:grow md:-mt-10 lg:mt-0 lg:w-20 xl:w-32 lg:pl-5 xl:pl-0 md:flex md:flex-col md:items-end md:gap-3">
          <div className="h-[14px] w-4/12 lg:h-6 bg-dark-200 rounded-[5px]" />
          <div className="h-[14px] w-4/12  lg:h-6 bg-dark-200 rounded-[5px] lg:hidden md:block hidden" />
        </div>
        <div className="md:w-4/12 md:pl-5 ml-8 md:ml-0 lg:flex lg:w-96 lg:pl-12">
          <div className="flex pt-5 md:pt-0 lg:w-48">
            <div className="w-4/5 lg:w-36">
              <div className="h-[14px] lg:h-6 w-[144px] md:w-[136px] bg-dark-200 rounded-[5px]" />
            </div>
          </div>
          <div className="flex pt-1.5 md:pt-2.5 lg:pt-0 lg:w-48 xl:ml-11">
            <div className="w-4/5 lg:w-36">
              <div className="h-[14px] lg:h-6 w-[128px] md:w-[136px] bg-dark-200 rounded-[5px]" />
            </div>
          </div>
          <div className="pt-1.5 md:pt-2.5 lg:pt-0 lg:w-48 xl:ml-11 block md:hidden">
            <div className="w-4/5 lg:w-36">
              <div className="h-[14px] lg:h-6 w-[184px] md:[136px] bg-dark-200 rounded-[5px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-black-600 ml-8 lg:ml-10" />
    </div>
  );
}
