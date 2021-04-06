import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import getPlanets from '../services/planetsApi';

const standardFilter = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
  order: {
    column: 'Name',
    sort: 'ASC',
  },
};

function StarWarsProvider({ children }) {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);
  const [dataForRendering, setDataForRendering] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filters, setFilteredData] = useState(standardFilter);
  const [allFilteredNumbers, setAllFilteredNumbers] = useState('');
  
  // const removeFilter = (index) => {
  //   const filtersCopy = {...filters};
  //   filtersCopy.filterByNumericValues.splice(index, 1);
  //   setFilteredData(filtersCopy);
  // }

  const setName = (name) => {
    setFilteredData((previousState) => ({
      ...previousState,
      filterByName: {
        name,
      },
    }));
  };

  const addFilterNumericValue = (column, comparison, value) => {
    setFilteredData((previousState) => ({
      ...previousState,
      filterByNumericValues: [
        ...previousState.filterByNumericValues,
        {
          column,
          comparison,
          value,
        },
      ],
    }));
  };

  useEffect(() => {
    async function returnedAPI() {
      setIsFetching(true);
      const planetResponseJson = await getPlanets();
      planetResponseJson.forEach((planet) => delete planet.residents);
      setData(planetResponseJson);
      setDataForRendering(planetResponseJson);
    }
    returnedAPI();
    setIsFetching(false);
  }, []);

  useEffect(() => {
    const {
      filterByName: { name },
      filterByNumericValues,
    } = filters;
    let filteredName = data.filter((planetName) =>
      planetName.name.toLowerCase().includes(name.toLocaleLowerCase())
    );

    filterByNumericValues.forEach((element) => {
      const { column, comparison, value } = element;
      switch (comparison) {
        case 'maior que':
          filteredName = filteredName.filter(
            (element) => parseFloat(element[column]) > parseFloat(value)
          );
          break; 
        case 'menor que':
          filteredName = filteredName.filter(
            (element) => parseFloat(element[column]) < parseFloat(value)
          );
          break;
        case 'igual a':
          filteredName = filteredName.filter(
            (element) => parseFloat(element[column]) === parseFloat(value)
          );
          break;
        default:
          filteredName = filteredName;
      }
    });
    setDataForRendering(filteredName);
  }, [filters]);

  const contextValue = {
    isFetching,
    data,
    searchName,
    setSearchName,
    filters,
    setFilteredData,
    setName,
    addFilterNumericValue,
    allFilteredNumbers,
    setAllFilteredNumbers,
    dataForRendering,
    setDataForRendering,
    setFilteredData,
    // removeFilter
  };

  return (
    <StarWarsContext.Provider value={contextValue}>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default StarWarsProvider;
