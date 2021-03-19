const SORT_ORDER_ASC = 1;
const SORT_ORDER_DESC = -1;
const IGNORE_COLUMNS_WITH_NUMBERS = ['orbital_period',
  'rotation_period',
  'diameter',
  'surface_water',
  'population'];

const noNumberColumn = (value) => !IGNORE_COLUMNS_WITH_NUMBERS.includes(value);

export const sortOrderAsc = (a, b, column) => {
  const columnOrderA = a[column];
  const columnOrderB = b[column];

  if (noNumberColumn(column)) {
    if (columnOrderA > columnOrderB) return SORT_ORDER_ASC;
    if (columnOrderA < columnOrderB) return SORT_ORDER_DESC;
  }
  return +columnOrderA - +columnOrderB;
};

export const sortOrderDesc = (a, b, column) => {
  const columnOrderA = a[column];
  const columnOrderB = b[column];

  if (noNumberColumn(column)) {
    if (columnOrderA < columnOrderB) return SORT_ORDER_ASC;
    if (columnOrderA > columnOrderB) return SORT_ORDER_DESC;
  }
  return +columnOrderB - +columnOrderA;
};

export const createSortPlanets = (column) => ({
  ASC: (a, b) => sortOrderAsc(a, b, column),
  DESC: (a, b) => sortOrderDesc(a, b, column),
}) || 0;
