const ENDPOINT_PLANTET = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getPlanets = async () => {
  try {
    const planetResponse = await fetch(ENDPOINT_PLANTET);
    const planetResponseJson = await planetResponse.json();
    return planetResponseJson.results;
  } catch (error) {
    return error;
  }
};

export default getPlanets;
