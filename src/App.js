import React from 'react';
import FormPlanets from './components/FormPlanets';
import PlanetContext from './context/PlanetContext';
import Table from './pages/Table';

function App() {
  return (
    <div className="app">
      Starwars
      <PlanetContext>
        <FormPlanets />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
        <Table />
      </PlanetContext>
    </div>
  );
}

export default App;
