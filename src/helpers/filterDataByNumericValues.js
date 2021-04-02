function filterDataByNumericValues(data, filters) {
  const filtred = filters.reduce((acc, numericFilter) => {
    const { column, comparison, value } = numericFilter;
    return acc.filter((current) => {
      switch (comparison) {
      case 'maior que':
        return parseInt(current[column], 10) > parseInt(value, 10);
      case 'menor que':
        return parseInt(current[column], 10) < parseInt(value, 10);
      case 'igual a':
        return parseInt(current[column], 10) === parseInt(value, 10);
      default:
        return true;
      }
    });
  }, data);
  return filtred || [];
}

export default filterDataByNumericValues;
