const urlBase = 'https://swapi-trybe.herokuapp.com/api/planets/';

export default async function getPlanets() {
  const { results } = await fetch(urlBase).then((response) => response.json());
  return results;
}
