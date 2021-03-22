const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchApi = () => fetch(URL)
  .then((result) => result.json())
  .then((data) => data.results);

export default fetchApi;
