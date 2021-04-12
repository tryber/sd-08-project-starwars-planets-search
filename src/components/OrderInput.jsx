import React, { useContext, useState } from 'react';
import { PlanetContext } from '../context/PlanetProvider';

export default function ColumnFilterButton() {
  const { setColumnOrder, setSort } = useContext(PlanetContext);
  const columnsArray = ['Name', 'population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const [collumn, setColumn] = useState('');
  const [sort, setSortt] = useState('');

  // const handleChange = (e) => {
  //   const { name } = e.target;
  //   const { value } = e.target;
  //   if (name === 'column') {
  //     setColumnOrder(collumn);
  //   } else {
  //     setSort(value);
  //   }
  // };

  const handleClick = () => {
    setColumnOrder(collumn);
    setSort(sort);
  };

  return (
    <>
      <select
        name="column"
        data-testid="column-sort"
        onChange={ (e) => setColumn(e.target.value) }
      >
        {columnsArray.map((column) => (
          <option value={ column } key={ column }>{column}</option>
        ))}
      </select>
      <label htmlFor="column-sort-input-asc">
        ASC
        <input
          name="sort"
          id="column-sort-input-asc"
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          onChange={ (e) => setSortt(e.target.value) }
        />
      </label>
      <label htmlFor="column-sort-input-desc">
        DESC
        <input
          name="sort"
          id="column-sort-input-desc"
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          onChange={ (e) => setSortt(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleClick }
      >
        Ordernar
      </button>
    </>
  );
}
