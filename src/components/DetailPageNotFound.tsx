import Button from "@components/commons/Button";
import { SearchResultType } from "@store/search";
import { SearchBar } from "layouts/components/searchbar/SearchBar";

const ErrorMessages = {
  [SearchResultType.Address]: {
    title: "Invalid Address",
    message: "Please double-check your address and try again.",
  },
  [SearchResultType.Block]: {
    title: "Invalid Block",
    message: "Please double-check your block number and try again.",
  },
  [SearchResultType.Contract]: {
    title: "Invalid Contract Address",
    message: "Please double-check your contract address and try again.",
  },
  [SearchResultType.Transaction]: {
    title: "Invalid Txn Hash",
    message: "Please double-check your transaction hash and try again.",
  },
};

export default function DetailPageNotFound({ path }: { path: string }) {
  const trimmedPath = path.charAt(1).toUpperCase() + path.slice(2); // eg. /block -> Block
  const type: SearchResultType =
    trimmedPath === "tx"
      ? SearchResultType.Transaction
      : SearchResultType[trimmedPath];

  const error = ErrorMessages[type];
  return (
    <div className="px-1 md:px-0 mt-12 antialiased text-white-50">
      <SearchBar containerClass="mt-1 mb-6" />
      <div className="pt-8 pb-8">
        <div className="font-bold leading-[130%] text-[32px] md:text-[56px] md:-tracking-[0.01em]">
          {error.title}
        </div>
        <div className="md:text-xl leading-[140%] tracking-[0.01em] mt-4">
          {error.message}
        </div>
        <Button
          label="Return to homepage"
          testId="return-home"
          href="/"
          customStyle="mt-12 lg:mt-16"
        />
      </div>
    </div>
  );
}
