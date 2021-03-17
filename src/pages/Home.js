import React, { useState } from 'react';

import FilterSearch from '../components/FilterSearch';
import TableOfPlanets from '../components/TableOfPlanets';

export default function Home() {
  const [state, setState] = useState({
    results: [],
    fixResults: [],
    column: 'population',
    comparison: 'maior que',
    value: '0',
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [
        {
          column: 'population',
          comparison: 'maior que',
          value: '100000',
        },
      ],
    },
  });
  return (
    <>
      <FilterSearch state={ state } setState={ setState } />
      <TableOfPlanets state={ state } setState={ setState } />
    </>
  );
}
