import React, { useContext } from 'react';
import MyContext from '../context';
import CombinedFilters from './filters/CombinedFilters';
import OrderFilter from './filters/OrderFilter';
import OldFilter from './filters/OldFilter';

function FilterBlock() {
  const { filterByNumericValues } = useContext(MyContext).filters;
  return (
    <>
      <CombinedFilters />
      <OrderFilter />
      {filterByNumericValues.map((filter, index) => (
        <OldFilter key={ filter.column } filterIndex={ index } />
      ))}
    </>
  );
}

export default FilterBlock;
