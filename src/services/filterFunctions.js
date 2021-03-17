export function removeKeysArrayObj(arrayObjToRemove, key) {
  const toRemove = [...arrayObjToRemove];
  toRemove.forEach((e) => {
    delete e[key];
  });
  return toRemove;
}

export function filterArrayObjByString(arrToFilter, key, expression) {
  return arrToFilter.filter((e) => e[key].includes(expression));
}

export function filterArrayObjByNumber(arrToFilter, key, comparator, value) {
  const replaceComma = value.replace(',', '.');
  const numberValue = parseFloat(replaceComma);
  return arrToFilter.filter((e) => {
    const replaceCommaElement = e[key].replace(',', '.');
    const numberValueElement = parseFloat(replaceCommaElement);
    switch (comparator) {
    case 'maior que':
      return numberValueElement > numberValue;
    case 'menor que':
      return numberValueElement < numberValue;
    case 'igual a':
      return numberValueElement === numberValue;
    default:
      return false;
    }
  });
}

export function setNumericFilter(filters, setter, form) {
  const { columnFilter, comparisonFilter, valueFilter } = form;
  const { filterByNumericValues } = filters;
  const setObj = filterByNumericValues.filter((e) => (
    e.column !== columnFilter
  ));
  const formObj = {
    column: columnFilter,
    comparison: comparisonFilter,
    value: valueFilter,
  };
  setter({
    ...filters,
    filterByNumericValues: [
      ...setObj,
      formObj,
    ],
  });
}

export function removeFromNumericFilter(getter, setter, name) {
  const { filterByNumericValues } = getter;
  const setObj = filterByNumericValues.filter((e) => (
    e.column !== name
  ));
  setter({
    ...getter,
    filterByNumericValues: [
      ...setObj,
    ],
  });
}

export function removeFilterOption({ filterByNumericValues }, getter) {
  const persistentFilters = { ...getter };
  filterByNumericValues.forEach((e) => {
    delete persistentFilters[e.column];
  });
  return persistentFilters;
}

export function filterJunction(arrToFilter, { filterByName, filterByNumericValues }) {
  const { name } = filterByName;
  const filteredName = filterArrayObjByString(arrToFilter, 'name', name);
  const filteredNumber = filterByNumericValues.reduce((acc, cur) => {
    const { column, comparison, value } = cur;
    return filterArrayObjByNumber(acc, column, comparison, value);
  }, filteredName);
  return filteredNumber;
}
