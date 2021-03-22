import React from 'react';
import './App.css';

import FilterInput from './components/FilterInput';
import SelectHeader from './components/SelectHeader';
import StarwarsTable from './components/StarwarsTable';
import StarwarsProvider from './context/StarwarsProvider';

function App() {
  return (
    <StarwarsProvider>
      <FilterInput />
      <SelectHeader />
      <StarwarsTable />
    </StarwarsProvider>
  );
}

export default App;
