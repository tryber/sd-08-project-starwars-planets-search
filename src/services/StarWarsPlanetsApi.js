export default async function fetchPlanetsData() {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const requestReturn = await fetch(url);
  const { results } = await requestReturn.json();
  return results;
}
