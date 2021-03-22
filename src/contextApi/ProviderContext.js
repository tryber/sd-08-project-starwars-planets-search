import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import createContext from './createContext';
import { keys, url } from '../constantes/constanteApi';

function ProviderContext({ children }) {
  const [data, fixData] = useState([]);
  const [copyKeys, fixCopyKeys] = useState(keys);
  const [filters, fixFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  const [filterData, fixFilterData] = useState([]);

  const [filterBy, fixFilterBy] = useState({
    column: copyKeys[0],
    comparison: 'maior que',
    value: 0,
  });

  useEffect(() => {
    async function waitApi() {
      await fetch(url)
        .then((response) => response.json())
        .then((planetsInfo) => {
          fixData(planetsInfo.results);
          fixFilterData(planetsInfo.results);
        });
    }
    waitApi();
  }, []);

  const { filterByName: { name } } = filters;

  useEffect(() => {
    const filterByName = data.filter((element) => element.name.includes(name));

    fixFilterData(filterByName);
  }, [name, data]);

  const { filterByNumericValues } = filters;
  useEffect(() => {
    let filtrar = [];
    if (filterByNumericValues.length !== 0) {
      fixFilterData((dFilter) => {
        filterByNumericValues
          .map((arr) => {
            return filtrar = dFilter.filter((element) => {
              if (arr.comparison === 'maior que') {
                return Number(element[arr.column]) > arr.value;
              }
              if (arr.comparison === 'menor que') {
                return Number(element[arr.column]) < arr.value;
              }
              return Number(element[arr.column]) === Number(arr.value);
            })
          });
          return [ ...filtrar ];
      });
    }
  }, [filterByNumericValues]);

  useEffect(() => {
    if (filterByNumericValues.length !== 0) {
      let newKeys = [];
      filterByNumericValues.map((filtro) => {
        newKeys = copyKeys
          .filter(element => element !== filtro.column);
      }); 
      fixCopyKeys(newKeys);
      fixFilterBy({...filterBy, column: copyKeys[0]});
    }
  }, [filterByNumericValues]);

  const values = {
    data,
    filters,
    fixFilters,
    filterData,
    fixFilterBy,
    filterBy,
    fixCopyKeys,
    copyKeys
  };

  return (
    <createContext.Provider value={ values }>
      { children }
    </createContext.Provider>
  );
}

ProviderContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderContext;
