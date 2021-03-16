async function getPlanetsAPI() {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const dataJSON = await fetch(url);
  const data = await dataJSON.json();
  const dataNoResidents = data.results.map((obj) => {
    delete obj.residents;
    return { ...obj };
  });
  return dataNoResidents;
}

export default getPlanetsAPI;
