import React from 'react';
import './App.css';
import Filter from './components/filter';
import Table from './components/table';
import { Provider } from './context/planetsContext';

function App() {
  return (
    <Provider>
      <Filter />
      <Table />
    </Provider>
  );
}

export default App;
