import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import fetchData from '../services/API';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [requesting, setRequesting] = useState(false);
  const [planets, setPlanets] = useState([]);
  const [planetsFiltered, setPlanetsFiltered] = useState([]);
  const [numericFilteredPlanets, setNumericFilteredPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);
  const [filterByNumericValues, setFilterByNumericValues] = useState(
    {
      column: '',
      comparison: '',
      value: 0,
    },
  );

  const fetchPlanets = async () => {
    setRequesting(true);
    const data = await fetchData();
    setPlanets(data);
    setRequesting(false);
  };

  const setFilters = (name, col, parameter, num) => {
    if (typeof (name) !== 'undefined') {
      setFilterByName(name);
    }
    if (typeof (col) !== 'undefined') {
      setFilterByNumericValues({ column: col, comparison: parameter, value: num });
    }
    setIsFiltered(false);
  };

  function applyFilter() {
    setRequesting(true);
    if (filterByName && !isFiltered) {
      const planetsForFilter = planets.slice();
      const namePlanetsFiltered = planetsForFilter.filter(
        (planet) => planet.name.includes(filterByName),
      );
      setPlanetsFiltered(namePlanetsFiltered);
    }

    if (filterByNumericValues.column.length && !isFiltered) {
      let planetsForNumericFilter = [];
      let newNumericFilteredPlanets = [];

      if (planetsFiltered.length) {
        planetsForNumericFilter = planetsFiltered.slice();
      } else {
        planetsForNumericFilter = planets.slice();
      }

      if (filterByNumericValues.comparison === 'maior que') {
        newNumericFilteredPlanets = planetsForNumericFilter.filter((planet) => (
          parseInt(planet[filterByNumericValues.column], 10)
          > parseInt(filterByNumericValues.value, 10)));
      } else if (filterByNumericValues.comparison === 'menor que') {
        newNumericFilteredPlanets = planetsForNumericFilter.filter((planet) => (
          parseInt(planet[filterByNumericValues.column], 10)
          < parseInt(filterByNumericValues.value, 10)));
      } else {
        newNumericFilteredPlanets = planetsForNumericFilter.filter((planet) => (
          parseInt(planet[filterByNumericValues.column], 10)
          === parseInt(filterByNumericValues.value, 10)));
      }
      setNumericFilteredPlanets(newNumericFilteredPlanets);
    }
    if (!filterByName && isFiltered) {
      setPlanetsFiltered('');
      setIsFiltered(false);
    }
    setIsFiltered(true);
    setRequesting(false);
  }

  useEffect(() => { fetchPlanets(); }, []);
  useEffect(() => applyFilter());

  return (
    <PlanetsContext.Provider
      value={ {
        requesting,
        planets,
        setFilters,
        setFilterByName,
        filterByName,
        setPlanetsFiltered,
        planetsFiltered,
        applyFilter,
        numericFilteredPlanets,
      } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;

PlanetsProvider.propTypes = { children: PropTypes.node.isRequired };
