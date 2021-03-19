async function fetchPlanets() {
  const api = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((response) => response.json())
    .then((response) => response.results);
  return api;
}

export default fetchPlanets;
