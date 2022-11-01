import { PropsWithChildren } from "react";
import classNames from "classnames";

/**
 * Container implementation that is part of the design language.
 */
export default function Container({className, children }: PropsWithChildren<{ className?: string }>): JSX.Element {
  return (
    <div
      className={classNames(
        "container mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
