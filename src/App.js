import React, { Component } from 'react';
import Provider from './data/Provider';
import './App.css';
import Home from './pages/Home';

class App extends Component {
  render() {
    return (
      <Provider>
        <Home />
      </Provider>
    );
  }
}

export default App;
