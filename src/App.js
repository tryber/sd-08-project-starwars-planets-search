import React from 'react';
import './App.css';
import { SwHeader, SwTable } from './components';
import { ContextFromStarWarsProvider } from './contexts/ContextFromStarWars';

function App() {
  return (
    <ContextFromStarWarsProvider>
      <div className="swContainer">
        <SwHeader />
        <SwTable />
      </div>
    </ContextFromStarWarsProvider>
  );
}

export default App;
