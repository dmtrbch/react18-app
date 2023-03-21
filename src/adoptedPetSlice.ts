import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pet } from "./APIResponsesTypes";

const initialState: Pet = {
  id: 1337,
  name: "",
  animal: "",
  description: "",
  breed: "",
  images: [],
  city: "",
  state: "",
};

const adoptedPetSlice = createSlice({
  name: "adoptedPet",
  initialState,
  reducers: {
    adopt: (state, action: PayloadAction<Pet>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.animal = action.payload.animal;
      state.description = action.payload.description;
      state.breed = action.payload.breed;
      state.images = action.payload.images;
      state.city = action.payload.city;
      state.state = action.payload.state;
    },
  },
});

export const { adopt } = adoptedPetSlice.actions;
export default adoptedPetSlice.reducer;
