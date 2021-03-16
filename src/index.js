import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PlanetProvider from './Components/Contexts/PlanetsProvider';

ReactDOM.render(
  <PlanetProvider><App /></PlanetProvider>, document.getElementById('root'),
);
