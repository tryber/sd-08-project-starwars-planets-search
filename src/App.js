import React from 'react';
import Filters from './components/Filters';
import Table from './components/Table';
import Provider from './context/planetsContext';

function App() {
  return (
    <Provider>
      <Filters />
      <Table />
    </Provider>
  );
}

export default App;
