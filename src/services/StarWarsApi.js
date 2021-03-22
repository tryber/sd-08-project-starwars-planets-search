const getPlanetsInfo = async () => {
  const planetData = await (await fetch('https://swapi-trybe.herokuapp.com/api/planets/')).json();
  return planetData.results;
};

export default getPlanetsInfo;
