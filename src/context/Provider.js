import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NewContext from './NewContext';

function Provider({ children }) {
  const [info, setInfo] = useState([]);
  const [planet, setPlanet] = useState([]);
  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: {
      column: '',
      comparison: '',
      value: '',
    },
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const data = await response.json();
      // console.log(data.results);
      setInfo(data.results);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const { filterByName: { name },
      filterByNumericValues: { column, comparison, value } } = filter;

    const filters = info.filter((data) => {
      const nameFound = data.name.includes(name);
      switch (comparison) {
      case ('maior que'):
        return (parseInt(data[column], 10) > parseInt(value, 10) && nameFound);
        // lembrete para erro "-missing radix parameter- https://stackoverflow.com/questions/7818903/jslint-says-missing-radix-parameter"
      case ('menor que'):
        return (parseInt(data[column], 10) < parseInt(value, 10) && nameFound);
      case ('igual a'):
        return (parseInt(data[column], 10) === parseInt(value, 10) && nameFound);
      default:
        return nameFound;
      }
    });
    setPlanet(filters);
  }, [info, filter]);

  const context = {
    planet,
    setPlanet,
    filter,
    setFilter,
  };

  // const planetsInfo = {
  //   info,
  //   setInfo,
  // };

  return (
    <NewContext.Provider value={ context }>
      { children }
    </NewContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node]).isRequired,
};

export default Provider;
