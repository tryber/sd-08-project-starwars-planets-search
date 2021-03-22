import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import PlanetsContext from './PlanetsContext';
import getPlanets from '../services/api';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [namePlanets, setNamePlanets] = useState('');
  const [filterPlanets, setFilterPlanets] = useState('');
  const columnsOptions = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const comparisonOptions = ['maior que', 'menor que', 'igual a'];
  const [preferenceFilter, setPreferenceFilter] = useState(
    {
      columnFilter: 'population',
      comparisonFilter: 'maior que',
      numberFilter: '100000',
    },
  );

  useEffect(() => {
    getPlanets().then(({ results }) => {
      results.forEach((result) => delete result.residents);
      setPlanets(results);
    });
  }, []);

  const handleNamePlanets = ({ target: { value } }) => {
    setNamePlanets(value);
  };

  useEffect(() => {
    const planetsForFilters = [...planets];
    const planetsFilters = planetsForFilters
      .filter((planet) => planet.name.includes((namePlanets)));
    setFilterPlanets(planetsFilters);
  }, [planets, namePlanets]);

  const handlePreferenceFilter = ({ target: { name, value } }) => {
    setPreferenceFilter({ ...preferenceFilter, [name]: value });
  };

  const filterByNumericValues = ({ columnFilter, comparisonFilter, valueFilter }) => {
    const filter = planets.filter((planet) => {
      const columnCompare = Number(planet[columnFilter]);
      const valueCompare = Number(valueFilter);
      if (comparisonFilter.includes('maior que')) return columnCompare > valueCompare;
      return (comparisonFilter.includes('menor que')) ? columnCompare < valueCompare
        : columnCompare === valueCompare;
    });
    setFilterPlanets(filter);
  };

  const handleClickFilter = () => {
    filterByNumericValues(preferenceFilter);
  };

  const contextValue = {
    planets,
    namePlanets,
    handleNamePlanets,
    filterPlanets,
    columnsOptions,
    comparisonOptions,
    preferenceFilter,
    handlePreferenceFilter,
    handleClickFilter,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
