const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

const starWarsAPI = async () => {
  const results = await fetch(url).then((response) => response.json());
  return results;
};

export default starWarsAPI;
