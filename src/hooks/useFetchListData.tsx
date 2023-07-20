import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { sleep } from "shared/sleep";

interface FetchDataParams {
  addressHash: string;
  triggerApiCall: () => any;
}

interface FetchDataResponse<T, S> {
  isLoading: boolean;
  data: T[];
  nextPage: S | undefined;
}

export default function useFetchListData<T, S>({
  addressHash,
  triggerApiCall,
}: FetchDataParams): FetchDataResponse<T, S> {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T[]>([]);
  const [nextPage, setNextPage] = useState<S>();

  const router = useRouter();
  const firstRender = useRef(true);
  const [shouldSkipDataFetch, setShouldSkipDataFetch] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const resp = await triggerApiCall().unwrap();
    setData(resp.items ?? []);
    setNextPage(resp.next_page_params);
    await sleep(150); // added timeout to prevent flicker
    setIsLoading(false);
  };

  const handleTabSwitchRerender = () => {
    /**
     * [Why this is added] on tab/page change, page_number of previous tab/page remains and api is called with incorrect page params causing multiple re-renders
     * fix is to prevent any api call when component is first rendered, wait for pagination to reset the query params
     * resetting of query params causes second re-render and then we can call api with proper page params
     * */
    if (firstRender.current) {
      firstRender.current = false;
      // skip api call
      setShouldSkipDataFetch(true);
      return;
    }
    if (shouldSkipDataFetch && firstRender.current === false) {
      // allow api call
      setShouldSkipDataFetch(false);
    }
  };

  useEffect(() => {
    handleTabSwitchRerender();

    if (!shouldSkipDataFetch) {
      fetchData();
    }
  }, [router.query.page_number, addressHash]);

  return { isLoading, data, nextPage };
}
