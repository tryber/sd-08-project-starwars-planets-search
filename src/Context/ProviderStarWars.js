import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextStarWars from './ContextStarWars';

function ProviderStarWars({ children }) {
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
  const [columnSelect, setColumnSelect] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const comparisons = ['maior que', 'menor que', 'igual a'];

  useEffect(() => {
    const fetchStarWarsAPI = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const dataInfo = await fetch(endpoint);
      const dataJson = await dataInfo.json();
      const { results } = dataJson;
      const dataPlanet = results;
      // console.log(dataJson);
      // console.log(dataPlanet);
      setPlanets(dataPlanet);
      setFilteredPlanets(dataPlanet);
    };
    fetchStarWarsAPI();
  }, []);

  useEffect(() => {
    const FilterEf = planets.filter(({ name }) => name.toLowerCase().includes(inputName));
    // console.log(filter);
    // if (!filter) setFilteredPlanets(planets);
    setFilteredPlanets(FilterEf);
  }, [planets, inputName]);

  const handleInputName = (e) => {
    setInputName(e.target.value);
    // filterPlanets(inputName);
    // console.log('!');
  };

  const handleSelect = ({ target: { name, value } }) => {
    setFilterOptions({
      ...filterOptions,
      [name]: value,
    });
  };

  const handleClickFilter = ({ column, comparison, value }) => {
    const newFilter = planets.filter((el) => {
      // console.log(el);
      // console.log(el[column]);
      const valueColumn = Number(el[column]);
      // console.log(valueColumn);
      const valueTest = Number(value);
      // console.log(valueTest);
      if (comparison === 'menor que') {
        return valueColumn < valueTest;
      }
      if (comparison === 'maior que') {
        return valueColumn > valueTest;
      }
      return valueColumn === valueTest;
    });
    // console.log(newFilter);
    setFilteredPlanets(newFilter);
  };

  const handleClick = () => {
    // console.log(columnSelect);
    const columnFilter = columnSelect.filter((el) => el !== filterOptions.column);
    // console.log(columnFilter);
    setColumnSelect(columnFilter);
    // console.log(filterOptions);
    handleClickFilter(filterOptions);
  };

  const allContext = {
    planets,
    filteredPlanets,
    setFilteredPlanets,
    filter,
    setFilter,
    handleInputName,
    inputName,
    columnSelect,
    handleSelect,
    comparisons,
    handleClick,
    filterOptions,
    setFilterOptions,
  };

  return (
    <ContextStarWars.Provider value={ allContext }>
      { children }
    </ContextStarWars.Provider>
  );
}

ProviderStarWars.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderStarWars;
