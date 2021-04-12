import React, { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
    order: {
      column: 'name',
      sort: 'ASC',
    },
  });
  const [planets, setPlanets] = useState([]);

  const handleData = async () => {
    const result = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((res) => res.json())
      .then((apiData) => apiData.results)
      .catch((err) => console.log(err));
    setData(result);
    setPlanets(result);
  };

  // const applyOrder = useCallback((planetsArray) => {
  //   console.log('chamou applyOrder');
  //   const { column, sort } = filters.order;
  //   let orderedPlanets = planetsArray;
  //   if (sort === 'ASC') {
  //     orderedPlanets = planetsArray.sort((planetA, planetB) => {
  //       const A_BEFORE_B = -1;
  //       const B_BEFORE_A = 1;
  //       const A_EQUAL_B = 0;
  //       if (planetA[column] < planetB[column]) return A_BEFORE_B;
  //       if (planetA[column] > planetB[column]) return B_BEFORE_A;
  //       return A_EQUAL_B;
  //     });
  //   } else if (sort === 'DESC') {
  //     orderedPlanets = planetsArray.sort((planetA, planetB) => {
  //       const A_BEFORE_B = -1;
  //       const B_BEFORE_A = 1;
  //       const A_EQUAL_B = 0;
  //       if (planetA[column] < planetB[column]) return B_BEFORE_A;
  //       if (planetA[column] > planetB[column]) return A_BEFORE_B;
  //       return A_EQUAL_B;
  //     });
  //   }
  //   return orderedPlanets;
  // }, [filters]);

  const applyNumericFilter = (filtered, { column, comparison, value }) => {
    switch (comparison) {
    case 'maior que':
      return filtered.filter((planet) => Number(planet[column]) > Number(value));
    case 'menor que':
      return filtered.filter((planet) => Number(planet[column]) < Number(value));
    case 'igual a':
      return filtered.filter((planet) => planet[column] === value);
    default:
      return filtered;
    }
  };
  const applyAllNumericFilters = useCallback((
    filtered = data,
    numericFilters = filters.filterByNumericValues,
  ) => {
    console.log('chamou applyNumerics');
    if (!numericFilters.length) setPlanets(filtered);
    if (numericFilters.length === 1 && filtered) {
      setPlanets(applyNumericFilter(filtered, numericFilters[0]));
    }
    if (numericFilters.length > 1) {
      const currentFilter = numericFilters[0];
      const nextFilters = numericFilters.slice(1);
      const currentFiltered = applyNumericFilter(filtered, currentFilter);
      applyAllNumericFilters(currentFiltered, [...nextFilters]);
    }
  }, [data, filters.filterByNumericValues]);

  const handleFilterByName = (name) => {
    setFilters({
      ...filters,
      filterByName: {
        name,
      },
    });
  };
  const handleFilterByNumericValues = ({ column, comparison, value }) => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        {
          column,
          comparison,
          value,
        },
      ],
    });
  };
  const removeNumericFilter = (filterColumn) => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...(filters.filterByNumericValues
          .filter(({ column }) => column !== filterColumn)),
      ],
    });
  };
  const handleSort = ({ column, sort }) => {
    console.log('chamou handle');
    setFilters({
      ...filters,
      order: {
        column,
        sort,
      },
    });
  };

  useEffect(() => {
    applyAllNumericFilters();
  }, [applyAllNumericFilters, filters]);

  const obj = {
    dataObject: {
      data,
      handleData,
      planets,
    },
    filterObject: {
      filters,
      handleFilterByName,
      handleFilterByNumericValues,
      handleSort,
      removeNumericFilter,
    },
  };

  return (
    <Context.Provider value={ obj }>
      { children }
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ContextProvider;
