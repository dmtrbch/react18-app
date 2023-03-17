const fetchPet = async ({ queryKey }) => {
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
