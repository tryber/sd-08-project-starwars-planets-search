import sorting from './sorting';

const filtering = (data, filters, setFilteredData) => {
  const { filterByName: { name } } = filters;
  const { filterByNumericValues, order } = filters;
  let newResults = data.filter(
    (planet) => planet.name.toLowerCase().includes(name.toLowerCase()),
  );
  filterByNumericValues.map((item) => {
    const { comparison, column, value } = item;
    newResults = newResults.filter(
      (planet) => {
        const flag = planet.name.toLowerCase().includes(name.toLowerCase());

        if (comparison === 'maior que') {
          return (parseInt(planet[column], 10) || flag) > parseInt(value, 10) && flag;
        }

        if (comparison === 'menor que') {
          return parseInt(planet[column], 10) < parseInt(value, 10) && flag;
        }

        if (comparison === 'igual a') {
          return parseInt(planet[column], 10) === parseInt(value, 10) && flag;
        }
        return flag;
      },
    );
    return newResults;
  });
  const sortedArray = sorting(newResults, order);
  setFilteredData(sortedArray);
};

export default filtering;
