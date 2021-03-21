import React from 'react';
import './App.css';
import Home from './pages/Home';
import PlanetsProvider from './context/planetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Home />
    </PlanetsProvider>
  );
}

export default App;
