import { last, takeRight } from "lodash";
import { GetServerSidePropsContext } from "next";
import { PropsWithChildren } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Link } from "./Link";

export interface CursorPage {
  n: number;
  active: boolean;
  cursors: string[];
}

interface CursorPaginationProps {
  className?: string;
  pages: CursorPage[];
  path: `/${string}`;
}

/**
 * To get next from Context
 * @example const next = CursorPagination.getNext(GetServerSidePropsContext)
 *
 * To get pages available from Context and next ApiPagedResponse
 * @example const pages = CursorPagination.getPages(GetServerSidePropsContext, ApiPagedResponse)
 *
 * To render the pagination
 * @example <CursorPagination pages={pages} path='/...' />
 *
 * @param {CursorPaginationProps} props
 */
export function CursorPagination({
  pages,
  className,
  path,
}: CursorPaginationProps): JSX.Element {
  const pagesItems = takeRight(pages, 3);
  const activeIndex = pages.findIndex((value) => value.active);
  const prev = pagesItems[activeIndex - 1];
  const next = pagesItems[activeIndex + 1];

  return (
    <div className={className}>
      <div className="flex space-x-1">
        <NavigateButton.Prev path={path} cursors={prev?.cursors}>
          <FiArrowLeft size={24} />
        </NavigateButton.Prev>
        {pagesItems.map((page) => (
          <NumberButton key={page.n} path={path} {...page} />
        ))}
        <NavigateButton.Next path={path} cursors={next?.cursors}>
          <FiArrowRight size={24} />
        </NavigateButton.Next>
      </div>
    </div>
  );
}

function NumberButton({
  n,
  active,
  path,
  cursors,
}: CursorPage & { path: string }): JSX.Element {
  if (active) {
    return (
      <div className="bg-black-500 rounded h-6 w-6 flex items-center justify-center cursor-not-allowed">
        <span className="font-medium text-white-50">{n}</span>
      </div>
    );
  }

  return (
    <Link href={{ pathname: path, query: getQueryFromCursors(cursors) }}>
      <div className="rounded cursor-pointer h-6 w-6 flex items-center justify-center">
        <span className="font-medium text-white-50">{n}</span>
      </div>
    </Link>
  );
}

NavigateButton.Prev = (
  props: PropsWithChildren<{ path: string; cursors: string[] | undefined }>
) => NavigateButton({ type: "Prev", ...props });

NavigateButton.Next = (
  props: PropsWithChildren<{ path: string; cursors: string[] | undefined }>
) => NavigateButton({ type: "Next", ...props });

function NavigateButton({
  cursors,
  children,
  path,
  type,
}: PropsWithChildren<{
  path: string;
  cursors: string[] | undefined;
  type: "Next" | "Prev";
}>): JSX.Element {
  if (cursors === undefined) {
    return (
      <div className="text-black-300 cursor-not-allowed h-6 w-6 flex items-center justify-center">
        {children}
      </div>
    );
  }

  return (
    <Link href={{ pathname: path, query: getQueryFromCursors(cursors) }}>
      <div
        data-testid={`CursorPagination.${type}`}
        className="text-white-700 cursor-pointer h-6 w-6 flex items-center justify-center"
      >
        {children}
      </div>
    </Link>
  );
}

function getQueryFromCursors(cursors: string[]): Record<string, string> {
  if (cursors.length === 0) {
    return {};
  }

  return {
    cursors: cursors.join(","),
  };
}

function getCursorsFromContext(context: GetServerSidePropsContext): string[] {
  if (context.query.cursors !== undefined) {
    return (context.query.cursors as string).split(",");
  }
  return [];
}

/**
 * @param {GetServerSidePropsContext} context to get the last next
 */
CursorPagination.getNext = (
  context: GetServerSidePropsContext
): string | undefined => last(getCursorsFromContext(context));

/**
 * @param {GetServerSidePropsContext} context
 * @param {ApiPagedResponse} paged
 */
CursorPagination.getPages = (
  context: GetServerSidePropsContext,
  paged: any
): CursorPage[] => {
  const pages: CursorPage[] = [{ n: 1, active: false, cursors: [] }];

  // eslint-disable-next-line no-restricted-syntax
  for (const cursor of getCursorsFromContext(context)) {
    pages.push({
      n: pages.length + 1,
      active: false,
      cursors: [...last(pages)!.cursors, cursor],
    });
  }

  pages[pages.length - 1].active = true;

  if (paged.nextToken !== undefined) {
    pages.push({
      n: pages.length + 1,
      active: false,
      cursors: [...last(pages)!.cursors, paged.nextToken],
    });
  }

  return pages;
};
