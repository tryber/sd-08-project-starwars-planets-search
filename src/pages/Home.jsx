import React, { useContext } from 'react';
import SearchField from '../components/SearchField';
import SelectFields from '../components/SelectFields';
import Table from '../components/Table';
import StarWarsContext from '../data/StarWarsContext';
// import PropTypes from 'prop-types';

export default function Home() {
  const { data, fetching, filteredData } = useContext(StarWarsContext);
  return (
    <div>
      <SearchField />
      <SelectFields data={ data } filteredData={ filteredData } />
      {fetching ? <p>Loading...</p> : <Table data={ data } />}
    </div>
  );
}

// Home.contextType = StarWarsContext;

// Test.propTypes = {
//   prop: PropTypes,
// };
