import React, { useContext } from 'react';
import context from '../context/context';

function FilterControl() {
  const { data, filter, setFilter, setPlanetFiltered } = useContext(context);

  const handleChange = ({ target }) => {
    setFilter({ ...filter,
      filterByName: {
        name: target.value,
      } });
  };

  const handleChangeColumn = ({ target: { name, value } }) => {
    setFilter({ ...filter,
      filterByNumericValues: [{ ...filter.filterByNumericValues[0], [name]: value }],
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    const filters = filter.filterByNumericValues;
    if (filters.length > 0) {
      const { column, comparison, value } = filters[0];
      let newData = [];
      if (comparison === 'maior que') {
        newData = data.filter((planet) => planet[column] > parseFloat(value));
      } else if (comparison === 'menor que') {
        newData = data.filter((planet) => planet[column] < parseFloat(value));
      } else if (comparison === 'igual a') {
        newData = data
          .filter((planet) => parseFloat(planet[column]) === parseFloat(value));
      }
      setPlanetFiltered(newData);
    }
  };

  return (
    <form
      className="
    form-group bg-dark text-white p-5 row align-items-center justify-content-around"
      action=""
    >

      <label htmlFor="filterInput">
        <input
          id="filterInput"
          placeholder="Planet Name"
          type="text"
          data-testid="name-filter"
          className="form-control"
          onChange={ handleChange }
        />
      </label>

      <select
        name="column"
        className="p-2"
        data-testid="column-filter"
        onChange={ handleChangeColumn }
      >
        <option disabled selected>Column</option>
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        className="p-2"
        name="comparison"
        data-testid="comparison-filter"
        onChange={ handleChangeColumn }
      >
        <option disabled selected>Comparison</option>
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <label htmlFor="filterNumber" onChange={ handleChangeColumn }>
        <input
          id="filterNumber"
          name="value"
          placeholder="only numbers"
          type="number"
          data-testid="value-filter"
          className="form-control"
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        className="btn btn-primary"
        onClick={ handleClick }
      >
        Filtrar
      </button>

    </form>
  );
}

export default FilterControl;
