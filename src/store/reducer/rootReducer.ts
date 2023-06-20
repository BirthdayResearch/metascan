import { configureStore } from "@reduxjs/toolkit";
import { searchApi } from "@store/search";
import { contractMethodsApi } from "@store/smartContract";

export function initializeStore() {
  return configureStore({
    reducer: {
      [searchApi.reducerPath]: searchApi.reducer,
      [contractMethodsApi.reducerPath]: contractMethodsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        searchApi.middleware,
        contractMethodsApi.middleware
      ),
  });
}

export type RootStore = ReturnType<typeof initializeStore>;
export type RootState = ReturnType<RootStore["getState"]>;
