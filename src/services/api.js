const StarWarsData = async () => {
  const requestData = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const { results } = await requestData.json();
  return results;
};

export default StarWarsData;
