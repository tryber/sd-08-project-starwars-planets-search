import React from 'react';
import './App.css';
import NameFilter from './component/NameFilter';
import NumberFilter from './component/NumberFilter';
import Table from './component/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <NameFilter />
      <NumberFilter />
      <Table />
    </Provider>
  );
}

export default App;
