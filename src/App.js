import React from 'react';
import './App.css';
import { SWForm, SWTable } from './components';
import SWProvider from './context/SWProvider';

function App() {
  return (
    <SWProvider>
      <h1>Mais um projeto...</h1>
      <SWForm />
      <SWTable />
    </SWProvider>
  );
}

export default App;
