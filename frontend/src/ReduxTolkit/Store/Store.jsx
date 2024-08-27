import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../Reducer/AuthReducer";
import { apiSlice } from "../Slice/UserSlice";
export const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
