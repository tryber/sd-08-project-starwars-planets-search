const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets';

const getData = async () => {
  const { results } = await fetch(ENDPOINT)
    .then((response) => response.json());
  return results;
};

export default getData;
