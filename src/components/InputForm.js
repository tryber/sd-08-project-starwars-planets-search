import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import NumericFilter from '../filters/NumericFilter';
import SortTableForm from './SortTableForm';

export default function InputForm() {
  const { filters, setFilters } = useContext(PlanetsContext);
  const {
    filterByName: { name },
  } = filters;

  const handChange = (event) => {
    setFilters({
      ...filters,
      filterByName: {
        name: event.target.value,
      },
    });
  };

  return (
    <form>
      <input
        type="text"
        value={ name }
        onChange={ handChange }
        data-testid="name-filter"
        placeholder="filter by name"
      />
      <NumericFilter />
      <SortTableForm />
    </form>
  );
}
