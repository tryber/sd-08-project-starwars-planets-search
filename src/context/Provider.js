import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

export default function Provider({ children }) {
  const [data, setData] = useState([]);
  const [, setNewData] = useState([]);
  const [origin, setOrigin] = useState([]);
  const [name, setName] = useState('');
  const [filters, setFilters] = useState({
    filterByName: {},
    filterByNumericValues: [],
    order: [],
  });
  const [column1, setColumn1] = useState('population');
  const [comparison1, setComparison1] = useState('maior que');
  const [value1, setValue1] = useState(null);
  const [ordColumn, setOrdColumn] = useState('population');
  const [ord, setOrd] = useState('');

  const [options, setOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((json) => setOrigin(json.results));
  }, []);

  useEffect(() => {
    setData(origin.sort((a, b) => a.name.localeCompare(b.name)));
  }, [origin]);

  const updateFilter = () => {
    filters.filterByNumericValues.forEach((item) => {
      const { column, comparison, value } = item;
      switch (comparison) {
      case ('maior que'):
        setData(data
          .filter((planet) => Number(planet[column]) > Number(value)));
        break;
      case ('menor que'):
        setData(data
          .filter((planet) => Number(planet[column]) < Number(value)));
        break;
      case ('igual a'):
        setData(data
          .filter((planet) => Number(planet[column]) === Number(value)));
        break;
      default:
        setData(origin.sort((a, b) => a.name.localeCompare(b.name)));
      }
    });
  };

  const onClickFilter = () => {
    filters.filterByNumericValues.push({
      column: column1,
      comparison: comparison1,
      value: value1,
    });
    updateFilter();
  };

  const removeFilter = (item) => {
    const zero = 0;
    filters.filterByNumericValues
      .splice(item, 1);
    if (filters.filterByNumericValues.length !== zero) {
      updateFilter();
    } else {
      setData(origin);
    }
  };

  const ordemASC = (a, b) => {
    switch (ordColumn) {
    case ('population'):
      return a.population - b.population;
    case ('orbital_period'):
      return a.orbital_period - b.orbital_period;
    case ('diameter'):
      return a.diameter - b.diameter;
    case ('rotation_period'):
      return a.rotation_period - b.rotation_period;
    case ('surface_water'):
      return a.surface_water - b.surface_water;
    default:
      console.log('erro');
    }
  };

  const ordemDESC = (a, b) => {
    switch (ordColumn) {
    case ('population'):
      return b.population - a.population;
    case ('orbital_period'):
      return b.orbital_period - a.orbital_period;
    case ('diameter'):
      return b.diameter - a.diameter;
    case ('rotation_period'):
      return b.rotation_period - a.rotation_period;
    case ('surface_water'):
      return b.surface_water - a.surface_water;
    default:
      console.log('erro');
    }
  };

  const onClickOrder = () => {
    filters.order.push({
      column: ordColumn,
      sort: ord,
    });
    if (ord === 'ASC') {
      setData(origin.sort(ordemASC));
    } else {
      setData(origin.sort(ordemDESC));
    }
    updateFilter();
    setNewData(data);
  };

  const onNameChange = (itemname) => {
    setData(origin.filter((planetName) => planetName
      .name.toLowerCase().includes(itemname)));
    setName(itemname);
  };

  const context = {
    data,
    setData,
    filters,
    setFilters,
    origin,
    setOrigin,
    name,
    setName,
    onNameChange,
    options,
    setOptions,
    onClickFilter,
    setColumn1,
    setComparison1,
    setValue1,
    removeFilter,
    setOrdColumn,
    setOrd,
    onClickOrder,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
