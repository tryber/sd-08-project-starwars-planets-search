import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './context/StarWarsContext';
import fetchStarWars from './services';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [inputName, setInputName] = useState('');
  const [filter, setFilter] = useState({
    filterByName: { name: '' },
  });
  const [filterOptions, setFilterOptions] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });
  const comparisons = ['maior que', 'menor que', 'igual a'];
  const [columnSelect, setColumnSelect] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  useEffect(() => {
    fetchStarWars().then((response) => {
      setPlanets(response.results);
      setFilteredPlanets(response.results);
    });
  }, []);

  useEffect(() => {
    const fillAll = planets.filter(({ name }) => name.toLowerCase().includes(inputName));
    setFilteredPlanets(fillAll);
  }, [planets, inputName]);

  const handleChange = ({ target }) => {
    setInputName(target.value);
  };

  const handleSelect = ({ target: { name, value } }) => {
    setFilterOptions({
      ...filterOptions,
      [name]: value,
    });
  };

  const handleFilter = ({ column, comparison, value }) => {
    const filterEnd = planets.filter((element) => {
      const columnValue = Number(element[column]);
      const filterValue = Number(value);
      if (comparison === 'menor que') {
        return columnValue < filterValue;
      }
      if (comparison === 'maior que') {
        return columnValue > filterValue;
      }
      return columnValue === filterValue;
    });
    setFilteredPlanets(filterEnd);
  };

  const handleClick = () => {
    const columnFilter = columnSelect.filter((el) => el !== filterOptions.column);
    setColumnSelect(columnFilter);
    handleFilter(filterOptions);
  };

  const context = {
    planets,
    filteredPlanets,
    setFilteredPlanets,
    filter,
    setFilter,
    handleChange,
    inputName,
    columnSelect,
    handleSelect,
    comparisons,
    handleClick,
    filterOptions,
    setFilterOptions,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      { children }
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
