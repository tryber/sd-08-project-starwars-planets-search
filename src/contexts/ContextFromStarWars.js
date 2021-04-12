import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSwapiPlanets } from '../services/swapi';
import { createSortPlanets } from '../utils/orderColumn';
import { createCondition } from '../utils/conditionFilter';

const ContextFromStarWars = createContext();
const { Provider, Consumer } = ContextFromStarWars;

function ContextFromStarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [inputName, setInputName] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [instructionToFilter,
    setInstructionToFilter] = useState([]);
  const [sort, setSort] = useState({
    sorted: 'ASC',
    column: 'name',
  });

  useEffect(() => {
    const fetchPlanets = async () => {
      const { results } = await getSwapiPlanets();
      setPlanets(results);
      setFilteredPlanets(results);
    };

    fetchPlanets();
  }, []);

  useEffect(() => {
    const filter = planets
      .filter(({ name }) => name
        .toLowerCase()
        .includes(inputName.toLowerCase()));
    setFilteredPlanets(filter);
  }, [planets, inputName]);

  useEffect(() => {
    function conditionFromFilter() {
      if (instructionToFilter) {
        instructionToFilter.forEach((currentValue) => {
          const condition = createCondition(planets);
          const key = Object.values(currentValue)[0];
          const method = Object.values(currentValue)[1]
            .replace(' ', '_');
          const amount = Object.values(currentValue)[2];
          const results = condition[method](key, amount);
          setFilteredPlanets(() => results);
        });
      }
    }
    conditionFromFilter();
  }, [instructionToFilter, planets]);

  const sortPlanets = createSortPlanets(sort.column);

  const contextValue = {
    planets,
    inputName,
    setInputName,
    filteredPlanets,
    instructionToFilter,
    setFilteredPlanets,
    setInstructionToFilter,
    sortPlanets: sortPlanets[sort.sorted],
    setSort,
  };

  return (
    <Provider value={ contextValue }>{children}</Provider>
  );
}

ContextFromStarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ContextFromStarWars, Consumer, ContextFromStarWarsProvider };
