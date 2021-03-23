const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchPlanets = () => fetch(URL)
  .then((response) => response.json())
  .then((data) => data.results);

export default fetchPlanets;
