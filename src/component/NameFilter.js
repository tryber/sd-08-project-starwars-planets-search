import React, { useContext, useState } from 'react';
import Context from '../context';

function NameFilter() {
  const [planetName, setPlanetName] = useState('');
  const { filter, setFilter } = useContext(Context);

  const onChange = (e) => {
    setPlanetName(e.target.value);
    setFilter({ ...filter, filterByName: { name: e.target.value } });
  };

  return (
    <label htmlFor="nameFilter">
      Nome do Planeta:
      {' '}
      <input
        type="text"
        data-testid="name-filter"
        id="nameFilter"
        value={ planetName }
        onChange={ onChange }
      />
    </label>
  );
}

export default NameFilter;
