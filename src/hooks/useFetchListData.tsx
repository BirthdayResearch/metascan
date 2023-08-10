import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { sleep } from "shared/sleep";
import { PaginationSource } from "enum/tabsTitle";

interface FetchDataParams {
  addressHash: string;
  triggerApiCall: () => any;
  source: PaginationSource;
}

interface FetchDataResponse<T, S> {
  isLoading: boolean;
  data: T[];
  nextPage: S | undefined;
}

export default function useFetchListData<T, S>({
  addressHash,
  triggerApiCall,
  source,
}: FetchDataParams): FetchDataResponse<T, S> {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T[]>([]);
  const [nextPage, setNextPage] = useState<S>();
  const router = useRouter();

  const fetchData = async () => {
    setIsLoading(true);
    const resp = await triggerApiCall().unwrap();
    setData(resp.items ?? []);
    setNextPage(resp.next_page_params);
    await sleep(150); // added timeout to prevent flicker
    setIsLoading(false);
  };

  useEffect(() => {
    const skipDataFetch = router.query.source !== source;
    if (!skipDataFetch) {
      fetchData();
    }
  }, [router.query.page_number, addressHash]);

  return { isLoading, data, nextPage };
}
