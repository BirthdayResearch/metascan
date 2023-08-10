import { Combobox } from "@headlessui/react";
import { Fragment } from "react";
import clsx from "clsx";
import { FiBox, FiFileText, FiSlash } from "react-icons/fi";
import { TbLoaderQuarter } from "react-icons/tb";
import Link from "@components/commons/Link";
import { TransactionsIcon } from "@components/icons/Transactions";
import { IconType } from "react-icons";
import { SearchResultType } from "@store/search";

export interface SearchResult {
  url: string;
  title: string;
  type: string;
}

export function SearchResultTable({
  searchResults,
  isSearching,
}: {
  searchResults?: SearchResult[];
  isSearching: boolean;
}): JSX.Element {
  if (isSearching) {
    return <SearchingMessage />;
  }

  if (searchResults === undefined || searchResults.length === 0) {
    return <NoResultsMessage />;
  }

  return (
    <Combobox.Options className="focus:outline-none" static>
      {searchResults.map((searchResult) => (
        <SearchResultRow
          searchResults={searchResult}
          key={`${searchResult.type}.${searchResult.title}`}
        />
      ))}
    </Combobox.Options>
  );
}

const iconMapping: Record<SearchResultType, IconType> = {
  [SearchResultType.Block]: FiBox,
  [SearchResultType.Transaction]: TransactionsIcon,
  [SearchResultType.Address]: FiFileText,
  [SearchResultType.Contract]: FiFileText,
  [SearchResultType.Token]: FiFileText,
};

function SearchResultRow({
  searchResults,
}: {
  searchResults: SearchResult;
}): JSX.Element {
  const Icon = iconMapping[searchResults.type];
  return (
    <Combobox.Option as={Fragment} value={searchResults}>
      {({ active }) => (
        <Link
          href={{ pathname: searchResults.url }}
          data-testid={`searchResultRow-${searchResults.type}-${searchResults.title}`}
        >
          <div className="w-full px-8 py-5 cursor-pointer">
            <div className="w-full flex items-center">
              <Icon size={20} className="text-white-50 stroke-white-50" />
              <span
                className={clsx("text-center text-base ml-3 capitalize", {
                  "text-transparent bg-clip-text brand-gradient-1": active,
                  "text-white-700": !active,
                })}
              >
                {searchResults.type}
              </span>
            </div>
            <span className="overflow-hidden overflow-ellipsis text-center text-white-50 ml-8 text-base">
              {searchResults.title}
            </span>
          </div>
        </Link>
      )}
    </Combobox.Option>
  );
}

function NoResultsMessage(): JSX.Element {
  return (
    <div className="w-full px-8 py-5">
      <div className="w-full flex items-center">
        <FiSlash size={20} className="text-red-600" />
        <span className="text-center text-xl font-bold ml-3 text-white-50">
          No results
        </span>
      </div>
      <div className="ml-8 mt-2">
        <span className="text-center text-white-700 text-base">
          Search for Hash, block ...
        </span>
      </div>
    </div>
  );
}

function SearchingMessage(): JSX.Element {
  return (
    <div className="w-full px-8 py-5">
      <div className="w-full flex items-center">
        <TbLoaderQuarter size={20} className="animate-spin text-[#FF008C]" />
        <span className="text-center text-xl font-bold ml-3 text-white-50">
          Searching ...
        </span>
      </div>
    </div>
  );
}
