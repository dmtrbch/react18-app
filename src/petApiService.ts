import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Animal,
  PetAPIResponse,
  BreedListAPIResponse,
} from "./APIResponsesTypes";

export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://pets-v2.dev-apis.com" }),
  endpoints: (builder) => ({
    getPet: builder.query({
      query: (id: string) => ({ url: "pets", params: { id } }),
      transformResponse: (response: PetAPIResponse) => response.pets[0],
    }),
    getBreeds: builder.query({
      query: (animal: Animal) => ({ url: "breeds", params: { animal } }),
      transformResponse: (response: BreedListAPIResponse) => response.breeds,
    }),
    search: builder.query({
      query: ({
        animal,
        location,
        breed,
      }: {
        animal: Animal;
        location: string;
        breed: string;
      }) => ({
        url: "pets",
        params: { animal, location, breed },
      }),
      transformResponse: (response: PetAPIResponse) => response.pets,
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetPetQuery, useGetBreedsQuery, useSearchQuery } = petApi;
