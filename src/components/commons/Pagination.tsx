import { useEffect, useMemo, useState, PropsWithChildren } from "react";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/router";
import clsx from "clsx";
import Link from "./Link";

interface PaginationProps<T> {
  nextPageParams?: T & {
    items_count?: string;
    page_number?: string;
  };
  pathname?: string;
  containerClass?: string;
}

export default function Pagination<T>({
  nextPageParams: nextPageParamsFromApi,
  pathname,
  containerClass,
}: PaginationProps<T>): JSX.Element {
  const router = useRouter();
  const pathName = pathname ?? router.pathname;
  const currentPageNumber = Number.isNaN(Number(router.query.page_number))
    ? 1
    : Number(router.query.page_number);
  const nextPageParams = {
    ...nextPageParamsFromApi,
    ...{ page_number: currentPageNumber + 1 },
  };

  const [previousPagesParams, setPreviousPagesParams] = useState<any[]>([]);

  const getPageQueryParams = (pageNumber: number) =>
    previousPagesParams.find(
      (page) => Number(page?.page_number) === pageNumber
    );

  const previousPageQuery = useMemo(
    () => getPageQueryParams(Number(router.query.page_number) - 1),
    [router.query]
  );

  const getPageButtons = (pageNumber) => {
    /*
      Page numbers are only limited to previous and next pages which will be displayed as such:
        [1][2]    - first page
        [1][2][3] - page 2
        [98][99]  - last page
    */
    const pageButton = {
      previous: getPageQueryParams(pageNumber - 1),
      current: {
        ...router.query,
        items_count: router.query.items_count as string,
        page_number: currentPageNumber,
      },
      next: nextPageParams,
    };

    if (nextPageParamsFromApi === undefined) {
      return [pageButton.previous, pageButton.current];
    }
    if (pageNumber === 1) {
      return [pageButton.current, pageButton.next];
    }
    return [pageButton.previous, pageButton.current, pageButton.next];
  };

  useEffect(() => {
    if (
      !previousPagesParams.some(
        (page) => page?.page_number === (router.query.page_number as string)
      )
    ) {
      // Store page query params to be used for previouPage button
      setPreviousPagesParams([
        ...previousPagesParams,
        {
          ...router.query,
          items_count: router.query.items_count as string,
          page_number: (router.query.page_number as string) ?? "1",
        },
      ]);
    }
  }, [router.query]);

  useEffect(() => {
    // bug: clicking on the arrow button will cause the page to go back to page 1
    // If pageNumber > 1 and previousPagesParams (local state) is cleared, go back to page 1
    if (
      Number(router.query.page_number) > 1 &&
      previousPagesParams.length === 0
    ) {
      setPreviousPagesParams([]);
      router.push(pathName);
    }
  }, [router.query]);

  return (
    <div
      className={clsx(
        "flex space-x-1 flex-row justify-end pt-4",
        containerClass
      )}
    >
      {previousPageQuery && (
        <NavigateButton
          type="Prev"
          query={previousPageQuery}
          pathName={pathName}
        >
          <FiArrowLeft className="text-white-700" size={24} />
        </NavigateButton>
      )}

      {getPageButtons(currentPageNumber)
        .filter((page) => page)
        .map((page) => (
          <NumberButton
            key={page.page_number ?? 1}
            n={page.page_number}
            active={currentPageNumber === page.page_number}
            query={page}
            pathName={pathName}
          />
        ))}

      {nextPageParamsFromApi && (
        <NavigateButton type="Next" query={nextPageParams} pathName={pathName}>
          <FiArrowRight className="text-white-700" size={24} />
        </NavigateButton>
      )}
    </div>
  );
}

interface NumberButtonProps {
  n: number;
  active: boolean;
  pathName: string;
  query: any;
}

function NumberButton({
  n,
  active,
  query,
  pathName,
}: NumberButtonProps): JSX.Element {
  if (active) {
    return (
      <button
        type="button"
        className="bg-black-500 rounded h-6 w-6 flex items-center justify-center cursor-not-allowed"
      >
        <span className="font-medium text-white-50">{n}</span>
      </button>
    );
  }

  return (
    <Link href={{ pathname: pathName, query }}>
      <button
        type="button"
        className="rounded cursor-pointer h-6 w-6 flex items-center justify-center"
      >
        <span className="font-medium text-white-50">{n}</span>
      </button>
    </Link>
  );
}

function NavigateButton({
  children,
  type,
  query,
  pathName,
}: PropsWithChildren<{
  type: "Next" | "Prev";
  pathName: string;
  query: any;
}>): JSX.Element {
  return (
    <Link href={{ pathname: pathName, query }}>
      <button
        type="button"
        data-testid={`Pagination.${type}`}
        className="text-white-700 cursor-pointer h-6 w-6 flex items-center justify-center"
      >
        {children}
      </button>
    </Link>
  );
}
