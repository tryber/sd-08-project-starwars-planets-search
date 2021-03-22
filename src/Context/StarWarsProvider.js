import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  const [planetFilter, setPlanetFilter] = useState([planets]);
  const [columnOptions, setColumnOptions] = useState(['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const comparisons = ['maior que', 'menor que', 'igual a'];

  const [preferences, setPreferences] = useState({
    column: 'population',
    comparison: 'maior que',
    number: '',
  });

  useEffect(() => {
    const fetchPlanets = async () => {
      const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endPoint).then((res) => res.json());
      results.map((object) => delete object.residents);
      setPlanets(results);
    };
    fetchPlanets();
  }, []);

  const handleNameSearch = ({ target }) => {
    setNameSearch(target.value);
  };

  useEffect(() => {
    const planetsFilter = planets.filter((planet) => planet.name.includes((nameSearch)));
    setPlanetFilter(planetsFilter);
  }, [planets, nameSearch]);

  const handlePreferences = ({ target }) => {
    setPreferences({ ...preferences, [target.name]: target.value });
  };

  const filterPreferences = ({ column, comparison, number }) => {
    const filtered = planets.filter((planet) => {
      const columnInfo = Number(planet[column]);
      const compareValue = Number(number);
      if (comparison === 'menor que') {
        return columnInfo < compareValue;
      }
      if (comparison === 'maior que') {
        return columnInfo > compareValue;
      }
      return columnInfo === compareValue;
    });
    setPlanetFilter(filtered);
  };

  const handleClick = () => {
    const copiedColumn = columnOptions.filter((column) => column !== preferences.column);
    setColumnOptions(copiedColumn);
    filterPreferences(preferences);
  };

  const data = {
    planets,
    setPlanets,
    nameSearch,
    setNameSearch,
    planetFilter,
    setPlanetFilter,
    handleNameSearch,
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
