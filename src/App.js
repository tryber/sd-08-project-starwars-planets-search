import React from 'react';
import Provider from './context/Provider';
import Table from './components/Table';
import FilterBar from './components/FilterBar';
import './App.css';

function App() {
  return (
    <Provider>
      <FilterBar />
      <Table />
    </Provider>
  );
}

export default App;
