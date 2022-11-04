import { useMemo, useState } from "react";
import { debounce } from "lodash";
import { shift, autoUpdate, size, useFloating } from "@floating-ui/react-dom";
import { Combobox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { FiSearch } from "react-icons/fi";
import { IoCloseCircleSharp } from "react-icons/io5";
import { SearchResult, SearchResultTable } from "./SearchResult";

export function SearchBar(): JSX.Element {
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

  async function changeHandler(value): Promise<void> {
    const query = value.trim();
    setSearchString(query);
    setSelected({ title: query, url: "", type: "Query" });
    if (query.length > 0) {
      setIsSearching(true);
      const results = await getSearchResults(query);
      setSearchResults(results);
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  }

  const onChangeDebounceHandler = useMemo(
    () => debounce((event) => changeHandler(event.target.value), 200),
    []
  );

  const onSelect = (result?: SearchResult): void => {
    setSelected(result);
    // TODO add on select action
  };

  return (
    <Combobox value={selected} onChange={onSelect} nullable>
      <div className="flex w-full px-5 md:px-10 lg:px-[316px] items-center justify-self-center mx-auto my-10">
        <div
          className={clsx(
            "flex w-full px-8 py-[22px] rounded-lg border-[0.5px] black-gradient-1 border-black-500 focus-within:border-lightBlue black-gradient-1-shadow backdrop-blur-[6px]"
          )}
          data-testid="SearchBar"
          ref={reference}
        >
          <div className="flex w-full">
            <Combobox.Button as="div" className="flex w-full mr-2">
              <FiSearch size={24} className="text-white-50 mr-2 self-center" />
              <Combobox.Input
                as="input"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={
                  isFocused
                    ? "Search Block / Txn / Vault ID and more"
                    : "Search DMC blockchain ..."
                }
                className="h-full w-full focus:outline-none bg-transparent caret-lightBlue placeholder-black-50 text-white-50"
                data-testid="SearchBar.Input"
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

async function getSearchResults(query): Promise<SearchResult[]> {
  // TODO remove test data
  return [
    {
      title: query,
      type: "Transaction",
      url: `/transactions/${query}`,
    },
    {
      title: query,
      type: "Block",
      url: `/block/${query}`,
    },
  ];
}