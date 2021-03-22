import React from 'react';
import './App.css';
import Provider from './context/Provider';
import TablePlanets from './Pages/TablePlanets';

function App() {
  return (
    <div>
      <Provider>
        <TablePlanets />
      </Provider>
    </div>
  );
}

export default App;
