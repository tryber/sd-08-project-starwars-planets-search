import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import starwarsContext from './StarwarsContext';
import getStarwarsPlanet from '../service/Api';

function StarwarsProvider({ children }) {
  // const { columnSelected, setColumnSelected } = useContext(StarwarsContext);

  const [starwarsData, setStarwarsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterByName, setFilterByName] = useState('');
  const [filters, setFilters] = useState(
    {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
    },
  );
  const [deleteFilter, setDeleteFilter] = useState([]);

  // const [column, setColumn] = useState('');
  // const [comparison, setComparison] = useState('');
  // const [value, setValue] = useState('');

  const fetchStarwarsPlanets = async () => {
    setIsLoading(true);
    const getDataPlanets = await getStarwarsPlanet();
    // console.log(getDataPlanets);
    setStarwarsData(getDataPlanets.results);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStarwarsPlanets();
  }, []);

  useEffect(() => {
    filters.filterByNumericValues
      .filter((item) => console.log(item) || item !== deleteFilter);
    console.log(deleteFilter);
    // setColumnSelected([...columnSelected, deleteFilter.column]);
    setFilters({
      ...filters,
      filterByNumericValues: [
        // deleteFilterChoice,
      ],
    });
  }, [deleteFilter]);

  const filterName = ({ target }) => {
    setFilterByName(target.value);
  };

  const filterColumn = (column, comparison, value) => {
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

  const filterComparison = (column, comparison, value) => {
    const planetsFilterByNumerics = starwarsData.filter((data) => {
      console.log(data[column]);
      const reference = Number(data[column]);
      const valueComparison = Number(value);
      if (comparison === 'menor que') {
        return reference < valueComparison;
      }
      if (comparison === 'maior que') {
        return reference > valueComparison;
      }
      return reference === valueComparison;
    });
    setStarwarsData(planetsFilterByNumerics);
  };

  const state = {
    filters,
    starwarsData,
    isLoading,
    filterName,
    filterByName,
    filterColumn,
    setDeleteFilter,
    filterComparison,
    // column,
    // comparison,
    // value,
    // filterColumn,
  };

  return (
    <starwarsContext.Provider value={ state }>
      { children }
    </starwarsContext.Provider>
  );
}

StarwarsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default StarwarsProvider;
