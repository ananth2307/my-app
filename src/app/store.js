import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/baseApiSetup";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
