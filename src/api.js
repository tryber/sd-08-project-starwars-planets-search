const BASE_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const buscaPlanetas = () => fetch(BASE_URL)
  .then((res) => res.json())
  .then((data) => data.results);

export default buscaPlanetas;
