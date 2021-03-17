async function requestApi() {
  const fetchApi = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const jsonApi = await fetchApi.json();
  return jsonApi;
}

export default requestApi;
