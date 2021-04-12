import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DataContext from './DataContext';

function DataProvider({ children }) {
  const dropDownList = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const [data, setData] = useState([]);
  const [isLoading, setLoad] = useState(false);
  const [filters, setFilter] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });
  const [parameterList, setParameterList] = useState(dropDownList);
  const [order, setOrder] = useState({
    column: 'name',
    sort: 'ASC',
  });

  const contextValue = {
    data,
    setData,
    isLoading,
    setLoad,
    filters,
    setFilter,
    parameterList,
    setParameterList,
    order,
    setOrder,
  };

  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

  // Realizado com a ajuda de https://stackoverflow.com/questions/63570597/typeerror-func-apply-is-not-a-function
  useEffect(() => {
    (async () => {
      setLoad(true);
      const { results } = await fetch(url)
        .then((response) => response.json());
      // console.log(results);
      setData(results);
      setLoad(false);
    })();
  }, []);

  return (
    <DataContext.Provider
      value={ { ...contextValue } }
    >
      {children}
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
