import React, { useContext, useState } from 'react';
import FilterContext from '../context/Filters';

const INITIAL_STATE = {
  column: 'population',
  comparison: 'maior que',
  value: '0',
};

function Search() {
  const [state, setState] = useState(INITIAL_STATE);
  const { filters, setFilters } = useContext(FilterContext);

  const setFilterName = ({ target }) => {
    setFilters({
      ...filters, filterByName: { name: target.value },
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const submitSearch = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        state,
      ],
    });
  };

  const removeFilter = (i) => {
    const newNumeric = filters.filterByNumericValues;
    newNumeric.splice(i, 1);
    const newFilters = { ...filters, filterByNumericValues: [...newNumeric] };
    console.log(newFilters);
    setFilters({ ...newFilters });
  };

  return (

    <div>
      <input
        onChange={ setFilterName }
        placeholder="Buscar Nome"
        data-testid="name-filter"
      />
      <label htmlFor="column">
        Selecione a coluna
        <select
          onChange={ handleChange }
          value={ state.column }
          name="column"
          data-testid="column-filter"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison">
        Selecione a Condição
        <select
          onChange={ handleChange }
          value={ state.comparison }
          name="comparison"
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value">
        Digite o valor:
        <input
          onChange={ handleChange }
          value={ state.value }
          type="number"
          name="value"
          data-testid="value-filter"
        />
      </label>
      <button
        type="button"
        onClick={ submitSearch }
        data-testid="button-filter"
      >
        Buscar
      </button>

      <section>
        <ul>
          {filters.filterByNumericValues.map((fil, index) => (
            <li data-testid="filter" key={ index }>
              {`${fil.column} ${fil.comparison}: ${fil.value}`}
              <button type="button" onClick={ () => removeFilter(index) }>X</button>
            </li>))}
        </ul>
      </section>
    </div>
  );
}

export default Search;
