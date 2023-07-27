import BlockRowLoader from "pages/blocks/_components/BlockRowLoader";
import TransactionRowLoader from "./TransactionRowLoader";
import MainTableBlocksLoader from "./MainTableBlocksLoader";
import SmartContractLoader from "./SmartContractLoader";
import AddressTokenLoader from "./AddressTokenLoader";
import TokenHoldersLoader from "./TokenHoldersLoader";
import AddressLogsLoader from "./AddressLogsLoader";
import MainTableTxsLoader from "./MainTableTxsLoader";

interface SkeletonLoaderProp {
  rows: number;
  screen: SkeletonLoaderScreen;
}

export enum SkeletonLoaderScreen {
  // Main page
  "MainTableBlocks" = "MainTableBlocks",
  "MainTableTxs" = "MainTableTxs",

  // Child pages
  "Tx" = "Tx",
  "Block" = "Block",
  "Contract" = "Contract",
  "AddressTokens" = "AddressTokens",
  "TokenHolders" = "TokenHolders",
  "AddressLogs" = "AddressLogs",
}

export function SkeletonLoader(props: SkeletonLoaderProp): JSX.Element {
  const { rows, screen } = props;
  const skeletonRow = Array.from(Array(rows), (_v, i) => i + 1);

  // eslint-disable-next-line default-case
  switch (screen) {
    case SkeletonLoaderScreen.MainTableBlocks:
      return (
        <>
          {skeletonRow.map((row) => (
            <MainTableBlocksLoader key={row} />
          ))}
        </>
      );
    case SkeletonLoaderScreen.MainTableTxs:
      return (
        <>
          {skeletonRow.map((row) => (
            <MainTableTxsLoader key={row} />
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
    case SkeletonLoaderScreen.AddressTokens:
      return (
        <>
          {skeletonRow.map((row) => (
            <AddressTokenLoader key={row} />
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
    case SkeletonLoaderScreen.AddressLogs:
      return (
        <>
          {skeletonRow.map((row) => (
            <AddressLogsLoader key={row} />
          ))}
        </>
      );
  }
}
