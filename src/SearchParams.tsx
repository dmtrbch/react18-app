import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { all } from "./searchParamsSlice";
import { useSearchQuery } from "./petApiService";
import Results from "./Results";
import useBreedList from "./useBreedList";
import { Animal } from "./APIResponsesTypes";
const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [animal, setAnimal] = useState("" as Animal);
  const searchParams = useAppSelector((state) => state.searchParams);
  const [breeds] = useBreedList(animal); // ova e mnogu biten moment ne mora da bide vo useEffect hook za da ja menja vrednosta!!!
  const dispatch = useAppDispatch();

  let { data: pets } = useSearchQuery(searchParams);
  pets = pets ?? [];

  const adoptedPet = useAppSelector((state) => state.adoptedPet);

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj = {
            animal:
              (formData.get("animal")?.toString() as Animal) ?? ("" as Animal),
            breed: formData.get("breed")?.toString() ?? "",
            location: formData.get("location")?.toString() ?? "",
          };
          dispatch(all(obj));
        }}
      >
        {adoptedPet && adoptedPet.images.length > 0 ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            name="location"
            className="search-input"
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            className="search-input"
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            className="search-input grayed-out-disabled"
            id="breed"
            disabled={breeds.length === 0}
            name="breed"
          >
            <option />
            {(breeds as string[]).map((breed: string) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button className="rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-50">
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
