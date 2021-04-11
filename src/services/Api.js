export default async function planetsFetch() {
  const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const json = await request.json();
  return json.results;
}
