import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './planetsContext';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([
    { films: [],
      diameter: 0,
      orbital_period: 0,
      population: 0,
      residents: [],
      rotation_period: 0,
      surface_water: 0,
    }]);
  const [name, setName] = useState('');
  const [filters, setFilters] = useState([]);
  const [columnOptions, setColumnOptions] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  useEffect(() => {
    const getData = async () => {
      const result = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const resultJson = await result.json();
      setPlanets(resultJson.results);
    };
    getData();
  }, []);

  const handleChangeName = ({ target }) => {
    setName(target.value);
  };

  const allFilters = {
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues: filters,
    },
  };

  const filteringValue = (filter) => {
    const newFiltered = planets.filter((planet) => {
      const targetInfo = Number(planet[filter.column]);
      const valueToCompare = Number(filter.value);
      if (filter.comparison === 'menor que') {
        return targetInfo < valueToCompare;
      }
      if (filter.comparison === 'maior que') {
        return targetInfo > valueToCompare;
      }
      return targetInfo === valueToCompare;
    });
    return setPlanets(newFiltered);
  };

  const newFilter = (filter) => {
    setFilters([...filters, filter]);
    filteringValue(filter);
    const newOptions = [...columnOptions];
    const optionToBeRemoved = filter.column;
    const indexOfOption = newOptions.indexOf(optionToBeRemoved);
    newOptions.splice(indexOfOption, 1);
    setColumnOptions(newOptions);
  };

  const data = {
    ...allFilters,
    planets,
    handleChangeName,
    newFilter,
    columnOptions,
  };

  console.log(allFilters.filters.filterByNumericValues);

  return (
    <planetsContext.Provider value={ data }>
      {children}
    </planetsContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
