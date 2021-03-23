const API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchAPI = async () => {
  const request = await fetch(API_URL);
  const response = await request.json();
  return (response.results);
};
export default fetchAPI;
