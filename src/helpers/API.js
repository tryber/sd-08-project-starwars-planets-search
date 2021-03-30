const STARWARS_API = 'https://swapi-trybe.herokuapp.com/api/planets/';
async function FetchStarWars() {
  const results = await fetch(STARWARS_API)
    .then((response) => response.json());
  return results.results;
}
export default FetchStarWars;
