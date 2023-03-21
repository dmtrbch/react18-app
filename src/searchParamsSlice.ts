import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchParams } from "./APIResponsesTypes";

const initialState: SearchParams = {
  location: "",
  breed: "",
  animal: "",
};

export const searchParamsSlice = createSlice({
  name: "searchParams",
  initialState,
  reducers: {
    all: (state, action: PayloadAction<SearchParams>) => {
      state.location = action.payload.location;
      state.breed = action.payload.breed;
      state.animal = action.payload.animal;
    },
  },
});

export const { all } = searchParamsSlice.actions;
export default searchParamsSlice.reducer;
