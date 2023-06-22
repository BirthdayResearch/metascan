import { configureStore } from "@reduxjs/toolkit";
import { contractApi } from "@store/contract";
import { searchApi } from "@store/search";
import { contractMethodsApi } from "@store/smartContract";

export function initializeStore() {
  return configureStore({
    reducer: {
      [searchApi.reducerPath]: searchApi.reducer,
      [contractApi.reducerPath]: contractApi.reducer,
      [contractMethodsApi.reducerPath]: contractMethodsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        searchApi.middleware,
        contractApi.middleware,
        contractMethodsApi.middleware
      ),
  });
}

export type RootStore = ReturnType<typeof initializeStore>;
export type RootState = ReturnType<RootStore["getState"]>;
