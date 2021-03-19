import React from 'react';
import './App.css';
import Planets from './components/Planets';
import PlanetsProvider from './context/planetsContext';

function App() {
  return (
    <PlanetsProvider>
      <Planets />
    </PlanetsProvider>
  );
}

export default App;
