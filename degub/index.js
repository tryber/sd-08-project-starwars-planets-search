const fetch = require('node-fetch');
const fs = require('fs');

async function debug() {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const data = await response.json();
  fs.writeFileSync('data.json', JSON.stringify(data));
}

debug();
