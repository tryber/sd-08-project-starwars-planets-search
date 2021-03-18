import React from 'react';

import Provider from './context/Provider';

import FilterForm from './components/FilterForm';
import PlanetsTable from './components/PlanetsTable';

function App() {
  return (
    <Provider>
      <header>
        <FilterForm />
      </header>
      <main>
        <PlanetsTable />
      </main>
    </Provider>
  );
}

export default App;
