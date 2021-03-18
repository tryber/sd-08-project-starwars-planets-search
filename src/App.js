import React from 'react';

import Home from './components/Home';
import PlanetsProvider from './context/PlanetsProvider';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <PlanetsProvider>
      <span>Hello, App!</span>
      <Home />
    </PlanetsProvider>
  );
}

export default App;
