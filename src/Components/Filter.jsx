import React, { useContext, useEffect, useState } from 'react';
import SWContext from '../Context/SWContext';

function Filter() {
  const {
    filterByName,
    filters,
    menu,
    setMenu,
    addNumericFilter,
  } = useContext(SWContext);

  const dropdownContent = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  useEffect(() => {
    const { filterByNumericValues } = filters;
    setMenu(dropdownContent.filter((content) => (
      !filterByNumericValues.some((filter) => filter.column === content)
    )));
  }, [filters]);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  const filterHandle = (event, callback) => {
    callback(event.target.value);
  };

  const startFilterHandle = (e) => {
    e.preventDefault();
    addNumericFilter(column, comparison, value);
  };

  return (
    <div>
      <label htmlFor="name-filter">
        Filtrar por Nome:
        <input
          type="text"
          id="name-filter"
          data-testid="name-filter"
          onChange={ filterByName }
        />
      </label>
      <label htmlFor="column-filter">
        Coluna:
        <select
          name="column"
          id="column-filter"
          data-testid="column-filter"
          onChange={ (e) => filterHandle(e, setColumn) }
        >
          { menu.map((item, index) => (
            <option key={ index }>{ item }</option>
          )) }
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Comparação:
        <select
          name="comparison"
          id="comparison-filter"
          data-testid="comparison-filter"
          onChange={ (e) => filterHandle(e, setComparison) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        Valor:
        <input
          type="number"
          name="value-filter"
          id="value-filter"
          data-testid="value-filter"
          onChange={ (e) => filterHandle(e, setValue) }
        />
      </label>
      <button
        type="button"
        onClick={ startFilterHandle }
        data-testid="button-filter"
      >
        Adicionar filtro
      </button>
    </div>
  );
}

export default Filter;
