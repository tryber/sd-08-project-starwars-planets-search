import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterPlanets, setFilterPlanets] = useState([]);
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
    const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPlanets(data.results);
      });
  }, []);

  useEffect(() => {
    const filterNamePlanets = planets
      .filter(({ name }) => name.toLowerCase().includes(inputName));
    setFilterPlanets(filterNamePlanets);
  }, [planets, inputName]);

  const handleInputName = (e) => {
    setInputName(e.target.value);
  };

  const handleSelect = ({ target: { name, value } }) => {
    setFilterOptions({
      ...filterOptions,
      [name]: value,
    });
  };

  const handleClickFilter = ({ column, comparison, value }) => {
    const newFilter = planets.filter((el) => {
      const valueColumn = Number(el[column]);
      const valueTest = Number(value);
      if (comparison === 'menor que') {
        return valueColumn < valueTest;
      }
      if (comparison === 'maior que') {
        return valueColumn > valueTest;
      }
      return valueColumn === valueTest;
    });
    setFilterPlanets(newFilter);
  };

  const handleClick = () => {
    const columnFilter = columnSelect.filter((el) => el !== filterOptions.column);
    setColumnSelect(columnFilter);
    handleClickFilter(filterOptions);
  };

  const allContexts = {
    planets,
    filterPlanets,
    setFilterPlanets,
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
    <Context.Provider value={ allContexts }>
      { children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
