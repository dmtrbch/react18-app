import { configureStore } from "@reduxjs/toolkit";
import adoptedPetReducer from "./adoptedPetSlice";
import searchParamsReducer from "./searchParamsSlice";
import { petApi } from "./petApiService";

export const store = configureStore({
  reducer: {
    adoptedPet: adoptedPetReducer,
    searchParams: searchParamsReducer,
    [petApi.reducerPath]: petApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(petApi.middleware), // we can log what happens in redux to a server we can use middleware for example
  // in our case we use middleware to cache the data
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
