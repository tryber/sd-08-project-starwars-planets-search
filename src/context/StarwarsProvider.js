import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarwarsContext from './StarwarsContext';

/* const filterFields = [
  {
    column: 'population',
    comparison: 'maior que',
    value: '100000',
  },
]; */

export default function StarwarsProvider({ children }) {
  const [tables, setTables] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((data) => {
        setPlanets(data.results);
        setTables(data.results);
      });
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const result = planets.filter((item) => item.name.toLowerCase().includes(searchTerm));
    setTables(result);
  }, [searchTerm]);

  const filterPlanets = (conditions) => {
    const arr = [];
    conditions.forEach((cond) => {
      if (cond.tipo === 'texto') {
        arr.push((i) => i.name.includes(`${cond.value}`));
      } else if (cond.comparison === 'maior que') {
        arr.push((i) => parseInt(i[cond.column], 10) > parseInt(cond.value, 10));
      } else if (cond.comparison === 'menor que') {
        arr.push((i) => parseInt(i[cond.column], 10) < parseInt(cond.value, 10));
      } else if (cond.comparison === 'igual a') {
        arr.push((i) => parseInt(i[cond.column], 10) === parseInt(cond.value, 10));
      }
    });
    let list = [...planets];
    while (arr.length > 0) {
      list = list.filter(arr.pop());
    }
    return list;
  };

  useEffect(() => {
    setTables(filterPlanets(filter));
  }, [filter]);

  const context = {
    tables,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    handleChange,
    planets,
    setPlanets,
  };

  return (
    <StarwarsContext.Provider value={ context }>
      { children }
    </StarwarsContext.Provider>
  );
}

StarwarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
