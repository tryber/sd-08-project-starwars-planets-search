import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetContext from './PlanetContext';

function PlanetProvider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
    filterByColumnForm: [{ column: '', comparison: '', value: '' }],
    order: { column: 'Name', sort: 'ASC' },
    sorted: false,
  });

  return (
    <PlanetContext.Provider
      value={ {
        planetsList,
        setPlanetsList,
        filters,
        setFilters,
      } }
    >
      { children }
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetProvider;
