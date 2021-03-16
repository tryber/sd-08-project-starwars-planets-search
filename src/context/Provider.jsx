import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import contextStarWarsApi from './context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [planetFiltered, setPlanetFiltered] = useState([]);
  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
  });

  useEffect(() => {
    const requestApi = async () => {
      try {
        const fetchUrl = await fetch('https://swapi-trybe.herokuapp.com/api/planets');
        const json = await fetchUrl.json();
        setData(json.results);
      } catch (error) {
        console.log(error);
      }
    };
    requestApi();
  }, []);

  useEffect(() => {
    const { filterByName: { name } } = filter;
    const planetFilter = data.filter((planet) => planet.name.includes(name));
    setPlanetFiltered(planetFilter);
  }, [filter, data]);

  const context = {
    data,
    planetFiltered,
    setPlanetFiltered,
    filter,
    setFilter,
  };

  return (
    <contextStarWarsApi.Provider value={ context }>
      { children }
    </contextStarWarsApi.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
