const starWarsApi = async () => {
  const api = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const { results } = await fetch(api)
    .then((response) => response.json());
  return results;
};
export default starWarsApi;
