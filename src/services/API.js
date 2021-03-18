const fetchData = async () => {
  const dataPlanets = await fetch('https://swapi.dev/api/planets/');
  const dataPlanetsJson = await dataPlanets.json();
  const planetsList = await dataPlanetsJson.results;
  return planetsList;
};

export default fetchData;
