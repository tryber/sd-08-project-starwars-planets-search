const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getPlanets = async () => fetch(URL)
  .then((res) => res.json())
  .then((res) => res.results);

export default getPlanets;
