import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import filtersReducer from '../features/filtersSlice/filtersSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    filters: filtersReducer,
  },
  middleware: (getdefaultMiddlewares) => getdefaultMiddlewares().concat(apiSlice.middleware),
});