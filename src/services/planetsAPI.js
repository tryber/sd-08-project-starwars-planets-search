// const URL_DEV = 'https://swapi.dev/api/planets/';
const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const planetsAPI = async () => {
  const planets = await fetch(URL)
    .then((reponse) => reponse.json());
  return planets;
};

export default planetsAPI;
