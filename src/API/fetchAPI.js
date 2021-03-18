const FETCH_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const FETCH_API = () => fetch(`${FETCH_URL}`)
  .then((r) => r.json())
  .then((data) => {
    const d = data.results;
    const result = d.map((res) => {
      delete res.residents;
      return res;
    });
    return result;
  });

export default FETCH_API;
