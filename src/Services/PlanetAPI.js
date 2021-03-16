// const PLANET_API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
const PLANET_API_URL1 = 'https://swapi.dev/api/planets/';

const fetchInfoAPI = async () => {
  const fecthInfo = await fetch(PLANET_API_URL1);
  const infoJSON = await fecthInfo.json();
  const results = await infoJSON.results;
  // console.log(results);
  return results;
};

export default fetchInfoAPI;
