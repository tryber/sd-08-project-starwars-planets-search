import React, { useContext } from 'react';
import StarWarsContext from '../contexts/StarWarsContext';

import styles from '../styles/components/NameFilter.module.css';

const NameFilter = () => {
  const { filters: { filterByName: { name } },
    changeName } = useContext(StarWarsContext);
  return (
    <div className={ styles.nameFilterContainer }>
      <input
        placeholder="Nome do planeta"
        data-testid="name-filter"
        value={ name }
        onChange={ changeName }
      />
    </div>
  );
};

export default NameFilter;
