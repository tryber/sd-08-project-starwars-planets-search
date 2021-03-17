import React from 'react';
import './App.css';
import Table from './Table';
import Search from './Search';
import DataProvider from './DataProvider';
import FiltersCombine from './FiltersCombine';

function App() {
  return (
    <DataProvider>
      <div>
        <Search />
        <FiltersCombine />
        <Table />
      </div>
    </DataProvider>
  );
}

export default App;
