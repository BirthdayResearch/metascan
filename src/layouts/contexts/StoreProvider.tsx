import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { initializeStore, RootStore } from "@store/reducer/rootReducer";

let store: RootStore | undefined;

/**
 * StoreProvider prevent Store from reloading by hydrating
 */
export function StoreProvider(props: PropsWithChildren<any>): JSX.Element {
  const { children } = props;
  store = initializeStore();

  return <Provider store={store}>{children}</Provider>;
}
