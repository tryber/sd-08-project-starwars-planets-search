import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './MyContext';

const PlanetsProvider = ({ children }) => {
  const [fixPlanets, setFixPlanets] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [newColumn, setNewColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
  });

  useEffect(() => {
    const fetchPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets';
      const { results } = await fetch(endpoint).then((response) => response.json());
      setFixPlanets(results);
      setPlanets(results);
    };
    fetchPlanets();
  }, []);

  // Com ajuda do colega de turma Jean P. Franco - Trybe Turma 08
  useEffect(() => {
    let filterPlanets = '';
    filterPlanets = fixPlanets.filter((planet) => planet.name.includes((searchName)));
    setPlanets(filterPlanets);
  }, [fixPlanets, searchName]);

  const columnFiltered = (value) => {
    setFilters({
      ...filters,
      filterByNumericValues: {
        ...filters.filterByNumericValues,
        column: value,
      },
    });
  };

  const comparisonFiltered = (value) => {
    setFilters({
      ...filters,
      filterByNumericValues: {
        ...filters.filterByNumericValues,
        comparison: value,
      },
    });
  };

  const numberFiltered = (value) => {
    setFilters({
      ...filters,
      filterByNumericValues: {
        ...filters.filterByNumericValues,
        value,
      },
    });
  };

  const filterByNumber = () => {
    const { column, comparison, value } = filters.filterByNumericValues;
    const numFiltered = planets.filter((element) => {
      switch (comparison) {
      case 'maior que': return element[column] * 1 > value;
      case 'menor que': return element[column] * 1 < value;
      case 'igual a': return element[column] === value;
      default: return false;
      }
    });
    setPlanets(numFiltered);
    const filterNewColumn = newColumn.filter((select) => select !== column);
    setNewColumn(filterNewColumn);
  };

  const context = {
    planets,
    searchName,
    setSearchName,
    filterByNumber,
    numberFiltered,
    columnFiltered,
    comparisonFiltered,
    newColumn,
    // filterList,
  };

  return (
    <PlanetsContext.Provider value={ context }>
      {
        children
      }
    </PlanetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
