import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

import requestApi from '../services/requestAPI';
import { initialStateContext } from '../helpers/functionsHelpers';

const RETURN_TRUE = 1;
const RETURN_FALSE = -1;

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [userFilters, setUserFilters] = useState(initialStateContext);
  const [newListPlanetsFilter, setnewListPlanetsFilter] = useState([]);

  useEffect(() => {
    requestApi().then((resp) => setData(resp));
  }, []);

  useEffect(() => {
    const { order: { column, sort } } = userFilters;
    if (sort === 'ASC') {
      const result = data.sort((a, b) => {
        if (a.name < b.name) return RETURN_FALSE;
        if (a.name > b.name) return RETURN_TRUE;
        return 0;
      });
      setnewListPlanetsFilter(result);
    }
    if (sort === 'DESC') {
      const filterResponse = data.sort((a, b) => {
        if (Number(a[column]) > Number(b[column])) return RETURN_FALSE;
        if (Number(a[column]) < Number(b[column])) return RETURN_TRUE;
        return 0;
      });
      setnewListPlanetsFilter(filterResponse);
    }

    const { filterByName: { name } } = userFilters;
    const filterByListName = data
      .filter((planetsName) => planetsName.name.toLowerCase()
        .includes(name.toLowerCase()));
    setnewListPlanetsFilter(filterByListName);
  }, [userFilters, data]);

  useEffect(() => {
    const { filterByNumericValues } = userFilters;
    filterByNumericValues.forEach(({ column, comparison, value }) => {
      if (comparison === 'maior que') {
        const filterResponse = data.filter((planets) => Number(planets[column]) > value);
        return setnewListPlanetsFilter(filterResponse);
      }
      if (comparison === 'menor que') {
        const filterResponse = data.filter((planets) => Number(planets[column]) < value);
        return setnewListPlanetsFilter(filterResponse);
      }
      if (comparison === 'igual a') {
        const filterResponse = data
          .filter((planets) => Number(planets[column]) === Number(value));
        return setnewListPlanetsFilter(filterResponse);
      }
    });
  }, [data, userFilters]);

  const contextValue = {
    data,
    newListPlanetsFilter,
    setnewListPlanetsFilter,
    userFilters,
    setUserFilters,
  };

  return (
    <PlanetContext.Provider value={ contextValue }>
      {children}
    </PlanetContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
