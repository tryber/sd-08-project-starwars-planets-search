export default {
  filterByName: (array = [], name) => array
    .filter(planet.name.toLowerCase().includes(name.toLowerCase())),

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
      filtered = [...planets
        .filter((planet) => Number(planet[column]) === Number(value))];
    });
    return filtered;
  },
};
