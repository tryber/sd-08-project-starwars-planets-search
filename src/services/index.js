export default {
  fetchData: async () => {
    const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const result = await fetch(url);
    const resultJSON = await result.json();
    return resultJSON;
  },
  fetchByName: async (callback, name) => {
    const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const result = await fetch(url);
    const resultJSON = await result.json();
    callback({
      ...resultJSON,
      results: resultJSON
        .results
        .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase())),
    });
  },
};
