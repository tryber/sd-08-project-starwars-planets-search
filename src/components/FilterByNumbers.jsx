import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';


function FilterByNumbers() {
  const {
    addFilterNumericValue,
    filters,
    setFilteredData,
    // removeFilter,
  } = useContext(StarWarsContext);
  const { filterByNumericValues } = filters;

  const columnFilter = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('');
  const [number, setNumberFilter] = useState(0);
  const [columns, setColumns] = useState(columnFilter);

  const comparisonFilter = ['', 'maior que', 'menor que', 'igual a'];

  const handleNumericFilters = () => {
    addFilterNumericValue(column, comparison, number);
    columns.splice(columns.indexOf(column),1);
  };

  const removeFilter = (index) => {
    const filtersCopy = {...filters};
    const columnToAdd = filtersCopy.filterByNumericValues[index].column;
    console.log(columnToAdd);
    filtersCopy.filterByNumericValues.splice(index, 1);
    setFilteredData(filtersCopy);
    console.log(columns);
    columns.push(columnToAdd);
  }

  return (
    <div>
      <label htmlFor="selectFilter">
        Selecione o filtro:
        <select
          id="selectFilter"
          name="selectFilter"
          data-testid="column-filter"
          value={column}
          onChange={(e) => setColumn(e.target.value)}
        >
          {columns.map((element) => (
            <option value={element} key={element}>
              {element}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="selectComparison">
        Selecione a comparação
        <select
          id="selectComparison"
          name="selectComparison"
          data-testid="comparison-filter"
          value={comparison}
          onChange={(e) => setComparison(e.target.value)}
        >
          {comparisonFilter.map((element) => (
            <option key={element} value={element}>
              {element}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="numberFilter">
        Digite o número:
        <input
          data-testid="value-filter"
          type="number"
          name="numberFilter"
          value={number}
          onChange={(e) => setNumberFilter(e.target.value)}
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={() => handleNumericFilters()}
      >
        Filtrar
      </button>
      {filterByNumericValues.map((element, index) => (
        <div data-testid="filter">
          <span key={index}>{element.column} | {element.comparison} | {element.value}</span>
          <button onClick={()=> removeFilter(index)}>X</button>
        </div>
      ))}
    </div>
  );
}

export default FilterByNumbers;
