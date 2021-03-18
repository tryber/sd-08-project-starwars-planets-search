import React from 'react';
import './App.css';

import Planets from './context/Planets';

// import Header from './components/Header';
import Table from './components/Table';
import Form from './components/Form';

function App() {
  return (
    <Planets>
      <Form />
      <Table />
    </Planets>
  );
}

export default App;
