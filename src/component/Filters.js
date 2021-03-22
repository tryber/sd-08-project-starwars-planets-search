import React, { useContext } from 'react';
import { comparison } from '../constantes/constanteApi';
import contextApi from '../contextApi/createContext';

function Filters() {
  const {
    filters,
    fixFilters,
    filterBy,
    fixFilterBy,
    copyKeys,
  } = useContext(contextApi);
  const onChangeNamePlanet = ({ target: { value } }) => {
    fixFilters({ ...filters, filterByName: { name: value } });
  };

  const onChangeFilterBy = ({ target: { value, name } }) => {
    fixFilterBy({ ...filterBy, [name]: value });
  };

  const onClickFiltersBy = () => {
    const { filterByNumericValues } = filters;
    fixFilters({
      ...filters,
      filterByNumericValues: [
        ...filterByNumericValues,
        filterBy,
      ],
    });
  };

  return (
    <div>
      <form>
        <label htmlFor="name">
          Digite o nome do planeta:
          {' '}
          <input
            id="name"
            type="text"
            data-testid="name-filter"
            onChange={ onChangeNamePlanet }
          />
        </label>
      </form>
      <form>
        <label htmlFor="filter-for">
          Filtrar por:
          {' '}
          <select
            data-testid="column-filter"
            id="filter-for"
            name="column"
            onChange={ onChangeFilterBy }
          >
            { copyKeys.map((element) => (
              <option key={ element }>
                { element }
              </option>
            )) }
          </select>
        </label>
        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ onChangeFilterBy }
        >
          { comparison.map((element) => (
            <option key={ element }>
              { element }
            </option>
          )) }
        </select>
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          onChange={ onChangeFilterBy }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ onClickFiltersBy }
        >
          Filtrar
        </button>
      </form>
    </div>
  );
}

export default Filters;
