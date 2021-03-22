export default async function getPlanets() {
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const data = await fetch(URL);
  const dataJson = await data.json();
  return dataJson.results;
}
