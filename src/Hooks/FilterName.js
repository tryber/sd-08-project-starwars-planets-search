import { useState, useEffect } from 'react';

const FilterName = () => {
  const [filter, setFilter] = useState('');
  const [filterByName, setFilterByName] = useState({ name: '' });

  useEffect(() => {
    setFilterByName({ name: filter });
  }, [filter]);

  return [filterByName, setFilter];
};

export default FilterName;
