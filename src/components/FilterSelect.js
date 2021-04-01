import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const INITIAL_SELECT_OPTIONS_FILTER = ['population',
  'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

const INITIAL_DATA_FILTERS = {
  column: 'population',
  comparison: '',
  value: '',
};

export default function FilterSelect() {
  const { setFilters, filters } = useContext(PlanetsContext);
  const [selectFilters, setSelectFilters] = useState(INITIAL_SELECT_OPTIONS_FILTER);
  const [dataFilters, setDataFilters] = useState({ ...INITIAL_DATA_FILTERS });

  const handleChange = ({ target: { value, name } }) => {
    setDataFilters({ ...dataFilters, [name]: value });
  };

  const handleClick = () => {
    setFilters({ ...filters, ...{ filterByNumericValues: [dataFilters] } });
    const { column, value } = dataFilters;
    if (value) {
      const newSelectFilters = selectFilters.filter((element) => element !== column);
      setSelectFilters(newSelectFilters);
    }
  };
  const handleClear = () => {
    setFilters({ ...filters, ...{ filterByNumericValues: [INITIAL_DATA_FILTERS] } });

    setSelectFilters(INITIAL_SELECT_OPTIONS_FILTER);
  };

  return (
    <>
      <select
        name="column"
        data-testid="column-filter"
        onChange={ (event) => handleChange(event) }
      >
        {selectFilters.map((element, index) => (
          <option key={ index } value={ element }>{element}</option>
        ))}
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ (event) => handleChange(event) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>

      </select>
      <input
        onChange={ (event) => handleChange(event) }
        data-testid="value-filter"
        type="number"
        placeholder="0"
        name="value"
      />
      <button
        onClick={ () => handleClick() }
        data-testid="button-filter"
        type="button"
        value="Filtrar"
      >
        Filtrar
      </button>
      <div data-testid="filter">
        <button
          type="button"
          value="X"
          onClick={ () => handleClear() }
        >
          X
        </button>

      </div>
    </>
  );
}
