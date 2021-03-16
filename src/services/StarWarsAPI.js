const STAR_WARS_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

export const getStarWarsAPI = () => (
  fetch(`${STAR_WARS_API}`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getStarWarsAPI;
