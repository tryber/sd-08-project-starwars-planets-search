const STARWARS_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getPlanetsAPI = () => (
  fetch(STARWARS_API)
    .then((response) => response.json())
    .then((json) => json)
    .catch((error) => console.log(error))

);

export default getPlanetsAPI;
