import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import getPlanets from '../service/FecthApi';

import testData from '../testData';

function PlanetsProvider({ children }) {
  const [initialData, setInitialData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
    order: { column: 'name', sort: 'ASC' } });
  const [dataFiltered, setDataFiltered] = useState([]);
  const [numberFilter, setNumberFilter] = useState(
    { column: '', comparison: '', value: '' },
  );
  const [ordered, setOrdered] = useState(
    { column: '', sort: 'ASC' },
  );

  const conversion = (item) => {
    const UNICODE_DEC_ZERO = 48;
    const UNICODE_DEC_NOVE = 57;
    if (item[filters.order.column].charCodeAt(0) >= UNICODE_DEC_ZERO
        && item[filters.order.column].charCodeAt(0) <= UNICODE_DEC_NOVE) {
      return parseInt(item[filters.order.column], 10);
    }
    return item[filters.order.column].toUpperCase();
  };

  const ascendente = (list) => (
    list.sort((a, b) => {
      const A_MENOR_QUE_B = -1;
      const A_MAIOR_QUE_A = 1;
      const columnA = conversion(a);
      const columnB = conversion(b);
      if (columnA < columnB) return A_MENOR_QUE_B;
      if (columnA > columnB) return A_MAIOR_QUE_A;
      return 0;
    })
  );

  const descendente = (list) => (
    list.sort((a, b) => {
      const A_MENOR_QUE_B = -1;
      const A_MAIOR_QUE_A = 1;
      const columnA = conversion(a);
      const columnB = conversion(b);
      if (columnA > columnB) return A_MENOR_QUE_B;
      if (columnA < columnB) return A_MAIOR_QUE_A;
      return 0;
    })
  );

  const sorting = (listToOrder) => {
    if (filters.order.sort === 'ASC') {
      return ascendente(listToOrder);
    }
    if (filters.order.sort === 'DESC') {
      return descendente(listToOrder);
    }
  };

  useEffect(() => {
    getPlanets().then(({ results }) => {
      results.forEach((result) => delete result.residents === 'ressidentes');
      setInitialData(results);
      setDataFiltered(sorting(testData.results));
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const VALUE_TO_ERASE = -1;
    const { filterByName, filterByNumericValues } = filters;
    let filterList = initialData.filter(({ name }) => (
      name.toLowerCase().indexOf(filterByName.name.toLowerCase()) !== VALUE_TO_ERASE
    ));
    setDataFiltered(filterList);

    filterByNumericValues.forEach(({ column, comparison, value }) => {
      filterList = filterList.filter((info) => {
        const infoColumn = parseInt(info[column], 10);
        const valueInt = parseInt(value, 10);
        if (comparison === 'maior que') return (infoColumn > valueInt);
        if (comparison === 'menor que') return (infoColumn < valueInt);
        if (comparison === 'igual a') return (infoColumn === valueInt);
        return true;
      });
      setDataFiltered(filterList);
    });
    setDataFiltered(sorting(filterList));
  }, [filters]);

  const handleChange = ({ target }) => {
    switch (target.name) {
    case 'name':
      setFilters({ ...filters, filterByName: { name: target.value } });
      break;
    case 'data':
      setNumberFilter({ ...numberFilter, column: target.value });
      break;
    case 'range':
      setNumberFilter({ ...numberFilter, comparison: target.value });
      break;
    case 'number':
      setNumberFilter({ ...numberFilter, value: target.value });
      break;
    case 'sort-column':
      setOrdered({ ...ordered, column: target.value });
      break;
    case 'sort':
      setOrdered({ ...ordered, sort: target.value });
      break;
    default: break;
    }
  };

  const handleClick = ({ target }) => {
    const { column, sort } = ordered;
    switch (target.name) {
    case 'filter':
      setFilters({ ...filters,
        filterByNumericValues: [...filters.filterByNumericValues, numberFilter] });
      break;
    case 'ordination':
      setFilters({ ...filters,
        order: { column, sort } });
      break;
    default: break;
    }
  };

  const handleClearFilter = (chip) => {
    const listClear = filters.filterByNumericValues.filter((num) => (num !== chip));
    setFilters({ ...filters,
      filterByNumericValues: listClear });
  };

  const contextValues = {
    dataFiltered,
    isLoading,
    filters,
    handleChange,
    numberFilter,
    handleClick,
    handleClearFilter,
    ordered,
  };

  return (
    <PlanetsContext.Provider value={ contextValues }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
