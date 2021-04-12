import React, { useContext, useState } from 'react';
import { ContextFromStarWars } from '../contexts/ContextFromStarWars';

function SwHeader() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('');
  const [valueNumber, setValueNumber] = useState(0);
  const [filteredColumns, setFilteredColumns] = useState([]);
  const [columnOrderType, setColumnOrderType] = useState('');
  const [columnOrderName, setColumnOrderName] = useState('name');
  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const {
    setSort,
    inputName,
    setInputName,
    setInstructionToFilter,
    instructionToFilter,
    planets,
    setFilteredPlanets,
  } = useContext(ContextFromStarWars);

  const handleColumnOrder = () => {
    setSort({
      sorted: columnOrderType,
      column: columnOrderName,
    });
  };

  const handleRemoveFiltering = (selector) => {
    const removeFilteredColumn = filteredColumns.filter(
      (filteredColumn) => filteredColumn !== selector,
    );

    const removeFilter = instructionToFilter.filter(
      (find) => find.column !== selector,
    );

    setInstructionToFilter(removeFilter);
    setFilteredPlanets(planets);
    setFilteredColumns(removeFilteredColumn);
    setColumns([...columns, selector]);
  };

  const handleColumnFiltering = () => {
    if (comparison.length > 0) {
      setInstructionToFilter([
        ...instructionToFilter,
        {
          column,
          comparison,
          value: valueNumber,
        },
      ]);

      const columnsFilter = columns.filter(
        (columnFilter) => columnFilter !== column,
      );
      setColumns(columnsFilter);
      setFilteredColumns([...filteredColumns, column]);
      setComparison('');
    }
  };

  return (
    <div className="swHeaderContainer">
      <input
        type="text"
        data-testid="name-filter"
        placeholder="search name"
        value={ inputName }
        onChange={ ({ target }) => setInputName(target.value) }
      />

      <div className="swHeaderFilterColumns">
        <select
          value={ column }
          name="column"
          data-testid="column-filter"
          onChange={ ({ target }) => setColumn(target.value) }
        >

          {columns.map((element) => (
            <option key={ element } value={ element }>
              {element}
            </option>
          ))}
        </select>

        <select
          value={ comparison }
          name="comparison"
          data-testid="comparison-filter"
          onChange={ ({ target }) => setComparison(target.value) }
        >
          <option value="">
            option
          </option>
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          placeholder="amount"
          value={ valueNumber }
          onChange={ ({ target }) => setValueNumber(target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleColumnFiltering }
        >
          Filter
        </button>
      </div>

      <div className="swHeaderColumnSort">
        <select
          value={ columnOrderName }
          name="comparison"
          data-testid="column-sort"
          onChange={ ({ target }) => setColumnOrderName(target.value) }
        >
          {['name', 'rotation_period',
            'diameter',
            'surface_water',
            'population', 'orbital_period', 'climate', 'terrain', 'films', 'url'].map(
            (columnOptionSort) => (
              <option key={ columnOptionSort } value={ columnOptionSort }>
                {columnOptionSort}
              </option>
            ),
          )}
        </select>
        <label htmlFor="asc">
          ASC:
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            name="sort"
            value="ASC"
            onClick={ ({ target }) => setColumnOrderType(target.value) }
          />
        </label>

        <label htmlFor="desc">
          DESC:
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            name="sort"
            value="DESC"
            onClick={ ({ target }) => setColumnOrderType(target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleColumnOrder }
        >
          Sort
        </button>
      </div>

      <ul className="swFilterList" data-testid="filter">
        {!filteredColumns
          || filteredColumns.map((filteredColumn) => (
            <li key={ filteredColumn }>
              {filteredColumn}
              <button
                type="button"
                onClick={ () => handleRemoveFiltering(
                  filteredColumn,
                ) }
              >
                X
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SwHeader;
