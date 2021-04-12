import React from 'react';

import PlanetTable from './pages/PlanetTable';
import AppProvider from './hooks';

import './App.css';

function App() {
  return (
    <AppProvider>
      <PlanetTable />
    </AppProvider>
  );
}

export default App;
