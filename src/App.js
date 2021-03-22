import React from 'react';
import './App.css';
import StarWarsProvider from './Context/StarWarsProvider';
import Table from './Components/Table';
import Form from './Components/Form';

function App() {
  return (
    <StarWarsProvider>
      <h2>STAR WARS</h2>
      <Form />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
