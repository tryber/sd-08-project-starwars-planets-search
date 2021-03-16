import React from 'react';
import './App.css';
import FilterList from './components/FilterList';
import Header from './components/Header';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <div>
      <Provider>
        <Header />
        <FilterList />
        <Table />
      </Provider>
    </div>
  );
}

export default App;
