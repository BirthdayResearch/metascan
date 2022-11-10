import MiddleEllipsis from "react-middle-ellipsis";
import Button from "./Button";
import GradientCardContainer from "./GradientCardContainer";
import LinkText from "./LinkText";

/**
 *
 */
interface Props {
  type: "blocks" | "transactions";
  title: string;
  data: any[];
  href?: string;
  containerClass?: string;
  // actionBtnText: string;
  // onActionBtnClick?: () => void;
}

export default function TransactionTable({
  type,
  title,
  data,
  href = "",
  containerClass = "",
}: // actionBtnText,
// onActionBtnClick,
Props): JSX.Element {
  return (
    <div className={`pb-2 pt-6 lg:pb-6 ${containerClass ?? ""}`}>
      <GradientCardContainer>
        <div className="p-5 py-6 md:p-10">
          {/* start of 3-section div */}
          <div
            className="flex flex-col 
                      md:grid md:grid-cols-6 md:items-center"
          >
            {/* FIRST - TITLE */}
            <h2 className="text-white-50 font-bold text-xl md:text-2xl leading-8 pb-4 md:pb-0 md:col-span-3">
              {title}
            </h2>

            {/* SECOND - MAIN TABLE */}
            <div className="md:order-last md:flex-1 md:pt-6 md:col-span-8">
              {data.map((row) => (
                <RowItem key={row.id} rowData={row} />
              ))}
            </div>

            {/* THIRD - ACTION BUTTON */}
            <div className="pt-5 md:pt-0 md:col-span-3 md:col-end-auto">
              <div className="md:flex md:justify-end md:text-rightt">
                <Button
                  testId=""
                  label={`View all ${type}`}
                  href={href}
                  customStyle="w-full md:w-auto"
                />
              </div>
            </div>
          </div>
          {/* end of 3-section div */}
        </div>
      </GradientCardContainer>
    </div>
  );
}

const DmxTokenSymbol = "DMXTc";
function RowItem({ rowData }: { rowData: any }) {
  return (
    <div
      className="text-white-50 py-5 border-b border-gray-1000/50
                    md:flex md:flex-wrap md:items-start lg:flex-nowrap xl:gap-5"
    >
      <div className="w-2/4 inline-flex items-center md:w-3/12 lg:w-36">
        <MiddleEllipsis>
          <LinkText href="#" label={rowData.transactionId} />
        </MiddleEllipsis>
      </div>
      <div className="w-2/4 inline-flex items-center justify-end text-white-700 text-right md:order-last md:grow md:-mt-6 lg:mt-0 lg:w-20 xl:w-32 lg:pl-5 xl:pl-0">
        {rowData.datetime}
      </div>
      <div className="md:w-5/12 lg:flex lg:w-96 lg:pl-12 xl:gap-5">
        <div className="flex pt-5 md:pt-0 lg:w-48">
          <span className="pr-1">From: </span>
          <div className="w-4/5 lg:w-36">
            <MiddleEllipsis>
              <LinkText href="#" label={rowData.from} />
            </MiddleEllipsis>
          </div>
        </div>
        <div className="flex pt-1.5 lg:pt-0 lg:w-48">
          <span className="pr-1">To: </span>
          <div className="w-4/5 lg:w-36">
            <MiddleEllipsis>
              <LinkText href="#" label={rowData.to} />
            </MiddleEllipsis>
          </div>
        </div>
      </div>
      <div className="pt-5 pr-1 md:grow md:text-right md:p-0 lg:grow xl:w-2/5">
        {rowData.amount} {DmxTokenSymbol}
      </div>
    </div>
  );
}
