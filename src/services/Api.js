const API_PLANETS = 'https://swapi-trybe.herokuapp.com/api/planets/';

export const getPlanets = () => (
  fetch(API_PLANETS)
    .then((response) => (
      response.json()
        .then((json) => (response.ok
          ? Promise.resolve(json)
          : Promise.reject(new Error('Api error'))))
    ))
);

export default getPlanets;
