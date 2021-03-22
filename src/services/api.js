// const fetch = require('node-fetch');

const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getPlanets = async () => {
  const results = await (await fetch(url)).json();
  return results;
};

export default getPlanets;
