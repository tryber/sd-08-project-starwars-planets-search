const fetchPlanets = () => {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  return new Promise((resolve, reject) => {
    fetch(endpoint)
      .then((planets) => {
        if (planets.ok) {
          return planets.json();
        }
        throw new Error('Falha na Requisição!');
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};

export default fetchPlanets;
