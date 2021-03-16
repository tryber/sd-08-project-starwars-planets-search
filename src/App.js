import React from 'react';
import './App.css';
import Table from './components/Table';
import Filters from './components/Filters';
import StartWarsProvider from './context/StartWarsProvider';

function App() {
  return (
    <StartWarsProvider>
      <Filters />
      <Table />
    </StartWarsProvider>
  );
}

export default App;
