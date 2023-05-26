import TransactionRowLoader from "./TransactionRowLoader";

interface SkeletonLoaderProp {
  rows: number;
  screen: SkeletonLoaderScreen;
}

export enum SkeletonLoaderScreen {
  "Tx" = "Tx",
}

export function SkeletonLoader(props: SkeletonLoaderProp): JSX.Element {
  const { rows, screen } = props;
  const skeletonRow = Array.from(Array(rows), (_v, i) => i + 1);

  // eslint-disable-next-line default-case
  switch (screen) {
    case SkeletonLoaderScreen.Tx:
      return (
        <>
          {skeletonRow.map((row) => (
            <TransactionRowLoader key={row} />
          ))}
        </>
      );
  }
}
