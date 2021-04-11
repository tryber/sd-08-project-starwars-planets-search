const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
export default async function getPlanets() {
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => data.results.map((i) => {
      delete i.residents;
      return i;
    }));
}
