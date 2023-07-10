import BlockRowLoader from "pages/blocks/_components/BlockRowLoader";
import TransactionRowLoader from "./TransactionRowLoader";
import RowItemLoader from "./RowItemLoader";
import SmartContractLoader from "./SmartContractLoader";
import TokenHoldersLoader from "./TokenHoldersLoader";

interface SkeletonLoaderProp {
  rows: number;
  screen: SkeletonLoaderScreen;
}

export enum SkeletonLoaderScreen {
  // Main page
  "MainTable" = "MainTable",

  // Child pages
  "Tx" = "Tx",
  "Block" = "Block",
  "Contract" = "Contract",
  "TokenHolders" = "TokenHolders",
}

export function SkeletonLoader(props: SkeletonLoaderProp): JSX.Element {
  const { rows, screen } = props;
  const skeletonRow = Array.from(Array(rows), (_v, i) => i + 1);

  // eslint-disable-next-line default-case
  switch (screen) {
    case SkeletonLoaderScreen.MainTable:
      return (
        <>
          {skeletonRow.map((row) => (
            <RowItemLoader key={row} />
          ))}
        </>
      );
    case SkeletonLoaderScreen.Tx:
      return (
        <>
          {skeletonRow.map((row) => (
            <TransactionRowLoader key={row} />
          ))}
        </>
      );
    case SkeletonLoaderScreen.Block:
      return (
        <>
          {skeletonRow.map((row) => (
            <BlockRowLoader key={row} />
          ))}
        </>
      );
    case SkeletonLoaderScreen.Contract:
      return (
        <>
          {skeletonRow.map((row) => (
            <SmartContractLoader key={row} />
          ))}
        </>
      );
    case SkeletonLoaderScreen.TokenHolders:
      return (
        <>
          {skeletonRow.map((row) => (
            <TokenHoldersLoader key={row} />
          ))}
        </>
      );
  }
}
