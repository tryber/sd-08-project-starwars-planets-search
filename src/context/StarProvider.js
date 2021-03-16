import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';
import fetchPlanets from '../services/StarWarsAPI';

function StarProvider({ children }) {
  const [data, setData] = useState([]);
  const [inputTextValue, setInputTextValue] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState();

  const fetchData = async () => {
    setData(await fetchPlanets());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setInputTextValue(e.target.value);
  };

  const handleClickValues = () => {
    setData([]);
    if (comparison === 'maior que') {
      setData(data.filter((item) => Number(item[column]) > Number(value)));
    } else if (comparison === 'menor que') {
      setData(data.filter((item) => Number(item[column]) < Number(value)));
    } else {
      setData(data.filter((item) => Number(item[column]) === Number(value)));
    }
  };

  const context = {
    data,
    inputTextValue,
    handleChange,
    setColumn,
    setComparison,
    setValue,
    handleClickValues,
  };

  return (
    <StarContext.Provider value={ context }>
      { children }
    </StarContext.Provider>
  );
}

StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarProvider;
