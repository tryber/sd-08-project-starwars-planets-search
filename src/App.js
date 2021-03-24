import React from 'react';
import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import Store from './data/DataContext';

function App() {
  return (
    <Store>
      <h1>Star Amoung Us Planets Search </h1>
      <Filters />
      <Table />
    </Store>
  );
}

export default App;
