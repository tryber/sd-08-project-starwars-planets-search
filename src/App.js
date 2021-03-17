import React from 'react';
import './App.css';
import MainPage from './components/MainPage';
import PlanetProvider from './contexts/PlanetProvider';

function App() {
  return (
    <PlanetProvider>
      <MainPage />
    </PlanetProvider>
  );
}

export default App;
