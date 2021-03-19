export const SWAPI_API = {
  url1: ' https://swapi.dev/api/planets/',
  url2: 'https://swapi-trybe.herokuapp.com/api/planets/',

};

export const getSwapiPlanets = () => (
  fetch(SWAPI_API.url1)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);
