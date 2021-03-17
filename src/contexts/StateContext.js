import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

export const StateContext = createContext();

export const StateProvider = ({ children, value }) => (
  <StateContext.Provider value={ value }>{children}</StateContext.Provider>
);
StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.shape({
    data: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

export const useStateValue = () => useContext(StateContext);
