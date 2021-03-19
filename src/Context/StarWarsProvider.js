import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filterPlanet, setFilterPlanet] = useState([planets]);
  const [columnOptions, setColumnOptions] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const comparisons = ['maior que', 'menor que', 'igual a'];

  const [preferences, setPreferences] = useState({
    column: 'population',
    comparison: 'maior que',
    number: '',
  });

  useEffect(() => {
    const fetchPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((res) => res.json());
      results.map((obj) => delete obj.residents);
      setPlanets(results);
      console.log(results);
    };
    fetchPlanets();
  }, []);

  const handleSearchName = ({ target }) => {
    setSearchName(target.value);
  };

  useEffect(() => {
    const filterPlanets = planets.filter((planet) => planet.name.includes((searchName)));
    setFilterPlanet(filterPlanets);
  }, [planets, searchName]);

  const handlePreferences = ({ target }) => {
    setPreferences({ ...preferences, [target.name]: target.value });
  };

  const filterPreferences = ({ column, comparison, number }) => {
    const newFiltered = planets.filter((planet) => {
      const columnInfo = Number(planet[column]);
      const valueToCompare = Number(number);
      if (comparison === 'menor que') {
        return columnInfo < valueToCompare;
      }
      if (comparison === 'maior que') {
        return columnInfo > valueToCompare;
      }
      return columnInfo === valueToCompare;
    });
    setFilterPlanet(newFiltered);
  };
  const handleClick = () => {
    const copyColumn = columnOptions.filter((column) => column !== preferences.column);
    setColumnOptions(copyColumn);
    filterPreferences(preferences);
  };
  const data = {
    planets,
    setPlanets,
    searchName,
    setSearchName,
    filterPlanet,
    setFilterPlanet,
    handleSearchName,
    setPreferences,
    handlePreferences,
    handleClick,
    preferences,
    comparisons,
    columnOptions,
  };

  return (
    <StarWarsContext.Provider value={ data }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default StarWarsProvider;
