import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Sort() {
  const {
    filters,
    setFilter,
    sortFunction,
  } = useContext(StarWarsContext);

  const columnsType = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'population',
    'climate',
    'gravity',
    'terrain',
    'surface_water',
    'films',
    'created',
    'edited',
    'url',
  ];

  const handleSelect = (e) => {
    const { value, name } = e.target;
    const obj = { ...filters };
    obj.order[name] = value;
    setFilter(obj);
  };

  const obj = { ...filters };
  const sortValue = obj.order.sort;
  const filterValue = obj.order.column;

  return (
    <div>
      <label htmlFor="ASC">
        Ascendente
        <input
          id="ASC"
          data-testid="column-sort-input-asc"
          type="radio"
          value="ASC"
          name="sort"
          onChange={ (e) => handleSelect(e) }
        />
      </label>
      <label htmlFor="DESC">
        Descendente
        <input
          id="DESC"
          data-testid="column-sort-input-desc"
          name="sort"
          type="radio"
          value="DESC"
          onChange={ (e) => handleSelect(e) }
        />
      </label>
      <select
        data-testid="column-sort"
        id="column"
        name="column"
        onChange={ (e) => handleSelect(e) }
      >
        {columnsType.map((option) => (
          <option key={ option } value={ option }>{option}</option>
        ))}
      </select>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => sortFunction(sortValue, filterValue) }
      >
        Ordenar
      </button>
    </div>
  );
}

export default Sort;
