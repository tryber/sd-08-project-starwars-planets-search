import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './createContext';

const functionAuxiliar = (planeta, filterByNumericValues) => (

  filterByNumericValues.every(({ column, comparison, value }) => {
    if (comparison === 'maior que') return Number(planeta[column]) > Number(value);
    if (comparison === 'menor que') return Number(planeta[column]) < Number(value);
    return Number(planeta[column]) === Number(value);
  })

);
function StarWarsData({ children }) {
  const [data, setData] = useState([]);
  const [column, setColumn] = useState('');
  const [comparison, setCompa] = useState('');
  const [value, setValue] = useState();
  const [dataFilter, dataFilterSet] = useState([]);
  const [text, setText] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [

      ],
    },
  });

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await response.json();
      setData(results);
      dataFilterSet(results);
    };
    fetchPlanets();
  }, []);

  useEffect(() => {
    const filterByNameFunc = () => {
      const { filters: { filterByName: { name }, filterByNumericValues } } = text;

      const filterArray = data
        .filter((ele) => ele.name.toLowerCase().includes(name))
        .filter((ele) => functionAuxiliar(ele, filterByNumericValues));

      dataFilterSet(filterArray);
    };
    filterByNameFunc();
  }, [data, text]);

  /* useEffect(() => {
    const filterValue = () => {
      if (filterNum) {
        setFilterNum(false);
      } else setFilterNum(true);
    };
    filterValue();
  }, [filterNum, text]); */

  const ValueObject = {
    data,
    setText,
    text,
    dataFilter,
    setColumn,
    setValue,
    setCompa,
    comparison,
    column,
    value,
    dataFilterSet,

  };
  return (
    <Context.Provider value={ ValueObject }>
      {children}
    </Context.Provider>
  );
}

StarWarsData.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsData;
