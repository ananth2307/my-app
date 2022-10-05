import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
// import counterReducer from '../features/counter/counterSlice';
import count from "../features/count/countSlice";
import { authAPI } from "../services/auth";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    count,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware),
});
