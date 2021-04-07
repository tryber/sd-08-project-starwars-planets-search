import React from 'react';
import Table from './components/Table';
import './App.css';

import SWProvider from './context/SWProvider';

const App = () => (
  <SWProvider>
    <Table />
  </SWProvider>
);

export default App;
