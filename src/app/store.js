import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/baseApiSetup";
import observabilitySlice from "../features/observability/observabilitySlice";
import commonSlice from "./commonSlice";
import efficiencySlice from "../features/efficiency/efficiencySlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    observability: observabilitySlice,
    common: commonSlice,
    efficiency:efficiencySlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(api.middleware),
});
