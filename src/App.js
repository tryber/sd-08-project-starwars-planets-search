import React from 'react';
import './App.css';

import PlanetProvider from './context/PlanetProvider';
// import Header from './components/Header';
import Table from './components/Table';

function App() {
  return (
    <PlanetProvider>
      <Table />
    </PlanetProvider>

  );
}

export default App;
