import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import TableH from './TableH';

function Table() {
  const { filteredPlanets, handleChange, inputName, columnSelect,
    handleSelect, comparisons, handleClick, filterOptions } = useContext(StarWarsContext);

  return (
    <section>
      <form>
        <label htmlFor="Name">
          Name:
          <input
            data-testid="name-filter"
            type="text"
            value={ inputName }
            onChange={ handleChange }
          />
        </label>

        <select
          data-testid="column-filter"
          name="column"
          value={ filterOptions.column }
          onChange={ handleSelect }
        >
          {columnSelect.map((el, index) => (
            <option key={ index }>{el}</option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          value={ filterOptions.comparison }
          onChange={ handleSelect }
        >
          {comparisons.map((el, index) => (
            <option key={ index }>{el}</option>
          ))}
        </select>
        <input
          type="number"
          name="value"
          data-testid="value-filter"
          value={ filterOptions.value }
          onChange={ handleSelect }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>

      </form>
      <table>
        <TableH />
        <tbody>
          {filteredPlanets.map((el) => (
            <tr key={ el.name }>
              <td>{el.name}</td>
              <td>{el.rotation_period}</td>
              <td>{el.orbital_period}</td>
              <td>{el.diameter}</td>
              <td>{el.climate}</td>
              <td>{el.gravity}</td>
              <td>{el.terrain}</td>
              <td>{el.surface_water}</td>
              <td>{el.population}</td>
              <td>{el.films}</td>
              <td>{el.created}</td>
              <td>{el.edited}</td>
              <td>{el.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>

  );
}

export default Table;
