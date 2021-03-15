import React from 'react';
import PropTypes from 'prop-types';

import { PlanetProvider } from './planets';

const AppProvider = ({ children }) => (
  <PlanetProvider>{children}</PlanetProvider>
);

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
