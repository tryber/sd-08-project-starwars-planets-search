const URL_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

export default function getApi() {
  return fetch(URL_API)
    .then((response) => response.json())
    .then((data) => data.results);
}
