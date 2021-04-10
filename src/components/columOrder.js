import React, { useState, useContext, useEffect } from 'react';
import myContext from '../context/dataContext';

function OrderColumn() {
  const [filterOrderColumn, setFilterOrderColumn] = useState({});
  // const [checkedASC, setCheckedASC] = useState(true);
  // const [checkedDESC, setCheckedDESC] = useState(false);
  const { data,
    filterByPlanetName, setFilterByPlanetName } = useContext(myContext);
  const { filters: { filterByName, filterByNumericValues } } = filterByPlanetName;

  function removeResidentsField() {
    return Object
      .keys(data[0])
      .filter((head) => head !== 'residents');
  }

  useEffect(() => {
    setFilterOrderColumn(
      {
        column: 'name',
        sort: 'ASC',
      },
    );
  }, []);

  function submitOrder() {
    setFilterByPlanetName({
      ...filterByPlanetName,
      filters: {
        filterByName,
        filterByNumericValues,
        order: filterOrderColumn,
      },
    });
  }

  function handleChange({ target }) {
    setFilterOrderColumn(
      {
        ...filterOrderColumn,
        [target.name]: target.value,
      },
    );
  }

  return (
    <>
      <select onChange={ handleChange } data-testid="column-sort" name="column">
        {(data[0])
          ? removeResidentsField().map((cada) => <option key={ cada }>{cada}</option>)
          : ''}
      </select>
      <label htmlFor="ASC">
        ASC
        <input
          // onClick={ () => { setCheckedDESC(!checkedDESC); setCheckedASC(!checkedASC); } }
          onChange={ handleChange }
          id="ASC"
          data-testid="column-sort-input-asc"
          type="radio"
          name="sort"
          value="ASC"
          // checked={ checkedASC }
        />
      </label>
      <label htmlFor="DESC">
        DESC
        <input
          // onClick={ () => { setCheckedASC(!checkedASC); setCheckedDESC(!checkedDESC); } }
          onChange={ handleChange }
          id="DESC"
          data-testid="column-sort-input-desc"
          type="radio"
          name="sort"
          value="DESC"
          // checked={ checkedDESC }
        />
      </label>
      <button
        onClick={ submitOrder }
        data-testid="column-sort-button"
        type="button"
      >
        Submeter
      </button>
    </>
  );
}

export default OrderColumn;
