const fs = require('fs');
const fetch = require('node-fetch');

const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getPlanets = async () => {
  const data = await fetch(URL).then((res) => res.json()).then((res) => res.results);
  fs.writeFileSync('planets.json', JSON.stringify(data));
  return data;
};

getPlanets();
