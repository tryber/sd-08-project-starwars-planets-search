const getPlanets = async () => {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const { results } = await response.json();
  return results;
};
export default getPlanets;
