import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [dataApi, setDataApi] = useState([]);

  const [filterHandler, setFilterHandler] = useState({
    column: 'population', comparison: 'maior que', value: '',
  });

  // Filtros Salvos
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: {
      column: 'Name',
      sort: 'ASC',
    }
  });

  const ORDER_POSITIVE = 1;
  const ORDER_NEGATIVE = -1;

  const sortArray = (array, order) => [
    ...array.sort((planetA, planetB) => {
      let columnA = parseInt(planetA[order.column], 10)
        ? parseInt(planetA[order.column], 10)
        : planetA[order.column];
      let columnB = parseInt(planetB[order.column], 10)
        ? parseInt(planetB[order.column], 10)
        : planetB[order.column];
      if (columnA === 'unknown') columnA = Infinity;
      if (columnB === 'unknown') columnB = Infinity;
      if (columnA > columnB && order.sort === 'ASC') return ORDER_POSITIVE;
      if (columnA < columnB && order.sort === 'ASC') return ORDER_NEGATIVE;
      if (columnA > columnB && order.sort === 'DESC') return ORDER_NEGATIVE;
      if (columnA < columnB && order.sort === 'DESC') return ORDER_POSITIVE;
      return 0;
    }),
  ];

  // Filtrando por valor populacional a partir do reultado da optionBox
  function filterNumericValues(results) {
    const numericValues = filters.filterByNumericValues;
    if (!numericValues.length) {
      return setData(results);
    }
    const value = results.filter((result) => (
      numericValues.every((numericFilter) => {
        switch (numericFilter.comparison) {
        case 'maior que':
          if (
            Number(result[numericFilter.column])
            > parseInt(numericFilter.value, 10)
            && parseInt(numericFilter.value, 10) !== 'unknown'
          ) {
            return true;
          }
          return false;
        case 'menor que':
          if (
            Number(result[numericFilter.column])
            < parseInt(numericFilter.value, 10)
            && parseInt(numericFilter.value, 10) !== 'unknown'
          ) {
            return true;
          }
          return false;
        case 'igual a':
          if (
            parseInt(result[numericFilter.column], 10)
            === parseInt(numericFilter.value, 10)
            && parseInt(numericFilter.value, 10) !== 'unknown'
          ) {
            return true;
          }
          return false;
        default:
          return false;
        }
      })
    ));
    setData(value);
  }
  // Filtro direto a partir do nome (colocando em caixa baixa para comparação)
  function filterName(results) {
    const { name } = filters.filterByName;
    return results.filter(
      (result) => result.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
      || name === '',
    );
  }
  // Chama da API
  useEffect(() => {
    async function fetchData() {
      const { results } = await fetch(
        'https://swapi.dev/api/planets/',
      ).then((response) => response.json());
      results.map((planet) => delete planet.residents);
      setDataApi(results);
      setData(results);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const results = dataApi;
    const filteredName = filterName(results);
    filterNumericValues(filteredName);
  }, [filters]);

  const context = {
    data,
    setData,
    filters,
    setFilters,
    filterHandler,
    setFilterHandler,
  };
  // Relação indireta
  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
