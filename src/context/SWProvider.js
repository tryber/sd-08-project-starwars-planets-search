import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';

const API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const SWProvider = ({ children }) => {
  const [resultsAPI, setResultsAPI] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filterByInput, setFilterByInput] = useState([planets]);
  const [compareOptions, setToCompareOptions] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const comparingParameter = ['maior que', 'menor que', 'igual a'];
  const [theComparing, setTheComparing] = useState({
    subject: 'population',
    isThan: 'maior que',
    number: '',
  });

  useEffect(() => {
    async function fetching() {
      const { results } = await fetch(API_URL)
        .then((response) => response.json()).catch((e) => console.log(e));
      return setResultsAPI(results);
    }
    fetching();
  }, []);

  useEffect(() => {
    const noResidents = (resultsAPI
      .filter((element) => delete element.residents));
    setPlanets(noResidents);
  }, [resultsAPI]);

  const handleSearchInput = ({ target: { value } }) => { setSearchInput(value); };

  useEffect(() => {
    const filteredByInput = planets
      .filter((planet) => planet.name.includes((searchInput)));
    setFilterByInput(filteredByInput);
  }, [planets, searchInput]);

  const handleTheComparing = ({ target: { name, value } }) => {
    setTheComparing({ ...theComparing, [name]: value });
  };

  const filterTheComparing = ({ subject, isThan, number }) => {
    const filtered = planets.filter((planet) => {
      const subjectInfo = Number(planet[subject]);
      const valueToCompare = Number(number);
      if (isThan === 'menor que') {
        return subjectInfo < valueToCompare;
      }
      if (isThan === 'maior que') {
        return subjectInfo > valueToCompare;
      }
      return subjectInfo === valueToCompare;
    });
    setFilterByInput(filtered);
  };

  const handleClick = () => {
    const newOptions = compareOptions.filter((column) => column !== theComparing.subject);
    setToCompareOptions(newOptions);
    filterTheComparing(theComparing);
  };

  const SWProviderStates = {
    resultsAPI,
    planets,
    setPlanets,
    searchInput,
    handleSearchInput,
    filterByInput,
    compareOptions,
    setToCompareOptions,
    comparingParameter,
    theComparing,
    handleTheComparing,
    filterTheComparing,
    handleClick,
  };

  return (
    <SWContext.Provider value={ SWProviderStates }>
      {children}
    </SWContext.Provider>
  );
};

SWProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default SWProvider;
