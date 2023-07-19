import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useGetAddressLogsMutation,
  LogsPageParamsProps,
  Log,
} from "@store/address";
import LinkText from "@components/commons/LinkText";
import { useNetwork } from "@contexts/NetworkContext";
import PaginationLoader from "@components/skeletonLoaders/PaginationLoader";
import Pagination from "@components/commons/Pagination";
import {
  SkeletonLoader,
  SkeletonLoaderScreen,
} from "@components/skeletonLoaders/SkeletonLoader";
import { sleep } from "shared/sleep";

export default function LogsList({ addressHash }: { addressHash: string }) {
  const { connection } = useNetwork();
  const [logs, setLogs] = useState<Log[]>([]);
  const [nextPage, setNextPage] = useState<LogsPageParamsProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [trigger] = useGetAddressLogsMutation();
  const router = useRouter();

  const params = router.query;
  const fetchLogs = async () => {
    const data = await trigger({
      network: connection,
      itemsCount: params.items_count as string,
      blockNumber: params.block_number as string,
      index: params.index as string,
      addressHash,
    }).unwrap();
    setLogs(data.items);
    setNextPage(data.next_page_params);
    await sleep(150); // added timeout to prevent flicker
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, [params.page_number, addressHash]);

  if (!isLoading && logs.length === 0) {
    return <div className="text-white-50">No logs</div>;
  }

  const rowCss = "flex gap-2";
  return (
    <div>
      <LogsPagination
        addressHash={addressHash}
        nextPageParams={nextPage}
        isLoading={isLoading}
        containerClass="relative"
        loaderClass="right-1 top-0"
      />
      <div className="flex flex-col gap-12 md:gap-6 lg:gap-7 mt-7">
        {isLoading ? (
          <SkeletonLoader rows={7} screen={SkeletonLoaderScreen.AddressLogs} />
        ) : (
          logs.map((log) => (
            <Fragment key={log.tx_hash}>
              <div className="flex flex-col gap-3">
                <div className={rowCss}>
                  <LogDetailTitle title="Transaction" />
                  <LinkText
                    href={`/tx/${log.tx_hash}`}
                    label={log.tx_hash}
                    customStyle="break-all text-right sm:text-left"
                  />
                </div>
                <div className={rowCss}>
                  <LogDetailTitle title="Topics" />
                  <div className="flex flex-col gap-3 md:gap-2">
                    {log.topics
                      .filter((t) => t)
                      .map((topic, i) => (
                        <div
                          key={i}
                          className="flex flex-col lg:flex-row lg:gap-1 text-white-50 break-all text-right sm:text-left"
                        >
                          <span>[{i}]</span>
                          <span>{topic}</span>
                        </div>
                      ))}
                  </div>
                </div>
                <div className={rowCss}>
                  <LogDetailTitle title="Data" />
                  <div className="text-white-50 break-all text-right sm:text-left">
                    {log.data}
                  </div>
                </div>
              </div>
              <div className="h-[0.5px] bg-dark-200" />
            </Fragment>
          ))
        )}
      </div>
      <LogsPagination
        addressHash={addressHash}
        nextPageParams={nextPage}
        isLoading={isLoading}
        containerClass="relative h-10 md:h-6 lg:pt-1.5"
        loaderClass="top-0 lg:top-auto right-0 bottom-0 lg:-bottom-[22px]"
      />
    </div>
  );
}

function LogDetailTitle({ title }: { title: string }) {
  return (
    <div className="text-white-700 shrink-0 w-28 md:w-[168px] lg:w-64">
      {title}
    </div>
  );
}

function LogsPagination({
  addressHash,
  nextPageParams,
  isLoading,
  containerClass = "",
  loaderClass = "",
}: {
  addressHash: string;
  isLoading: boolean;
  nextPageParams?: LogsPageParamsProps;
  containerClass?: string;
  loaderClass?: string;
}) {
  return (
    <div className={containerClass}>
      {isLoading && <PaginationLoader customStyle={loaderClass} />}
      <Pagination<LogsPageParamsProps & { page_number?: string }>
        pathname={`/address/${addressHash}`}
        nextPageParams={
          nextPageParams
            ? {
                items_count: nextPageParams.items_count,
                block_number: nextPageParams.block_number,
                index: nextPageParams.index,
              }
            : undefined
        }
        shallow
      />
    </div>
  );
}
