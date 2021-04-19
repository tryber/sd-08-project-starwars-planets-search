import React from 'react';
import './App.css';
import Home from './pages/index';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Home />
    </Provider>
  );
}

export default App;
