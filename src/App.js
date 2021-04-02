import React from 'react';
import Home from './pages/Home';
import './App.css';
import PlanetsProvider from './providers/PlanetsProvider';

function App() {
  return (
    <>
      <span>Hello, App!</span>
      <PlanetsProvider>
        <Home />
      </PlanetsProvider>
    </>
  );
}

export default App;
