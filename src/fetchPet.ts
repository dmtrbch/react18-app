import { QueryFunction } from "@tanstack/react-query";
import { PetAPIResponse } from "./APIResponsesTypes";
// what we expect to get back, what we expect the key to be
const fetchPet: QueryFunction<PetAPIResponse, ["details", string]> = async ({
  queryKey,
}) => {
  const id = queryKey[1];

  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  if (!apiRes.ok) {
    // if we use react query we must handle errors
    throw new Error(`details/${id} fetch not ok`);
  }

  // react query expects to return promise
  return apiRes.json(); // this returns promise
};

export default fetchPet;
