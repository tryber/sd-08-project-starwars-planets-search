import React, { useContext, useState } from 'react';
// import PropTypes from 'prop-types';

import { Context } from '../context';
import ActiveFilters from './ActiveFilters';
import { InputNumber, InputText, Select } from './inputs';

const columns = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];
const comparisons = ['maior que', 'igual a', 'menor que'];

const Header = () => {
  const { filters: { filterByName, filterByNumericValues,
    setFilterNumeric } } = useContext(Context);

  const [columnFilter, setColumnFilter] = useState('');
  const [comparisonFilter, setComparisonFilter] = useState('');
  const [numericFilter, setNumericFilter] = useState('');

  const existingColumnsFilter = filterByNumericValues.map(({ column }) => column);

  const availableColumns = columns.filter((column) => (
    !existingColumnsFilter.includes(column)));

  const handleFilter = () => {
    const filterNumeric = {
      column: columnFilter,
      comparison: comparisonFilter,
      value: numericFilter,
    };
    setFilterNumeric([...filterByNumericValues, filterNumeric]);
  };

  return (
    <header>
      <InputText
        name="name-filter"
        label="Find by name: "
        stateUpdater={ filterByName.setFilter }
      />
      <section>
        <Select
          name="column-filter"
          label="Column: "
          options={ availableColumns }
          stateUpdater={ setColumnFilter }
        />
        <Select
          name="comparison-filter"
          label="Comparison: "
          options={ comparisons }
          stateUpdater={ setComparisonFilter }
        />
        <InputNumber
          name="value-filter"
          label="Value: "
          stateUpdater={ setNumericFilter }
        />
        <button type="button" data-testid="button-filter" onClick={ handleFilter }>
          Filter
        </button>
      </section>
      <ActiveFilters
        filterArray={ filterByNumericValues }
        stateUpdater={ setFilterNumeric }
      />
    </header>
  );
};

// Header.propTypes = {

// };

export default Header;
