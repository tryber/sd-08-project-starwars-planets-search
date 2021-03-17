import React from 'react';
import { StarWarsProvider } from './contexts/StarWarsContext';

import Table from './components/Table';
import NameFilter from './components/NameFilter';
import ColumnFilter from './components/ColumnFilter';
import FiltersList from './components/FiltersList';
import OrderByColumn from './components/OrderByColumn';

import styles from './styles/App.module.css';

function App() {
  return (
    <StarWarsProvider>
      <div className={ styles.controlsContainer }>
        <div className={ styles.controls }>
          <NameFilter />
          <OrderByColumn />
          <ColumnFilter />
        </div>
      </div>
      <FiltersList />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
