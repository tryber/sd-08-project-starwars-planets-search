import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import { asyncSetter, fetchPlanets } from '../services/asyncFunctions';
import { INITIAL_COLUMN, INITIAL_HEADER_FORM, INITIAL_FILTERS,
} from '../services/INITIAL';

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState();
  const [loadingPlanets, setloadingPlanets] = useState(true);
  const [columnFilter, setColumnFilter] = useState(INITIAL_COLUMN);
  const [filtersApplied, setFiltersApplied] = useState({});
  const [headerForm, setHeaderForm] = useState(INITIAL_HEADER_FORM);
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  useEffect(() => {
    asyncSetter(fetchPlanets, setPlanets, setloadingPlanets);
  }, []);

  const ProviderObject = {
    planets,
    loadingPlanets,
    columnFilter,
    setColumnFilter,
    filtersApplied,
    setFiltersApplied,
    headerForm,
    setHeaderForm,
    filters,
    setFilters,
  };
  return (
    <PlanetsContext.Provider value={ ProviderObject }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
