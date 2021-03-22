import React, { useContext, useState } from 'react';
import StarwarsContext from '../context/StarwarsContext';

const filterHeader = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

/* const filterFields = [
  {
    tipo: 'texto',
    param: '',
    valor: 'Tatoo',
  },
  {
    tipo: 'numero',
    param: 'diameter',
    condicao: 'maior',
    valor: 5000,
  },
  {
    tipo: 'numero',
    param: 'population',
    condicao: 'menor',
    valor: 1000000,
  },
]; */

export default function SelectHeader() {
  const { filter, setFilter } = useContext(StarwarsContext);
  const [data, setData] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const handleSelect = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value,
    });
  };

  const handleClick = () => {
    // console.log(filter);
    setFilter([
      ...filter,
      data,
    ]);
  };

  const removeFilter = (obj) => {
    // console.log(obj);
    setFilter([...filter].filter((i) => i !== obj));
  };
  /* const filterButton = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        select,
      ],
    });
  }; */

  return (
    <div>
      <select
        name="column"
        data-testid="column-filter"
        onChange={ handleSelect }
      >
        { filterHeader.map((item, index) => (
          <option key={ index } value={ item }>{ item }</option>)) }
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ handleSelect }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        name="value"
        data-testid="value-filter"
        onChange={ handleSelect }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filter
      </button>
      <div>
        { filter.map((i, index) => (
          <div key={ index } data-testid="filter">
            <button
              type="button"
              onClick={ () => removeFilter(i) }
            >
              X
            </button>
          </div>
        )) }
      </div>
    </div>
  );
}
