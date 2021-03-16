import React, { useContext, useEffect, useState } from 'react';
import tableContext from '../context/tableContext';

function Table() {
  const {
    data,
    fetchStarWarsData,
    loading,
    handleChange,
    filterByValue,
    filters: {
      filterByName: { name },
    },
  } = useContext(tableContext);

  const [filters, setFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 'null',
  });

  useEffect(() => {
    async function getPlanets() {
      await fetchStarWarsData();
    }
    getPlanets();
  }, []);// eslint-disable-line

  const renderPlanet = (planet, key) => (
    <tr key={ key }>
      { Object.values(planet).map((info, index) => (
        <td key={ index }>
          { info }
        </td>
      )) }
    </tr>
  );

  const handleChangeColumns = ({ target: { name: nome, value } }) => {
    setFilters({
      ...filters,
      [nome]: value,
    });
  };

  const handleFilterButton = (event) => {
    event.preventDefault();
    filterByValue(filters);
  };

  if (loading === true) return <div>LOADING</div>;
  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        value={ name }
        onChange={ handleChange }
      />
      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleChangeColumns }
        required
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleChangeColumns }
        required
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        name="value"
        data-testid="value-filter"
        onChange={ handleChangeColumns }
        required
      />
      <button
        type="submit"
        data-testid="button-filter"
        onClick={ handleFilterButton }
      >
        Adcionar filtro
      </button>
      <table>
        <thead>
          <tr>
            { Object.keys(data[0]).map((header, index) => (
              <th key={ index }>{header}</th>)) }
          </tr>
        </thead>
        <tbody>
          { data
            .filter((planet) => (name ? planet.name.includes(name) : true))
            .map((planet, key) => renderPlanet(planet, key)) }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
