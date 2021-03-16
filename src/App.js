import React from 'react';
import { Provider } from './context/StarWarsContext';
import Table from './components/Table';

function App() {
  return (
    <Provider>
      <Table />
    </Provider>

  );
}

export default App;
