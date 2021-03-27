// Para Arquivo inputNumericForm
export const initialState = {
  column: 'population',
  comparison: 'maior que',
  value: 0,
};

// Para // Para AlphabeticalOrder
export const initialStateAlph = {
  order: {
    column: 'name',
    sort: 'ASC',
  },
};

// Para o Provider
export const initialStateContext = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
  order: {
    column: 'name',
    sort: 'ASC',
  },
};

export const initialOptionsType = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

export const initialOptionsSize = ['maior que', 'menor que', 'igual a'];

// Para arquivo Table

export const columnsNames = ['names', 'rotation_period', 'orbital_period', 'diameter',
  'climate', 'gravity', 'terrain', 'surface_water',
  'population', 'films', 'created', 'edited', 'url'];

// Para AlphabeticalOrder

export const columnsNameOrder = ['names', 'rotation_period', 'orbital_period',
  'diameter', 'surface_water', 'population'];
