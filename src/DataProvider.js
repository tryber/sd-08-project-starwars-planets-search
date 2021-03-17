import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DataContext from './DataContext';

function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [column, setColumn] = useState('population');
  const [range, setRange] = useState('maior que');
  const [number, setNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((json) => setData((json.results)));
    setIsLoading(false);
  }, []);

  function DataFilter() {
    if (q !== '') {
      const info = data.filter((i) => i.name.toLowerCase().includes(q.toLowerCase()));
      setData(info);
    } else {
      setIsLoading(true);
      fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json())
        .then((json) => setData((json.results)));
      setIsLoading(false);
    }
  }

  useEffect(() => {
    DataFilter();
  }, [q]);

  function populationFilter() {
    if (column === 'population' && range === 'igual a') {
      setData(data.filter((i) => parseFloat(i.population) === parseFloat(number)));
    }
    if (column === 'population' && range === 'maior que') {
      setData(data.filter((i) => parseFloat(i.population) > parseFloat(number)));
    }
    if (column === 'population' && range === 'menor que') {
      setData(data.filter((i) => parseFloat(i.population) < parseFloat(number)));
    } else if (number.length === 0) DataFilter();
  }

  function orbitalFilter() {
    if (column === 'orbital_period' && range === 'igual a') {
      setData(data.filter((i) => parseFloat(i.orbital_period) === parseFloat(number)));
    }
    if (column === 'orbital_period' && range === 'maior que') {
      setData(data.filter((i) => parseFloat(i.orbital_period) > parseFloat(number)));
    }
    if (column === 'orbital_period' && range === 'menor que') {
      setData(data.filter((i) => parseFloat(i.orbital_period) < parseFloat(number)));
    } else if (number.length === 0) DataFilter();
  }

  function diameterFilter() {
    if (column === 'diameter' && range === 'igual a') {
      setData(data.filter((i) => parseFloat(i.diameter) === parseFloat(number)));
    }
    if (column === 'diameter' && range === 'maior que') {
      setData(data.filter((i) => parseFloat(i.diameter) > parseFloat(number)));
    }
    if (column === 'diameter' && range === 'menor que') {
      setData(data.filter((i) => parseFloat(i.diameter) < parseFloat(number)));
    } else if (number.length === 0) DataFilter();
  }

  function rotationFilter() {
    if (column === 'rotation_period' && range === 'igual a') {
      setData(data.filter((i) => parseFloat(i.rotation_period) === parseFloat(number)));
    }
    if (column === 'rotation_period' && range === 'maior que') {
      setData(data.filter((i) => parseFloat(i.rotation_period) > parseFloat(number)));
    }
    if (column === 'rotation_period' && range === 'menor que') {
      setData(data.filter((i) => parseFloat(i.rotation_period) < parseFloat(number)));
    } else if (number.length === 0) DataFilter();
  }

  function surfaceFilter() {
    if (column === 'surface_water' && range === 'igual a') {
      setData(data.filter((i) => parseFloat(i.surface_water) === parseFloat(number)));
    }
    if (column === 'surface_water' && range === 'maior que') {
      setData(data.filter((i) => parseFloat(i.surface_water) > parseFloat(number)));
    }
    if (column === 'surface_water' && range === 'menor que') {
      setData(data.filter((i) => parseFloat(i.surface_water) < parseFloat(number)));
    } else if (number.length === 0) DataFilter();
  }

  function Filter() {
    populationFilter();
    orbitalFilter();
    diameterFilter();
    rotationFilter();
    surfaceFilter();
  }

  return (

    <DataContext.Provider
      value={ {
        data,
        isLoading,
        q,
        setQ,
        column,
        setColumn,
        range,
        setRange,
        number,
        setNumber,
        Filter } }
    >
      {children}
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default DataProvider;
