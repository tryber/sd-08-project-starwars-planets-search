import React from 'react';
import './App.css';
import StateProvider from './context/StateProvider';
import Table from './Components/Table';
import FilterRemove from './Components/FilterRemove';
import Filters from './Components/Filters';

function App() {
  return (
    <StateProvider>
      <Filters />
      <FilterRemove />
      <Table />
    </StateProvider>
  );
}

export default App;
