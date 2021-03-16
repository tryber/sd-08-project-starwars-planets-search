import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import GetPlanets from '../services';

function Provider({ children }) {
  const [data, setDate] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({
    column: 'name',
    sort: 'ASC',
  });
  const [orderApproved, setOrderApproved] = useState(true);

  const changeOrderColumn = ({ target: { value, dataset: { setsort } } }) => {
    setOrder({ ...order, [setsort]: value });
  };

  const addFilterByNumeric = (newFilter) => {
    setFilterByNumericValues([...filterByNumericValues, newFilter]);
  };

  const deleteFilter = ({ target: { dataset: { column } } }) => {
    const result = filterByNumericValues.filter((el) => el.column !== column);
    setFilterByNumericValues(result);
  };

  const setConsumer = () => ({
    data,
    isLoading,
    filters: {
      filterByName: {
        name,
      },
      filterByNumericValues,
      order,
    },
    setName,
    addFilterByNumeric,
    deleteFilter,
    order,
    changeOrderColumn,
    orderApproved,
    setOrderApproved,
  });

  useEffect(() => {
    GetPlanets().then((response) => {
      setDate(response);
      setLoading(false);
    });
  }, []);

  return (
    <StarWarsContext.Provider value={ setConsumer() }>
      { children }
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Provider;
