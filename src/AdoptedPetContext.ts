import { createContext } from "react";
import { Pet } from "./APIResponsesTypes";

const AdoptedPetContext = createContext<[Pet, (adpotedPet: Pet) => void]>([
  {
    id: 1337,
    name: "Fido",
    animal: "dog",
    description: "Lorem ipsum",
    breed: "Beagle",
    images: [],
    city: "Seattle",
    state: "WA",
  },
  () => {}
]); // its best to not have default value for the context, with typescript we must

export default AdoptedPetContext;
