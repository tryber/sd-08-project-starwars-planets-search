import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FilterContext from './FilterContext';

function Provider({ children }) {
  const api = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [allPlanets, setPlanets] = useState([]);
  const [query, setQuery] = useState('');
  const [filterByName, setFilterByName] = useState([]);
  const [filterColumn, setFilterColumn] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [size, setSize] = useState(['maior que', 'menor que', 'igual a']);
  const [selected, setSelected] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });

  useEffect(() => {
    async function fetchData() {
      const { results } = await fetch(api).then((response) => response.json());
      // console.log(results);
      setPlanets(results);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filterPlanets = allPlanets;
    filterPlanets = allPlanets.filter((planet) => planet.name.includes((query)));
    setFilterByName(filterPlanets);
  }, [allPlanets, query]);

  function filterName(e) {
    setQuery(e.target.value);
  }

  function filterSelected(e) {
    const attribute = e.target.getAttribute('data-testid');
    if (attribute === 'column-filter') {
      setSelected({ ...selected, column: e.target.value });
    } else if (attribute === 'comparison-filter') {
      setSelected({ ...selected, comparison: e.target.value });
    } else {
      setSelected({ ...selected, value: e.target.value });
    }
  }

  function filteredValue({ column, comparison, value }) {
    const newFiltered = allPlanets.filter((planet) => {
      const selectedInfo = Number(planet[column]);
      const valueToCompare = Number(value);
      if (comparison === 'menor que') {
        return selectedInfo < valueToCompare;
      }
      if (comparison === 'maior que') {
        return selectedInfo > valueToCompare;
      }
      return selectedInfo === valueToCompare;
    });
    setFilterByName(newFiltered);
  }

  function handleClick() {
    let copyFilterColumn = filterColumn;
    copyFilterColumn = filterColumn.filter((column) => column !== selected.column);
    setFilterColumn(copyFilterColumn);
    filteredValue(selected);
  }

  const data = {
    allPlanets,
    query,
    filterColumn,
    size,
    filterByName,
    setSize,
    setFilterColumn,
    setPlanets,
    filterName,
    filterSelected,
    handleClick,
  };

  return (
    <FilterContext.Provider value={ data }>
      { children }
    </FilterContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
