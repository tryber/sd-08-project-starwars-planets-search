import React, { useState, useEffect, useContext } from 'react';
import Context from '../context/Context';

export default function NameInputFilter() {
  const { setFilters } = useContext(Context);
  const [temporaryName, setTemporaryName] = useState('');

  useEffect(() => {
    setFilters((prevState) => ({
      ...prevState,
      filterByName: {
        name: temporaryName,
      },
    }));
  }, [setFilters, temporaryName]);

  return (
    <label htmlFor="name-filter">
      Filtrar por nome:&nbsp;&nbsp;
      <input
        type="text"
        data-testid="name-filter"
        value={ temporaryName }
        name="name"
        onChange={ (e) => setTemporaryName(e.target.value) }
        placeholder="Digite o nome do planeta"
        id="name-filter"
      />
    </label>
  );
}
