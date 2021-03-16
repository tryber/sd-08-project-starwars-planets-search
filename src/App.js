import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './features/Table';
import SearchBar from './features/SearchBar';
import FilterBlock from './features/FilterBlock';

function App() {
  return (
    <Provider>
      <SearchBar />
      <FilterBlock />
      <Table />
    </Provider>
  );
}

export default App;
