const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
const fetchStarWars = async () => {
  const required = await fetch(URL)
    .then((response) => response.json());
  required.results.forEach((element) => {
    delete element.residents;
  });
  return required;
};

export default fetchStarWars;
