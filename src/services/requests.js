export async function getPlanetsFromApi() {
  const allPlanets = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((planetList) => planetList.json())
    .then(({ results }) => results)
    .catch((error) => { throw new Error(error); });
  return allPlanets;
}

export async function getPlanetKeys() {
  const planets = await getPlanetsFromApi();
  delete planets[0].residents;
  const keys = Object.keys(planets[0]);
  return keys;
}
