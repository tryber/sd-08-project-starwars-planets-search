const getPlanets = async () => {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const request = await fetch(url);
  const json = await request.json();
  return json.results;
};

export default getPlanets;
