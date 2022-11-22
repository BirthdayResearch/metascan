import GradientCardContainer from "@components/commons/GradientCardContainer";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoCloseCircleSharp } from "react-icons/io5";
import { TbLoaderQuarter } from "react-icons/tb";
import { debounce } from "lodash";
import DropDownTokenRow from "./DropDownTokenRow";

interface TokenDropDownProps {
  addressTokens: AddressToken[];
}

interface AddressToken {
  value: number;
  symbol: string;
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

export default function TokenSearchDropDown({
  addressTokens,
}: TokenDropDownProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchString, setSearchString] = useState("");
  const [searchedList, setSearchedList] = useState(addressTokens);

  useEffect(() => {
    const getSearchedList = () => {
      const displayTokens: AddressToken[] = [];
      addressTokens.forEach((tokenSymbol) => {
        if (
          tokenSymbol.symbol.toLowerCase().includes(searchString.toLowerCase())
        ) {
          displayTokens.push(tokenSymbol);
        }
      });
      return displayTokens;
    };

    const setSearchResult = (displayTokens: AddressToken[]) => {
      setSearchedList(displayTokens);
      setIsSearching(false);
    };

    if (searchString !== "") {
      setIsSearching(true);
      const userSearchedList = getSearchedList();
      const debounceSetSearchList = debounce(setSearchResult, 300);
      debounceSetSearchList(userSearchedList);
    } else {
      setSearchedList(addressTokens);
    }
  }, [searchString]);

  return (
    <GradientCardContainer className="absolute whitespace-nowrap translate-x-[-10px] translate-y-[13px] lg:w-[314px] lg:h-[284px] md:w-[314px] md:h-[284px] w-[296px] h-[300px]">
      <div
        className={clsx(
          "p-5 w-full h-full overflow-y-hidden hover:overflow-y-auto",
          { "hover:overflow-y-hidden": searchedList.length <= 3 }
        )}
        onBlur={() => {
          setIsFocused(false);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
      >
        <div
          className={clsx(
            "relative group flex w-full rounded-lg p-[0.5px] mb-5 bg-black-500 focus-within:bg-lightBlue black-gradient-1-shadow backdrop-blur-[6px]",
            "transition duration-300 ease-in"
          )}
        >
          {!isFocused && (
            <div
              className={clsx(
                "absolute opacity-0 inset-0 rounded-lg transition brand-gradient-1 group-hover:opacity-100 z-[-10]",
                "transition duration-300 ease-in"
              )}
            />
          )}
          <div className="flex flex-row items-center rounded-lg bg-black-900 black-gradient-1 gap-x-[13px] pt-[17px] pb-[19px]">
            <FiSearch className="ml-[23px] text-white-50" size={24} />
            <input
              className="w-2/3 h-full focus:outline-none bg-black-900 black-gradient-1 border-none black-gradient-1-shadow text-white-700 text-xl focus:caret-lightBlue"
              onChange={(v) => setSearchString(v.target.value)}
              placeholder="Search..."
              value={searchString}
            />
            <IoCloseCircleSharp
              onClick={() => {
                setSearchString("");
              }}
              role="button"
              className={clsx("text-white-50 mr-[18px] opacity-0", {
                "opacity-100": isFocused || searchString !== "",
              })}
              size={24}
            />
          </div>
        </div>
        {isSearching
          ? SearchingMessage()
          : searchedList.map((item) => (
              <DropDownTokenRow
                key={item.symbol}
                symbol={item.symbol}
                value={item.value}
              />
            ))}
      </div>
    </GradientCardContainer>
  );
}
