import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import FilterFormNumeric from './FilterFormNumeric';
import SortForm from './SortForm';

export default function FilterForm() {
  const { filters, setFilters } = useContext(PlanetsContext);
  const { filterByName: { name } } = filters;

  const handleChange = (e) => {
    setFilters({
      ...filters,
      filterByName: {
        name: e.target.value,
      },
    });
  };

  return (
    <form>
      <input
        type="text"
        value={ name }
        onChange={ handleChange }
        data-testid="name-filter"
        placeholder="Search by name"
      />
      <FilterFormNumeric />
      <SortForm />
    </form>
  );
}
