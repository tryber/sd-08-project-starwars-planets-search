import React from 'react';
import './App.css';
import ProviderStarWars from './Context/ProviderStarWars';
import Table from './components/Table';

function App() {
  return (
    <ProviderStarWars>
      <Table />
    </ProviderStarWars>
  );
}

export default App;
