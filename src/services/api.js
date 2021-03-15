const api = {
  get: async (route) => {
    const result = await fetch(`https://swapi-trybe.herokuapp.com/api${route}`);
    const json = await result.json();

    return json;
  },
};

export default api;
