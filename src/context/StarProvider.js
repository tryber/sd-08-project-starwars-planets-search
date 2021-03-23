import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';
import fetchAPI from '../services/index';

const StarProvider = ({ children }) => {
  const [listPlanet, setListPlanet] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState();

  const fechPlanets = async () => {
    setListPlanet(await fetchAPI());
  };
  useEffect(() => {
    fechPlanets();
  }, []);

  const handleChange = (event) => {
    setFilterName(event.target.value);
  };
  const handleFilterValues = () => {
    setListPlanet([]);
    if (comparison === 'maior que') {
      setListPlanet(listPlanet.filter(
        (planet) => Number(planet[column]) > Number(value),
      ));
    } else if (comparison === 'menor que') {
      setListPlanet(listPlanet.filter(
        (planet) => Number(planet[column]) < Number(value),
      ));
    } else {
      setListPlanet(listPlanet.filter(
        (planet) => Number(planet[column]) === Number(value),
      ));
    }
  };

  const context = {
    listPlanet,
    filterName,
    handleChange,
    setColumn,
    setComparison,
    setValue,
    handleFilterValues };
  return (
    <StarContext.Provider value={ context }>
      {children}
    </StarContext.Provider>
  );
};
StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default StarProvider;
