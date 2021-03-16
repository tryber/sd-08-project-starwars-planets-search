const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

async function fetchPlanets() {
  const request = await fetch(url);
  const response = await request.json();
  return response.results;
}
export default fetchPlanets;
