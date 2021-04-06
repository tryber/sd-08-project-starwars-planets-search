import React from 'react';
import StarWarsProvider from './context/StarWarsProvider';
import StarwarsPage from './pages/StarwarsPage';

function App() {
  return (
    <StarWarsProvider>
      <StarwarsPage />
    </StarWarsProvider>
  );
}

export default App;
