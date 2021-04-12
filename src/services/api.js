function fetchStarWars() {
  return new Promise((resolve, reject) => {
    const api = 'https://swapi-trybe.herokuapp.com/api/planets/';

    fetch(api)
      .then((response) => response.json().then((data) => resolve(data)))
      .catch((error) => reject(error));
  });
}

export default fetchStarWars;
