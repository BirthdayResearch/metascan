import { PropsWithChildren } from "react";
import classNames from "classnames";

/**
 * Container implementation that is part of the design language.
 */
export function Container(
  props: PropsWithChildren<{ className?: string }>
): JSX.Element {
  return (
    <div
      className={classNames(
        "container mx-auto",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
