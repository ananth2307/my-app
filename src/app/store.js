import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/baseApiSetup";
import observabilitySlice from "../features/observability/observabilitySlice";
import commonSlice from "./commonSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    observability: observabilitySlice,
    common: commonSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(api.middleware),
});
