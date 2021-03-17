const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getPlanetsAPI = async () => {
  const { results } = await fetch(URL).then((response) => response.json());
  return results;
};

export default getPlanetsAPI;
