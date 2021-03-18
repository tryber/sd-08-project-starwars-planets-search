import React from 'react';
import ProviderPlanet from './Context/Provider';
import Table from './Componets/Table';
import './App.css';

function App() {
  return (
    <ProviderPlanet>
      <Table />
    </ProviderPlanet>
  );
}

export default App;
