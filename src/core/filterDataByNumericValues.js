export default function filterDataByNumericValues(data, filterByNumericValues) {
  const {
    column, comparison, value,
  } = filterByNumericValues[filterByNumericValues.length - 1];

  if (comparison === 'menor que') {
    return data.filter((planet) => planet[column] < value);
  }
  if (comparison === 'maior que') {
    return data.filter((planet) => planet[column] > value);
  }
  if (comparison === 'igual a') {
    return data.filter((planet) => planet[column] === value);
  }
  return data;
}
