import React, { useContext, useState, useEffect } from 'react';
import { planetsContext } from './PlanetsProvider';
import TableHead from './TableHead';

const FILTERS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const PlanetsTable = () => {
  const {
    filteredPlanets,
    setName,
    setNumericFilter,
    filters,
    setFilters,
  } = useContext(planetsContext);
  const { filterByNumericValues } = filters;
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const [availableFilters, setAvailableFilters] = useState(FILTERS);

  const renderTableBody = () => (
    <tbody>
      {
        filteredPlanets.map((planet) => (
          <tr key={ planet.name }>
            <td>{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>
              {
                planet.films.map((film) => `${film}, `)
              }
            </td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))
      }
    </tbody>
  );

  const handleChange = ({ target }) => {
    setName(target.value);
  };

  useEffect(() => {
    setAvailableFilters(FILTERS
      .filter((filt) => !filterByNumericValues
        .find((numFil) => numFil.column === filt)));
  }, [filterByNumericValues]);

  useEffect(() => {
    setColumn(availableFilters[0]);
  }, [availableFilters]);

  const renderForm = () => (
    <form>
      <div>
        <p>Digite um nome:</p>
        <input data-testid="name-filter" type="text" onChange={ handleChange } />
      </div>
      <div>
        <select
          data-testid="column-filter"
          value={ column }
          onChange={ (e) => setColumn(e.target.value) }
        >
          {
            availableFilters
              .map((each) => <option key={ each } value={ each }>{each}</option>)

          }
        </select>
        <select
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ (e) => setComparison(e.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          value={ value }
          type="number"
          step="1"
          onChange={ (e) => setValue(e.target.value) }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => setNumericFilter(column, comparison, value) }
        >
          Adicionar filtro
        </button>
      </div>
    </form>
  );

  const handleClick = (delcolumn) => {
    const newNumericFilters = filterByNumericValues
      .filter((filt) => filt.column !== delcolumn);
    console.log(newNumericFilters);
    setFilters({
      ...filters,
      filterByNumericValues: [...newNumericFilters],
    });
  };

  return (
    <>
      {availableFilters.length > 0 ? renderForm() : <p>No more filters</p>}
      <div>
        <p>Active filters:</p>
        {
          filterByNumericValues && filterByNumericValues
            .map((each) => (
              <li key={ each } data-testid="filter">
                {each.column}
                {' '}
                { each.comparison}
                {' '}
                {each.value}
                <button
                  type="button"
                  onClick={ () => handleClick(each.column) }
                >
                  X
                </button>
              </li>))
        }
      </div>

      <table>
        <TableHead />
        { renderTableBody() }
      </table>
    </>
  );
};

export default PlanetsTable;
