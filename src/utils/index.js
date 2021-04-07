export default {
  filterByName: (arr = [], name) => arr
    .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase())),

  filterByNumericValues: (planets = [], filters = []) => {
    let filtered = [];
    filters.forEach((filter) => {
      const { column, comparison, value } = filter;
      if (comparison === 'maior que') {
        filtered = [...planets
          .filter((planet) => Number(planet[column]) > Number(value))];
      }
      if (comparison === 'menor que') {
        filtered = [...planets
          .filter((planet) => Number(planet[column]) < Number(value))];
      }
      if (comparison === 'igual a') {
        filtered = [...planets
          .filter((planet) => Number(planet[column]) === Number(value))];
      }
    });

    return filtered;
  },
};
