const compare = (type, filterValue, planetValue) => {
  const [filter, planet] = [parseInt(filterValue, 10), parseInt(planetValue, 10)];
  switch (type) {
  case 'maior que':
    return planet > filter;
  case 'menor que':
    return planet < filter;
  case 'igual a':
    return planet === filter;
  default:
    return true;
  }
};

const filterNumeric = (key, planetValue, filterArray) => {
  const { comparison, value } = filterArray.find(({ column }) => column === key);
  return compare(comparison, value, planetValue);
};

export default filterNumeric;
