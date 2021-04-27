export const RESIDENTS_INDEX = 9;

export const firstSelector = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
export const secondSelector = ['maior que', 'igual a', 'menor que'];

export const clearFilters = {
  filters: {
    filterByName: { name: '' },
    filterByNumericValues: [{ column: '', comparison: '', value: 0 }],
  },
};
