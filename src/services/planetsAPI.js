const fetchPlanets = async () => {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const { results } = await fetch(endpoint)
    .then((response) => response.json());
  setPlanets(results);
};
fetchPlanets();

export default fetchPlanets;
