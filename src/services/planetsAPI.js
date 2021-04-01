const AND_POINT_API = 'https://swapi-trybe.herokuapp.com/api/planets/';
const getDataPlanetsStarWars = () => (
  fetch(AND_POINT_API)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getDataPlanetsStarWars;
