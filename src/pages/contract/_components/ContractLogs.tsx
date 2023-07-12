import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useGetAddressLogsMutation,
  LogsWithPaginationProps,
  LogsPageParamsProps,
} from "@store/address";
import LinkText from "@components/commons/LinkText";
import { useNetwork } from "@contexts/NetworkContext";
import PaginationLoader from "@components/skeletonLoaders/PaginationLoader";
import Pagination from "@components/commons/Pagination";

export default function ContractLogs() {
  const { connection } = useNetwork();
  const router = useRouter();
  const { cid, ...params } = router.query;
  const contractId = cid as string;

  const [data, setData] = useState<LogsWithPaginationProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [trigger] = useGetAddressLogsMutation();

  const fetchLogs = async () => {
    setIsLoading(true);
    const logsData = await trigger({
      network: connection,
      addressHash: contractId,
      itemsCount: params.items_count as string,
      blockNumber: params.block_number as string,
      index: params.index as string,
    }).unwrap();
    setData(logsData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, [router.query.page_number]);

  const logs = data?.items ?? [];
  if (!isLoading && logs.length === 0) {
    return <div className="text-white-50 mt-6">No logs</div>;
  }

  const pageNumber = Number(router.query.page_number ?? 1);
  const showPagination =
    pageNumber > 1 || (pageNumber === 1 && logs.length === 50);

  const rowCss = "flex gap-2";
  return (
    <div>
      {showPagination && (
        <LogsPagination
          contractId={contractId}
          nextPageParams={data?.next_page_params}
          isLoading={isLoading}
          containerClass="relative"
        />
      )}

      <div className="flex flex-col gap-12 md:gap-6 lg:gap-7 pt-7">
        {logs.map((log) => (
          <>
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
                      <div className="flex flex-col lg:flex-row lg:gap-1 text-white-50 break-all text-right sm:text-left">
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
          </>
        ))}
      </div>

      {showPagination && (
        <LogsPagination
          contractId={contractId}
          nextPageParams={data?.next_page_params}
          isLoading={isLoading}
          containerClass="relative h-10 md:h-6 lg:pt-1.5"
        />
      )}
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
  contractId,
  nextPageParams,
  isLoading,
  containerClass = "",
}: {
  contractId: string;
  isLoading: boolean;
  nextPageParams?: LogsPageParamsProps;
  containerClass?: string;
}) {
  return (
    <div className={containerClass}>
      {isLoading && (
        <PaginationLoader customStyle="top-0 lg:top-auto right-0 bottom-0 lg:-bottom-[22px]" />
      )}
      <Pagination<LogsPageParamsProps & { page_number?: string }>
        pathname={`/contract/${contractId}`}
        nextPageParams={
          nextPageParams
            ? {
                items_count: nextPageParams.items_count,
                block_number: nextPageParams.block_number,
                index: nextPageParams.index,
              }
            : undefined
        }
      />
    </div>
  );
}
