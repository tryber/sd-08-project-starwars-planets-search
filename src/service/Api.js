const STARWARS_BASE_API = 'https://swapi-trybe.herokuapp.com/api';

const getStarwarsPlanet = async () => {
  const responseApi = await fetch(`${STARWARS_BASE_API}/planets/`)
    .then((response) => response.json());

  // console.log(responseApi.results);
  return responseApi;
};

export default getStarwarsPlanet;
