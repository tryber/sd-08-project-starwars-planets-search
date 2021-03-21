const getPlanet = async () => {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((data) => data.json());
  return response.results;
};

export default getPlanet;
