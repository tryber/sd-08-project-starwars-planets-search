import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FilterContext from './FilterContext';

function Provider({ children }) {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planets, setPlanets] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filterPlanet, setFilterPlanet] = useState([]);
  const [columnOptions, setColumnOptions] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [size, setSize] = useState(['maior que', 'menor que', 'igual a']);
  const [preference, setPreference] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });

  useEffect(() => {
    async function fetchData() {
      const { results } = await fetch(url).then((response) => response.json());
      // console.log(results);
      setPlanets(results);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filterPlanets = planets;
    filterPlanets = planets.filter((planet) => planet.name.includes((searchName)));
    setFilterPlanet(filterPlanets);
  }, [planets, searchName]);

  const filterName = (e) => {
    setSearchName(e.target.value);
  };

  const filterPreferences = (e) => {
    const attribute = e.target.getAttribute('data-testid');
    if (attribute === 'column-filter') {
      setPreference({ ...preference, column: e.target.value });
    } else if (attribute === 'comparison-filter') {
      setPreference({ ...preference, comparison: e.target.value });
    } else {
      setPreference({ ...preference, value: e.target.value });
    }
  };

  const filteredValue = ({ column, comparison, value }) => {
    const newFiltered = planets.filter((planet) => {
      const targetInfo = Number(planet[column]);
      const valueToCompare = Number(value);
      if (comparison === 'menor que') {
        return targetInfo < valueToCompare;
      }
      if (comparison === 'maior que') {
        return targetInfo > valueToCompare;
      }
      return targetInfo === valueToCompare;
    });
    setFilterPlanet(newFiltered);
  };

  const handleClick = () => {
    let copyColumn = columnOptions;
    copyColumn = columnOptions.filter((column) => column !== preference.column);
    setColumnOptions(copyColumn);
    filteredValue(preference);
  };

  const data = {
    planets,
    searchName,
    columnOptions,
    size,
    filterPlanet,
    setSize,
    setColumnOptions,
    setPlanets,
    filterName,
    filterPreferences,
    handleClick,
  };

  return (
    <FilterContext.Provider value={ data }>
      { children }
    </FilterContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
