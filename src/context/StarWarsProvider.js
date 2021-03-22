import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import getPlanetsInfo from '../services/StarWarsApi';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [boolean, setBoolean] = useState(true);
  const [fetch, setFetch] = useState(false);
  const [filters, setFilters] = useState({ filterByName: { name: '' },
    filterByNumbericValues: [] });
  const [fill, setfill] = useState({});
  const [type, setType] = useState(['population',
    'diameter', 'rotation_period', 'orbital_period', 'surface_water']);
  const [comparisonn] = useState(['maior que', 'menor que', 'igual a']);
  function switchCase(column, comparison, value, element) {
    switch (comparison) {
    case 'maior que':
      return (Number(element[column]) > Number(value));
    case 'menor que':
      return (Number(element[column]) < Number(value));
    case 'igual a':
      return (Number(element[column]) === Number(value));
    default:
    }
  }
  useEffect(() => {
    setData(data.filter((element) => filters.filterByNumbericValues
      .every(({ column, comparison, value }) => (
        switchCase(column, comparison, value, element)
      ))));
    setType((tyype) => tyype.filter((element) => !filters.filterByNumbericValues
      .some(({ column }) => (column === element))));
  }, [boolean, setBoolean]);
  async function forSetData() {
    const save = await getPlanetsInfo();
    setData(save);
    setFetch(true);
  }
  function clickHandler() {
    setFilters({ ...filters,
      filterByNumbericValues: [...filters.filterByNumbericValues, { ...fill }] });
    setBoolean((state) => !state);
    setfill({});
  }
  return (
    <StarWarsContext.Provider
      value={ { data,
        forSetData,
        fetch,
        setFetch,
        setData,
        filters,
        setFilters,
        type,
        comparisonn,
        fill,
        setfill,
        clickHandler } }
    >
      {children}
    </StarWarsContext.Provider>
  );
}

export default StarWarsProvider;

StarWarsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
