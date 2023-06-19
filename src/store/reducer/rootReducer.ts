import { configureStore } from "@reduxjs/toolkit";
import { searchApi } from "@store/search";
import { transactionsApi } from "@store/transactions";
import { blocksApi } from "@store/blocks";
import { latestDataApi } from "@store/latestData";

export function initializeStore() {
  return configureStore({
    reducer: {
      [searchApi.reducerPath]: searchApi.reducer,
      [transactionsApi.reducerPath]: transactionsApi.reducer,
      [blocksApi.reducerPath]: blocksApi.reducer,
      [latestDataApi.reducerPath]: latestDataApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        searchApi.middleware,
        transactionsApi.middleware,
        blocksApi.middleware,
        latestDataApi.middleware
      ),
  });
}

export type RootStore = ReturnType<typeof initializeStore>;
export type RootState = ReturnType<RootStore["getState"]>;
