const STARWARS_PLANETS_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getPlanets = async () => (
  fetch(STARWARS_PLANETS_API)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok
          ? Promise.resolve(json)
          : Promise.reject(new Error('Api error'))
        )))));

export default getPlanets;
