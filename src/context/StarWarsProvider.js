import React, { useState } from 'react';
import PropTypes from 'prop-types';

import starWarsContext from './StarWarsContext';
import useFetchPlanets from '../hooks/useFetchPlanets';
import useFilterPlanets from '../hooks/useFilterPlanets';

const StarWarsProvider = ({ children }) => {
  // useReducer talvez seria melhor pra essa aplicacao!
  const { planets, isFetching } = useFetchPlanets();

  // se tiver algum filtro planets vai pro context com filtro, se nao tiver filtros, ele vai pro context sem filto!
  // context vai receber outra variavel da funcao de filtrar.

  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: {
      status: false, filtersArray: [],
    },
    order: {
      column: 'name',
      sort: 'ASC',
    },
  });

  const filteredPlanets = useFilterPlanets(planets, filters);

  const context = { filteredPlanets, isFetching, filters, setFilters };

  return (
    <starWarsContext.Provider value={ context }>
      { children }
    </starWarsContext.Provider>
  );
};

StarWarsProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default StarWarsProvider;
