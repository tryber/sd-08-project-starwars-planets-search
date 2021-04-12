import React from 'react';
import StarWarsContext from '../context/StarWarsContext';
import FilterBar from './FilterBar';

const Header = () => {
  const { data } = React.useContext(StarWarsContext);

  return (
    <div>
      <h1>{ data ? 'Star Wars' : 'Erro'}</h1>
      <FilterBar />
    </div>
  );
};

export default Header;