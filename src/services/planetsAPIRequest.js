const URL = 'https://swapi.dev/api/planets/';
const planetsAPIRequest = async () => {
  const { results } = await fetch(URL).then((response) => response.json());
  return results;
};

export default planetsAPIRequest;
