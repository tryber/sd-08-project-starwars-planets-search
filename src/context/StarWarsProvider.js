import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: {
      column: '',
      comparison: '',
      value: '',
    },
  });

  // Simula componentDidMount() das classes
  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      // .then((dataResults) => console.log(dataResults.results));
      .then((dataResults) => setData(dataResults.results));
  }, []);

  // Simula componentDidUpdate() das classes
  useEffect(() => {
    const {
      filterByName: { name },
      filterByNumericValues: { column, comparison, value },
    } = filters;

    const filter = data.filter((planet) => {
      const includesName = planet.name.includes(name);
      let number = 0;

      if (planet[column] === 'unknown') {
        if (comparison === 'maior que') {
          number = 1;
        } else if (comparison === 'menor que') {
          number = Infinity;
        }
      } else {
        number = Number(planet[column]);
      }

      // console.log(number);
      // console.log(value);
      // console.log(comparison);
      // console.log(includesName);
      // console.log(planet.name);
      // console.log(planet[column]);

      switch (comparison) {
      case ('maior que'):
        return number > Number(value) && includesName;
      case ('menor que'):
        return number < Number(value) && includesName;
      case ('igual a'):
        return number === Number(value) && includesName;
      default:
        return includesName;
      }
    });

    setPlanets(filter);
  }, [data, filters]);

  const context = {
    planets,
    setPlanets,
    filters,
    setFilters,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      { children }
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;

StarWarsProvider.propTypes = {
  // https://stackoverflow.com/questions/42122522/reactjs-what-should-the-proptypes-be-for-this-props-children
  children: PropTypes.node.isRequired,
};
