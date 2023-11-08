import { Dispatch, SetStateAction, useEffect, MutableRefObject } from "react";

export function useOutsideAlerter(
  ref: MutableRefObject<HTMLDivElement | null>,
  setIsTokenClicked: Dispatch<SetStateAction<boolean>>,
) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsTokenClicked(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
