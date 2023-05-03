import { PropsWithChildren } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "./Link";

interface NextPageParamsProps {
  blockNumber: number;
  itemsCount: number;
}

export function Pagination({
  pages,
  nextPageParams,
}: {
  pages: {
    n: number;
    path: string;
  }[];
  nextPageParams: NextPageParamsProps;
}): JSX.Element {
  console.log({ pages, nextPageParams });
  return (
    <div>
      <div className="flex space-x-1">
        {/* <NavigateButton.Prev path={path} cursors={prev?.cursors}>
          <FiArrowLeft size={24} />
        </NavigateButton.Prev> */}
        {pages.map((page) => (
          <NumberButton
            key={page.n}
            n={page.n}
            path={page.path}
            active={false}
          />
        ))}
        <NavigateButton.Next
          path="/blocks"
          query={{
            block_number: nextPageParams.blockNumber.toString(),
            items_count: nextPageParams.itemsCount.toString(),
            type: "block",
          }}
        >
          <FiArrowRight className="text-white-700" size={24} />
        </NavigateButton.Next>
      </div>
    </div>
  );
}

interface NumberButtonProps {
  n: number;
  active: boolean;
  // path: string;
  // query: {
  //   block_number: string;
  //   items_count: string;
  //   type: "block";
  // };
}

function NumberButton({
  n,
  active,
}: // path,
// query,
NumberButtonProps): JSX.Element {
  if (active) {
    return (
      <div className="bg-black-500 rounded h-6 w-6 flex items-center justify-center cursor-not-allowed">
        <span className="font-medium text-white-50">{n}</span>
      </div>
    );
  }

  return (
    <Link href={{ pathname: "/blocks" /* , query */ }}>
      <div className="rounded cursor-pointer h-6 w-6 flex items-center justify-center">
        <span className="font-medium text-white-50">{n}</span>
      </div>
    </Link>
  );
}

NavigateButton.Prev = (
  props: PropsWithChildren<{ path: string; query: any }>
) => NavigateButton({ type: "Prev", ...props });

NavigateButton.Next = (
  props: PropsWithChildren<{
    path: string;
    query: {
      block_number: string;
      items_count: string;
      type: "block";
    };
  }>
) => NavigateButton({ type: "Next", ...props });

function NavigateButton({
  children,
  type,
  query,
}: PropsWithChildren<{
  type: "Next" | "Prev";
  // path: string;
  query: {
    block_number: string;
    items_count: string;
    type: "block";
  };
}>): JSX.Element {
  return (
    <Link href={{ pathname: "/blocks", query }}>
      <div
        data-testid={`Pagination.${type}`}
        className="text-white-700 cursor-pointer h-6 w-6 flex items-center justify-center"
      >
        {children}
      </div>
    </Link>
  );
}
