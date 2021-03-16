import React, { useContext } from 'react';
import Context from '../context/Context';

export default function Filters() {
  const { filters: {
    filterByName: { name },
  },
  handleChange,
  } = useContext(Context);

  return (
    <input
      type="text"
      data-testid="name-filter"
      value={ name }
      onChange={ handleChange }
    />
  );
}
