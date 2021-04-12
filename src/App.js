import React from 'react';
import Table from './components/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContextProvider from './context';

import './App.css';

const App = () => (
  <ContextProvider>
    <Table />
  </ContextProvider>
);

export default App;
