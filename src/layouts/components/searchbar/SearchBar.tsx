import { useMemo, useState } from "react";
import { debounce } from "lodash";
import { autoUpdate, shift, size, useFloating } from "@floating-ui/react-dom";
import { Combobox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { FiSearch } from "react-icons/fi";
import { IoCloseCircleSharp } from "react-icons/io5";
import {
  ResultAddressContract,
  ResultBlock,
  ResultTransaction,
  SearchResults,
  SearchResultType,
  useSearchResultMutation,
} from "@store/search";
import { SearchResult, SearchResultTable } from "./SearchResult";

interface SearchBarProps {
  containerClass?: string;
}

export function SearchBar({ containerClass }: SearchBarProps): JSX.Element {
  const [searchResultMutation] = useSearchResultMutation();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchString, setSearchString] = useState();
  const [searchResults, setSearchResults] = useState<
    SearchResult[] | undefined
  >(undefined);

  const [selected, setSelected] = useState<SearchResult>();
  const { x, y, reference, floating, strategy, refs } = useFloating({
    placement: "bottom-end",
    middleware: [
      shift(),
      size({
        apply({ rects }) {
          if (
            refs.floating.current !== null &&
            refs.floating.current !== undefined
          ) {
            Object.assign(refs.floating.current.style, {
              minWidth: "325px",
              width: `${rects.reference.width}px`,
            });
          }
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  function formatResults(results: SearchResults): SearchResult[] {
    const list: SearchResult[] = [];
    results.items.forEach((item) => {
      let url = "";
      let title = "";
      if (
        item.type === SearchResultType.Address ||
        item.type === SearchResultType.Contract
      ) {
        const result = item as ResultAddressContract;
        url = `/address/${result.address}`;
        title = result.name ?? result.address;
      } else if (item.type === SearchResultType.Transaction) {
        const result = item as ResultTransaction;
        url = `/tx/${result.tx_hash}`;
        title = result.tx_hash;
      } else if (item.type === SearchResultType.Block) {
        const result = item as ResultBlock;
        url = `/block/${result.block_number}`;
        title = result.block_number.toString();
      }

      // filter to show types that are supported only
      if (url !== "") {
        list.push({
          url,
          title,
          type: item.type,
        });
      }
    });
    return list;
  }

  async function changeHandler(value): Promise<void> {
    const query = value.trim();
    setSearchString(query);
    setSelected({ title: query, url: "", type: "Query" });
    if (query.length > 0) {
      setIsSearching(true);
      const results = await searchResultMutation({
        queryString: query,
      }).unwrap();
      setSearchResults(formatResults(results));
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  }

  const onChangeDebounceHandler = useMemo(
    () => debounce((event) => changeHandler(event.target.value), 500),
    []
  );

  const onSelect = (result?: SearchResult): void => {
    setSelected(result);
    // TODO add on select action
  };
  const transitionClass = "transition duration-300 ease-in";

  return (
    <Combobox value={selected} onChange={onSelect} nullable>
      <div
        className={clsx(
          "flex w-full items-center justify-self-center mx-auto my-10",
          containerClass
        )}
      >
        <div
          className={clsx(
            "relative group flex w-full rounded-lg p-[1px] bg-black-500 focus-within:bg-lightBlue black-gradient-1-shadow backdrop-blur-[6px]",
            transitionClass
          )}
          data-testid="searchBar"
          ref={reference}
        >
          {!isFocused && (
            <div
              className={clsx(
                "absolute opacity-0 inset-0 rounded-lg transition brand-gradient-1 group-hover:opacity-100",
                transitionClass
              )}
            />
          )}

          <div className="relative flex w-full px-8 py-[22px] rounded-lg bg-black-500 black-gradient-1">
            <Combobox.Button as="div" className="flex w-full mr-2">
              <FiSearch size={24} className="text-white-50 mr-2 self-center" />
              <Combobox.Input
                as="input"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search for txn hash / block height / verified contract"
                className="h-full w-full focus:outline-none bg-transparent caret-lightBlue placeholder-black-50 text-white-50 text-xl"
                data-testid="searchBar-input"
                displayValue={(item: SearchResult) => item?.title}
                onChange={onChangeDebounceHandler}
              />
            </Combobox.Button>
            {((searchString !== undefined && searchString !== "") ||
              isFocused) && (
              <IoCloseCircleSharp
                size={24}
                onClick={() => changeHandler("")}
                className="text-white-50 self-center"
              />
            )}
          </div>
        </div>
        {searchString !== undefined && searchString !== "" && (
          <Transition className="absolute">
            <div
              className="z-40 mt-1"
              ref={floating}
              style={{
                position: strategy,
                top: y ?? "",
                left: x ?? "",
              }}
            >
              <div className="w-full rounded-lg border border-black-700 black-gradient-2 overflow-hidden black-gradient-1-shadow backdrop-blur-[6px]">
                <SearchResultTable
                  searchResults={searchResults}
                  isSearching={isSearching}
                />
              </div>
            </div>
          </Transition>
        )}
      </div>
    </Combobox>
  );
}
