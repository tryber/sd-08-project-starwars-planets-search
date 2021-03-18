import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const StarWarsContext = createContext([]);

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [inputText, setInputText] = useState('');
  const [filters, setFilters] = useState([]);
  const [columnOptions, setColumnOptions] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [filterComparison, setFilterComparison] = useState(['maior que',
    'menor que', 'igual a']);
  const [preference, setPreference] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });

  const handlePreferences = (event) => {
    const attribute = event.target.getAttribute('data-testid');
    if (attribute === 'column-filter') {
      setPreference({ ...preference, column: event.target.value });
    } else if (attribute === 'comparison-filter') {
      setPreference({ ...preference, comparison: event.target.value });
    } else {
      setPreference({ ...preference, value: event.target.value });
    }
  };

  const filteredPreferences = ({ column, comparison, value }) => {
    const newFiltered = planets.filter((planet) => {
      const targetInfo = Number(planet[column]);
      const valueToCompare = Number(value);
      if (comparison === 'menor que') {
        return targetInfo < valueToCompare;
      }
      if (comparison === 'maior que') {
        return targetInfo > valueToCompare;
      }
      return targetInfo === valueToCompare;
    });
    setFilters(newFiltered);
  };

  const handleClick = () => {
    const removeOption = preference.column;
    const indexOfOption = columnOptions.indexOf(removeOption);
    columnOptions.splice(indexOfOption, 1);
    setColumnOptions(columnOptions);
    filteredPreferences(preference);
  };

  useEffect(() => {
    const fetchUrl = async () => {
      const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(url).then((response) => response.json());
      setPlanets(results);
      console.log(results);
    };
    fetchUrl();
  }, []);

  useEffect(() => {
    const filterPlanets = planets.filter((planet) => planet.name.includes((inputText)));
    setFilters(filterPlanets);
  }, [planets, inputText]);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const contextValue = {
    planets,
    inputText,
    filters,
    setPlanets,
    handleChange,
    columnOptions,
    setColumnOptions,
    handlePreferences,
    handleClick,
    filterComparison,
    setFilterComparison,
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;

StarWarsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
