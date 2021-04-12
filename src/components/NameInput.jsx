import React, { useContext } from 'react';
import { PlanetContext } from '../context/PlanetProvider';

export default function NameInput() {
  const { setName } = useContext(PlanetContext);

  return (
    <label
      htmlFor="name"
    >
      <input
        id="name"
        name="name"
        type="text"
        data-testid="name-filter"
        placeholder="Search by name"
        onChange={ (e) => setName(e.target.value) }
      />
    </label>
  );
}
