import clsx from "clsx";
import Button from "./commons/Button";
import GradientCardContainer from "./commons/GradientCardContainer";
import {
  SkeletonLoader,
  SkeletonLoaderScreen,
} from "./skeletonLoaders/SkeletonLoader";
import BlockRowItem from "./latestDataTable/BlockRowItem";
import { RowData } from "./types";
import TransactionRowItem from "./latestDataTable/TransactionRowItem";

type DataType = "blocks" | "transactions";

interface Props {
  type: DataType;
  title: string;
  data?: RowData[];
  listPageUrl: string;
  detailsPageBaseUrl: string;
  containerClass?: string;
  isLoading?: boolean;
}

export default function LatestDataTable({
  type,
  title,
  data,
  listPageUrl,
  detailsPageBaseUrl,
  isLoading,
  containerClass = "",
}: Props): JSX.Element {
  return (
    <div
      data-testid={`latest-${type}-table`}
      className={`${containerClass ?? ""}`}
    >
      <GradientCardContainer>
        <div className="p-5 py-6 md:p-10">
          <div className="flex flex-col md:grid md:grid-cols-6 md:items-center">
            <h2
              data-testid={`latest-${type}-title`}
              className="text-white-50 font-bold text-xl md:text-2xl leading-8 pb-4 md:pb-0 md:col-span-3"
            >
              {title}
            </h2>
            <div className="md:order-last md:flex-1 md:pt-6 md:col-span-8">
              {isLoading ? (
                <SkeletonLoader
                  screen={SkeletonLoaderScreen.MainTable}
                  rows={5}
                />
              ) : (
                <>
                  {data.map((row, index) => (
                    <div key={row.transactionId}>
                      {type === "blocks" ? (
                        <BlockRowItem
                          rowIndex={index}
                          rowData={row}
                          detailsPageBaseUrl={detailsPageBaseUrl}
                        />
                      ) : (
                        <TransactionRowItem
                          rowIndex={index}
                          rowData={row}
                          detailsPageBaseUrl={detailsPageBaseUrl}
                        />
                      )}

                      <div
                        className={clsx(
                          "w-[calc(100% - 16px)] h-7 md:h-5 border-b border-black-600",
                          { hidden: data.length === index + 1 }
                        )}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="pt-[45px] md:pt-0 md:col-span-3 md:col-end-auto">
              <div className="md:flex md:justify-end md:text-right">
                <Button
                  testId={`view-${type}`}
                  label={`View all ${type}`}
                  href={listPageUrl}
                  customStyle="w-full md:w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </GradientCardContainer>
    </div>
  );
}
