import { configureStore } from "@reduxjs/toolkit";
import { addressApi } from "@store/address";
import { blocksApi } from "@store/blocks";
import {
  contractApi,
  contractMethodsApi,
  contractVerificationApi,
} from "@store/contract";
import { searchApi } from "@store/search";
import { tokenApi } from "@store/token";

export function initializeStore() {
  return configureStore({
    reducer: {
      [searchApi.reducerPath]: searchApi.reducer,
      [blocksApi.reducerPath]: blocksApi.reducer,
      [contractApi.reducerPath]: contractApi.reducer,
      [contractMethodsApi.reducerPath]: contractMethodsApi.reducer,
      [contractVerificationApi.reducerPath]: contractVerificationApi.reducer,
      [tokenApi.reducerPath]: tokenApi.reducer,
      [addressApi.reducerPath]: addressApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        searchApi.middleware,
        blocksApi.middleware,
        contractApi.middleware,
        contractMethodsApi.middleware,
        contractVerificationApi.middleware,
        tokenApi.middleware,
        addressApi.middleware
      ),
  });
}

export type RootStore = ReturnType<typeof initializeStore>;
export type RootState = ReturnType<RootStore["getState"]>;
