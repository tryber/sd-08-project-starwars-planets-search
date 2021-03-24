const searchPlanets = async () => {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const request = await fetch(endpoint);
  const planets = await request.json();
  return planets.results;
};

export default searchPlanets;
