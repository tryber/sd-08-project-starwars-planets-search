export async function fetchPlanets() {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  return fetch(url).then((r) => r.json());
}

export async function asyncSetter(fetcher, setter, loader) {
  loader(true);
  const value = await fetcher();
  setter(value);
  loader(false);
}
