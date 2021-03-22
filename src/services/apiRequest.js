const API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getApi = () => fetch(API_URL)
  .then((response) => response.json())
  .then((data) => data.results);

export default getApi;
