import React from 'react';
import './App.css';
import SortBar from './components/SortBar';
import Table from './components/Table';

import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <SortBar />
      <Table />

    </Provider>
  );
}

export default App;
