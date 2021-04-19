export default async function fetchAPI() {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  try {
    const requestReturn = await fetch(url);
    const requestObject = await requestReturn.json();
    return requestObject.results;
  } catch (error) {
    return error;
  }
}
