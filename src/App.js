import React from 'react';
import Table from './Table';
import Provider from './Context/ApiContext';

function App() {
  return (
    <div>
      <Provider>

        <Table />

      </Provider>
    </div>
  );
}

export default App;
